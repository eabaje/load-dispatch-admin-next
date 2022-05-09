import React, { useState, useEffect, useContext } from "react";

import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//import { yupResolver } from 'react-hook-form-resolvers';
import * as Yup from "yup";
import { Country, State } from "country-state-city";
import { GlobalContext } from "../../context/Provider";
import {
  LOAD_TYPE,
  LOAD_CAPACITY,
  LOAD_UNIT,
  TRIP_STATUS,
} from "../../constants/enum";
import {
  createShipment,
  editShipment,
  listShipmentsByShipmentId,
  showInterest,
} from "../../context/actions/shipment/shipment.action";
import $ from "jquery";
import "bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchData } from "../../helpers/query";
import UploadImages from "../../components/upload/image-upload";
function AddShipment({ history, match }) {
  const { shipmentId } = match.params;
  const { isReadOnly } = match.params;
  // const { SubscribeId } = match.params;
  const isAddMode = !shipmentId;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [pickUpRegion, setPickUpRegion] = useState([]);
  const [deliveryRegion, setdeliveryRegion] = useState([]);
  const [selpickUpRegion, setselpickUpRegion] = useState("");
  const [seldeliveryRegion, setseldeliveryRegion] = useState("");
  const [readOnly, setReadOnly] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [refId, setRefId] = useState("");
  // const onSubmit = (data) => console.log(data);
  const {
    authState: { user },
  } = useContext(GlobalContext)
  const selectPickUpCountry = async (e) => {
    setCountry((country) => e.target.value);

    setPickUpRegion(
      (pickUpRegion) =>
        // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
        (pickUpRegion = State.getStatesOfCountry(e.target.value))
    );
  };

  const selectDeliveryCountry = async (e) => {
    setCountry((country) => e.target.value);

    setdeliveryRegion(
      (deliveryRegion) =>
        // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
        (deliveryRegion = State.getStatesOfCountry(e.target.value))
    );
  };

  useEffect(() => {
    if (isReadOnly) setReadOnly(!readOnly);
    setCountries((countries) => (countries = Country.getAllCountries()));

   
    // console.log(`user`, user.CompanyId);
    if (!isAddMode) {
      // console.log(`object`, fetchData("shipment/findOne", shipmentId));
      // listShipmentsByShipmentId(shipmentId)(shipmentDispatch).then(
      //   (shipment) => {
      fetchData(
        "shipment/findOne",
        shipmentId
      )((shipment) => {
        //  console.log(`shipment`, shipment);
        const fields = [
          "ShipmentId",
          "CompanyId",
          "LoadCategory",
          "LoadType",
          "LoadWeight",
          "LoadUnit",
          "Qty",
          "Description",
          "PickUpRegion",
          "PickUpCountry",
          "PickUpLocation",
          "DeliveryCountry",
          "DeliveryRegion",
          "DeliveryLocation",
          "ExpectedPickUpDate",
          "ExpectedDeliveryDate",
          "RequestForShipment",
          "ShipmentRequestPrice",
          "DeliveryContactName",
          "DeliveryContactPhone",
          "DeliveryEmail",
          "AssignedShipment",
          "ShipmentDate",
          "ShipmentDocs",
          "ShipmentStatus",
        ];
        fields.forEach((field) => setValue(field, shipment[field]));

        setPickUpRegion(
          (pickUpRegion) =>
            // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
            (pickUpRegion = State.getStatesOfCountry(shipment["PickUpCountry"]))
        );

        setdeliveryRegion(
          (deliveryRegion) =>
            // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
            (deliveryRegion = State.getStatesOfCountry(
              shipment["DeliveryCountry"]
            ))
        );

        setselpickUpRegion(shipment["PickUpRegion"]);
        setseldeliveryRegion(shipment["DeliveryRegion"]);
        setRefId(shipmentId);

        //  setFormStep(1);
        console.log("formstep", formStep);
        console.log("refId", refId);
      })((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      });
    }
  }, []);

  const {
    register: shipmentform,
    formState: { errors },
    handleSubmit: handleShipment,
    setValue,
    control,
  } = useForm();

  const {
    shipmentDispatch,
    shipmentState: {
      createShipment: { data, loading },
    },
  } = useContext(GlobalContext);

  function onSubmit(formdata) {
    return isAddMode
      ? CreateShipment(formdata)
      : isReadOnly
      ? ShowInterest(formdata)
      : updateShipment(formdata, shipmentId);
  }

  function CreateShipment(formdata) {
    formdata.CompanyId = user.CompanyId;
    formdata.UserId = user.UserId;

    createShipment(formdata)(shipmentDispatch)((res) => {
      if (res) {
        setRefId(res.data.ShipmentId);
        enqueueSnackbar("Created new Shipment successfully", {
          variant: "success",
        });

        setFormStep(1);
        console.log("formstep", formStep);
      }
    })((error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    });
  }

  function updateShipment(formdata, shipmentId) {
    editShipment(formdata, shipmentId)(shipmentDispatch)((res) => {
      if (res) {
        enqueueSnackbar("Updated record successfully", {
          variant: "success",
        });
      }
    })((error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    });
  }

  function ShowInterest(formdata) {
    // const formData = new FormData();

    // formData.append("ShipmentId", shipmentId); //append the values with key, value pair
    // formData.append("UserId", userId);
    formdata.CompanyId = user.CompanyId;
    formdata.UserId = user.UserId;
   // console.log(`form`, formdata);

    showInterest(formdata)(shipmentDispatch)((res) => {
      if (res) {
        enqueueSnackbar(res.message, {
          variant: "success",
        });
      }
    })((error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    });
  }

  // console.log(`readOnly`, readOnly);
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => {
    return (
      <div class="input-group mb-3">
        <input
          ref={ref}
          type="text"
          class="form-control datepicker"
          value={value}
          onClick={onClick}
          placeholder="Click to enter date"
          required
        />
        <div class="input-group-append">
          <span class="input-group-text">
            <i class="fa fa-calendar"></i>
          </span>
        </div>
      </div>
    );
  });

  return (
    <>
     
        <div class="col-md-12">
          <div class="card">
            <div class="card-header alert-info">
              <h2>Shipment Information</h2>
            </div>
            <div class="card-body">
              <div class="col-md-12 ">
                {formStep === 0 && (
                  <form onSubmit={handleShipment(onSubmit)}>
                    <input
                      type="hidden"
                      name="UserId"
                      value={user.UserId}
                      class="form-control"
                      {...shipmentform("UserId")}
                    />
                    <input
                      type="hidden"
                      name="ShipmentId"
                      class="form-control"
                      {...shipmentform("ShipmentId")}
                    />
                    <input
                      type="hidden"
                      name="CompanyId"
                      value={user.CompanyId}
                      class="form-control"
                      {...shipmentform("CompanyId")}
                    />

                    <div class="form-group row">
                      <div class="col-md-12">
                        <h5 class="alert alert-info">
                          {" "}
                          Fill in the information in the form accurately{" "}
                        </h5>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">
                        Load category
                      </label>
                      <div class="col-md-4">
                        <select
                          id="LoadCategory"
                          class="form-control"
                          readOnly={readOnly}
                          {...shipmentform("LoadCategory", {
                            required: true,
                          })}
                          required
                        >
                          <option value="" selected>
                            Select Load Categories
                          </option>
                          {LOAD_TYPE.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.text}
                            </option>
                          ))}
                        </select>
                      </div>

                      <label class="col-sm-2 col-form-label">Load Type</label>
                      <div class="col-md-4">
                        <select
                          id="LoadType"
                          class="form-control"
                          readOnly={readOnly}
                          {...shipmentform("LoadType", {
                            required: true,
                          })}
                        >
                          <option selected>Select Load Type</option>

                          {LOAD_CAPACITY.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.text}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Load Weight</label>

                      <div class="col-sm-2">
                        <input
                          name="LoadWeight"
                          class="form-control"
                          readOnly={readOnly}
                          placeholder="Load Weight"
                          {...shipmentform("LoadWeight", {
                            required: true,
                          })}
                          required
                        />
                      </div>
                      <label class="col-sm-2 col-form-label">Load Unit</label>
                      <div class="col-sm-2">
                        <select
                          id="LoadUnit"
                          name="LoadUnit"
                          readOnly={readOnly}
                          class="form-control"
                          {...shipmentform("LoadUnit", {
                            required: true,
                          })}
                          required
                        >
                          <option selected>Select Load Unit</option>

                          {LOAD_UNIT.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.text}
                            </option>
                          ))}
                        </select>
                      </div>

                      <label class="col-sm-1 col-form-label">Quantity</label>

                      <div class="col-sm-3">
                        <input
                        type="number"
                          name="Qty"
                          readOnly={readOnly}
                          class="form-control"
                          placeholder="Quantity"
                          {...shipmentform("Qty", {
                            required: true,
                          })}
                          required
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-form-label col-md-2">Description</label>
                      <div class="col-md-10">
                        <input
                          name="Description"
                          class="form-control"
                          readOnly={readOnly}
                          placeholder="Give your detailed description of expected delivery"
                          {...shipmentform("Description", {
                            required: true,
                          })}
                          required
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-md-12">
                        <h5 class="alert alert-info"> Pick Up Information </h5>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-md-2">Country</label>
                      <div class="col-md-4">
                        <select
                          name="PickUpCountry"
                          class="form-control"
                          readOnly={readOnly}
                          {...shipmentform("PickUpCountry")}
                          onChange={selectPickUpCountry}
                        >
                          <option value="">Select Country</option>
                          {countries.map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <label class="col-form-label col-md-2">
                        Region/State
                      </label>
                      <div class="col-md-4">
                        <select
                          name="PickUpRegion"
                          class="form-control"
                          readOnly={readOnly}
                          id="PickUpRegion"
                          {...shipmentform("PickUpRegion", {
                            required: true,
                          })}
                        >
                          <option value=""> Select Region/State </option>
                          {pickUpRegion.map((item) => (
                            <option
                              selected={selpickUpRegion === item.isoCode}
                              value={item.isoCode}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-md-2">
                        PickUp Address
                      </label>

                      <div class="col-md-4">
                        <input
                          name="PickUpLocation"
                          readOnly={readOnly}
                          class="form-control"
                          placeholder="Pick Up location"
                          {...shipmentform("PickUpLocation", {
                            required: true,
                          })}
                          required
                        />
                      </div>

                      <label class="col-form-label col-md-2">PickUp Date</label>
                      <div class="col-md-4">
                        <Controller
                          name={"ExpectedPickUpDate"}
                          readOnly={readOnly}
                          control={control}
                          // defaultValue={new Date()}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <DatePicker
                                wrapperClassName="datePicker"
                                className="form-control datepicker"
                                onChange={onChange}
                                selected={Date.parse(value)}
                                placeholderText="Enter date"
                                customInput={<CustomInput />}
                              />
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-md-12">
                        <h5 class="alert alert-info"> Delivery Information </h5>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-form-label col-md-2">Country</label>

                      <div class="col-md-4">
                        <select
                          name="DeliveryCountry"
                          readOnly={readOnly}
                          class="form-control"
                          {...shipmentform("DeliveryCountry")}
                          onChange={selectDeliveryCountry}
                        >
                          <option value="">Select Country</option>
                          {countries.map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <label class="col-form-label col-md-2">
                        Region/State
                      </label>
                      <div class="col-md-4">
                        <select
                          name="DeliveryRegion"
                          readOnly={readOnly}
                          class="form-control"
                          id="DeliveryRegion"
                          {...shipmentform("DeliveryRegion", {
                            required: true,
                          })}
                        >
                          <option value=""> Select Region/State </option>
                          {deliveryRegion.map((item) => (
                            <option
                              selected={seldeliveryRegion === item.isoCode}
                              value={item.isoCode}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-form-label col-md-2">
                        Location/Address
                      </label>

                      <div class="col-md-4">
                        <input
                          name="DeliveryLocation"
                          readOnly={readOnly}
                          class="form-control"
                          placeholder="Delivery location"
                          {...shipmentform("DeliveryLocation", {
                            required: true,
                          })}
                          required
                        />
                      </div>

                      <label class="col-form-label col-md-2">
                        Delivery Date
                      </label>
                      <div class="col-md-4">
                        <Controller
                          name={"ExpectedDeliveryDate"}
                          readOnly={readOnly}
                          control={control}
                          // defaultValue={new Date()}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <DatePicker
                                wrapperClassName="datePicker"
                                className="form-control datepicker"
                                onChange={onChange}
                                selected={Date.parse(value)}
                                placeholderText="Enter date"
                                customInput={<CustomInput />}
                              />
                            );
                          }}
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-form-label col-md-2">
                        Contact Name
                      </label>

                      <div class="col-md-4">
                        <input
                          name="DeliveryContactName"
                          readOnly={readOnly}
                          class="form-control"
                          placeholder="Contact Name"
                          {...shipmentform("DeliveryContactName", {
                            required: true,
                          })}
                          required
                        />
                      </div>
                      <label class="col-form-label col-md-2">
                        Contact Phone
                      </label>
                      <div class="col-md-4">
                        <input
                          name="DeliveryContactPhone"
                          readOnly={readOnly}
                          placeholder="Contact Phone"
                          class="form-control"
                          {...shipmentform("DeliveryContactPhone", {
                            required: true,
                          })}
                          required
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-form-label col-md-2">Email</label>

                      <div class="col-md-4">
                        <input
                          name="DeliveryEmail"
                          readOnly={readOnly}
                          class="form-control"
                          placeholder="Email"
                          {...shipmentform("DeliveryEmail", {
                            required: true,
                          })}
                          required
                          email
                        />
                      </div>

                      <label class="col-form-label col-md-2">
                        Shipment Date
                      </label>
                      <div class="col-md-4">
                        <Controller
                          name={"ShipmentDate"}
                          readOnly={readOnly}
                          control={control}
                          // defaultValue={new Date()}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <DatePicker
                                wrapperClassName="datePicker"
                                className="form-control datepicker"
                                onChange={onChange}
                                selected={Date.parse(value)}
                                placeholderText="Enter date"
                                customInput={<CustomInput />}
                              />
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-md-12">
                        <h5 class="alert alert-info">
                          {" "}
                          Request for Proposal Information{" "}
                        </h5>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-form-label col-md-2">
                        Request For Shipment
                      </label>

                      <div class="col-md-4">
                        <input
                          name="RequestForShipment"
                          readOnly={readOnly}
                          class="form-control"
                          placeholder=" State your requirement expectations"
                          {...shipmentform("RequestForShipment")}
                        />
                      </div>

                      <label class="col-sm-2 col-form-label">
                        Shipment Status
                      </label>
                      <div class="col-md-2">
                        <select
                          id="ShipmentStatus"
                          name="ShipmentStatus"
                          readOnly={readOnly}
                          class="form-control"
                          {...shipmentform("ShipmentStatus", {
                            required: true,
                          })}
                        >
                          <option selected>Select Status</option>

                          {TRIP_STATUS.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.text}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div class="form-group"></div>

                    <div class="form-row">
                      <div class="col-sm-10 ">
                        {!readOnly && (
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="invalidCheck"
                              required
                            />
                            <label class="form-check-label" for="invalidCheck">
                              Agree to terms and conditions
                            </label>
                            <div class="invalid-feedback">
                              You must agree before submitting.
                            </div>
                          </div>
                        )}
                      </div>

                      <div class="right" style={{ float: "right" }}></div>
                    </div>

                    <div class="form-group row">
                    
                      <div class="col-md-6">
                        {!readOnly && !isAddMode && formStep === 0 && (
                          <button
                            type="button"
                            class="btn  btn-primary"
                            onClick={() => setFormStep(1)}
                            style={{ right: "150px" }}
                          >
                            <i class="feather mr-2 icon-check-circle"></i>{" "}
                            {"Upload Picture "}
                          </button>
                        )}
                      </div>
                      <div class="col-md-6">
                        {!readOnly && (
                          <button type="submit" class="btn  btn-primary">
                            {loading ? (
                              <i className="fa fa-spinner fa-spin"></i>
                            ) : (
                              <i class="feather mr-2 icon-check-circle"></i>
                            )}{" "}
                            {isAddMode ? "Next" : "Update"}
                          </button>
                        )}

                        {readOnly && (
                          <button
                            type="submit"
                            class="btn  btn-primary"
                            style={{ float: "right" }}
                          >
                            {loading ? (
                              <i className="fa fa-spinner fa-spin"></i>
                            ) : (
                              <i class="feather mr-2 icon-check-circle"></i>
                            )}{" "}
                            I am interested
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                )}
                {formStep === 1 && <UploadImages refId={shipmentId} />}
              </div>
            </div>
          </div>
        </div>
    
    </>
  );
}
Login.layout = "main";
export default AddShipment;
