import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Country, State } from "country-state-city";

import {
  LOAD_TYPE,
  LOAD_CAPACITY,
  LOAD_UNIT,
  TRIP_STATUS,
} from "../../../constants/enum";
import {
  createShipment,
  editShipment,
  showInterest,
} from "../../../context/actions/shipment/shipment.action";

//import "bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchData } from "../../../helpers/query";
import UploadImages from "../../../components/upload/image-upload";
import { toast } from 'react-toastify';
import { GlobalContext } from "../../../context/Provider";

const AddEditShipment = ({query}) => {
  const { shipmentId,  isReadOnly} = query;
  
  // const { SubscribeId } = match.params;
  const isAddMode = !shipmentId;


  const {
    authState: { user }, 
      shipmentDispatch,
      shipmentState: {
        createShipment: { data, loading },
     } ,
  } = useContext(GlobalContext)

  // const {
  //   shipmentDispatch,
  //   shipmentState: {
  //     createShipment: { data, loading },
  //   },
  // } = useContext(GlobalContext);
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
       
        (deliveryRegion = State.getStatesOfCountry(e.target.value))
    );
  };






  useEffect(() => {
    if (isReadOnly) setReadOnly(!readOnly);
    setCountries((countries) => (countries = Country.getAllCountries()));

   
   
    if (!isAddMode) {
    
      fetchData(
        "shipment/findOne",
        shipmentId
      )((shipment) => {
       
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
           
            (pickUpRegion = State.getStatesOfCountry(shipment["PickUpCountry"]))
        );

        setdeliveryRegion(
          (deliveryRegion) =>
           
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
        toast.error(err);
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
      
        toast.success("Created new Shipment successfully");
        setFormStep(1);
        console.log("formstep", formStep);
      }
    })((error) => {
     toast.error(error);
    });
  }

  function updateShipment(formdata, shipmentId) {
    editShipment(formdata, shipmentId)(shipmentDispatch)((res) => {
      if (res) {
      
        toast.success("Updated record successfully");
      }
    })((error) => {
        toast.error(error);
    });
  }

  function ShowInterest(formdata) {
   
    formdata.CompanyId = user.CompanyId;
    formdata.UserId = user.UserId;
  

    showInterest(formdata)(shipmentDispatch)((res) => {
      if (res) {
        toast.success(res.message);
      
      }
    })((error) => {
        toast.error(error);
    });
  }

  // console.log(`readOnly`, readOnly);
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => {
    return (
      <div className="input-group mb-3">
        <input
          ref={ref}
          type="text"
          className="form-control datepicker"
          value={value}
          onClick={onClick}
          placeholder="Click to enter date"
          required
        />
        <div className="input-group-append">
          <span className="input-group-text">
            <i className="fa fa-calendar"></i>
          </span>
        </div>
      </div>
    );
  });



  return (
    <div className="col-md-12">
    <div className="card">
      <div className="card-header alert-info">
        <h2>Shipment Information</h2>
      </div>
      <div className="card-body">
        <div className="col-md-12 ">
          {formStep === 0 && (
            <form onSubmit={handleShipment(onSubmit)}>
              <input
                type="hidden"
                name="UserId"
                value={user.UserId}
                className="form-control"
                {...shipmentform("UserId")}
              />
              <input
                type="hidden"
                name="ShipmentId"
                className="form-control"
                {...shipmentform("ShipmentId")}
              />
              <input
                type="hidden"
                name="CompanyId"
                value={user.CompanyId}
                className="form-control"
                {...shipmentform("CompanyId")}
              />

              <div className="form-group row">
                <div className="col-md-12">
                  <h5 className="alert alert-info">
                    {" "}
                    Fill in the information in the form accurately{" "}
                  </h5>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Load category
                </label>
                <div className="col-md-4">
                  <select
                    id="LoadCategory"
                    className="form-control"
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

                <label className="col-sm-2 col-form-label">Load Type</label>
                <div className="col-md-4">
                  <select
                    id="LoadType"
                    className="form-control"
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

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Load Weight</label>

                <div className="col-sm-2">
                  <input
                    name="LoadWeight"
                    className="form-control"
                    readOnly={readOnly}
                    placeholder="Load Weight"
                    {...shipmentform("LoadWeight", {
                      required: true,
                    })}
                    required
                  />
                </div>
                <label className="col-sm-2 col-form-label">Load Unit</label>
                <div className="col-sm-2">
                  <select
                    id="LoadUnit"
                    name="LoadUnit"
                    readOnly={readOnly}
                    className="form-control"
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

                <label className="col-sm-1 col-form-label">Quantity</label>

                <div className="col-sm-3">
                  <input
                  type="number"
                    name="Qty"
                    readOnly={readOnly}
                    className="form-control"
                    placeholder="Quantity"
                    {...shipmentform("Qty", {
                      required: true,
                    })}
                    required
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-form-label col-md-2">Description</label>
                <div className="col-md-10">
                  <input
                    name="Description"
                    className="form-control"
                    readOnly={readOnly}
                    placeholder="Give your detailed description of expected delivery"
                    {...shipmentform("Description", {
                      required: true,
                    })}
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <h5 className="alert alert-info"> Pick Up Information </h5>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label col-md-2">Country</label>
                <div className="col-md-4">
                  <select
                    name="PickUpCountry"
                    className="form-control"
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

                <label className="col-form-label col-md-2">
                  Region/State
                </label>
                <div className="col-md-4">
                  <select
                    name="PickUpRegion"
                    className="form-control"
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
              <div className="form-group row">
                <label className="col-form-label col-md-2">
                  PickUp Address
                </label>

                <div className="col-md-4">
                  <input
                    name="PickUpLocation"
                    readOnly={readOnly}
                    className="form-control"
                    placeholder="Pick Up location"
                    {...shipmentform("PickUpLocation", {
                      required: true,
                    })}
                    required
                  />
                </div>

                <label className="col-form-label col-md-2">PickUp Date</label>
                <div className="col-md-4">
                  <Controller
                    name={"ExpectedPickUpDate"}
                    readOnly={readOnly}
                    control={control}
                    // defaultValue={new Date()}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <DatePicker
                          wrapperclassNameName="datePicker"
                          classNameName="form-control datepicker"
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
              <div className="form-group row">
                <div className="col-md-12">
                  <h5 className="alert alert-info"> Delivery Information </h5>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-form-label col-md-2">Country</label>

                <div className="col-md-4">
                  <select
                    name="DeliveryCountry"
                    readOnly={readOnly}
                    className="form-control"
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
                <label className="col-form-label col-md-2">
                  Region/State
                </label>
                <div className="col-md-4">
                  <select
                    name="DeliveryRegion"
                    readOnly={readOnly}
                    className="form-control"
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

              <div className="form-group row">
                <label className="col-form-label col-md-2">
                  Location/Address
                </label>

                <div className="col-md-4">
                  <input
                    name="DeliveryLocation"
                    readOnly={readOnly}
                    className="form-control"
                    placeholder="Delivery location"
                    {...shipmentform("DeliveryLocation", {
                      required: true,
                    })}
                    required
                  />
                </div>

                <label className="col-form-label col-md-2">
                  Delivery Date
                </label>
                <div className="col-md-4">
                  <Controller
                    name={"ExpectedDeliveryDate"}
                    readOnly={readOnly}
                    control={control}
                    // defaultValue={new Date()}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <DatePicker
                          wrapperclassNameName="datePicker"
                          classNameName="form-control datepicker"
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

              <div className="form-group row">
                <label className="col-form-label col-md-2">
                  Contact Name
                </label>

                <div className="col-md-4">
                  <input
                    name="DeliveryContactName"
                    readOnly={readOnly}
                    className="form-control"
                    placeholder="Contact Name"
                    {...shipmentform("DeliveryContactName", {
                      required: true,
                    })}
                    required
                  />
                </div>
                <label className="col-form-label col-md-2">
                  Contact Phone
                </label>
                <div className="col-md-4">
                  <input
                    name="DeliveryContactPhone"
                    readOnly={readOnly}
                    placeholder="Contact Phone"
                    className="form-control"
                    {...shipmentform("DeliveryContactPhone", {
                      required: true,
                    })}
                    required
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-form-label col-md-2">Email</label>

                <div className="col-md-4">
                  <input
                    name="DeliveryEmail"
                    readOnly={readOnly}
                    className="form-control"
                    placeholder="Email"
                    {...shipmentform("DeliveryEmail", {
                      required: true,
                    })}
                    required
                    email
                  />
                </div>

                <label className="col-form-label col-md-2">
                  Shipment Date
                </label>
                <div className="col-md-4">
                  <Controller
                    name={"ShipmentDate"}
                    readOnly={readOnly}
                    control={control}
                    // defaultValue={new Date()}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <DatePicker
                          wrapperclassNameName="datePicker"
                          classNameName="form-control datepicker"
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
              <div className="form-group row">
                <div className="col-md-12">
                  <h5 className="alert alert-info">
                    {" "}
                    Request for Proposal Information{" "}
                  </h5>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-form-label col-md-2">
                  Request For Shipment
                </label>

                <div className="col-md-4">
                  <input
                    name="RequestForShipment"
                    readOnly={readOnly}
                    className="form-control"
                    placeholder=" State your requirement expectations"
                    {...shipmentform("RequestForShipment")}
                  />
                </div>

                <label className="col-sm-2 col-form-label">
                  Shipment Status
                </label>
                <div className="col-md-2">
                  <select
                    id="ShipmentStatus"
                    name="ShipmentStatus"
                    readOnly={readOnly}
                    className="form-control"
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

              <div className="form-group"></div>

              <div className="form-row">
                <div className="col-sm-10 ">
                  {!readOnly && (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="invalidCheck"
                        required
                      />
                      <label className="form-check-label" for="invalidCheck">
                        Agree to terms and conditions
                      </label>
                      <div className="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                  )}
                </div>

                <div className="right" style={{ float: "right" }}></div>
              </div>

              <div className="form-group row">
              
                <div className="col-md-6">
                  {!readOnly && !isAddMode && formStep === 0 && (
                    <button
                      type="button"
                      className="btn  btn-primary"
                      onClick={() => setFormStep(1)}
                      style={{ right: "150px" }}
                    >
                      <i className="feather mr-2 icon-check-circle"></i>{" "}
                      {"Upload Picture "}
                    </button>
                  )}
                </div>
                <div className="col-md-6">
                  {!readOnly && (
                    <button type="submit" className="btn  btn-primary">
                      {loading ? (
                        <i classNameName="fa fa-spinner fa-spin"></i>
                      ) : (
                        <i className="feather mr-2 icon-check-circle"></i>
                      )}{" "}
                      {isAddMode ? "Next" : "Update"}
                    </button>
                  )}

                  {readOnly && (
                    <button
                      type="submit"
                      className="btn  btn-primary"
                      style={{ float: "right" }}
                    >
                      {loading ? (
                        <i classNameName="fa fa-spinner fa-spin"></i>
                      ) : (
                        <i className="feather mr-2 icon-check-circle"></i>
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
  )
}

export default AddEditShipment