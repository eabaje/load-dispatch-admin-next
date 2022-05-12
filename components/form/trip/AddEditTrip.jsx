import React from 'react'

import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import { Country, State } from "country-state-city";
import { GlobalContext } from "../../../context/Provider";
import { LOAD_TYPE, LOAD_CAPACITY, LOAD_UNIT } from "../../constants/enum";
import { createTrip, editTrip } from "../../../context/actions/trip/trip.action";
import "bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchData } from "../../../helpers/query";

import { toast } from 'react-toastify';


const AddEditTrip = (query) => {
  const { tripId,shipmentId, Istrackable,isReadOnly } = query;
  
  // const { SubscribeId } = match.params;
  const isAddMode = !tripId;
 
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [pickUpRegion, setPickUpRegion] = useState([]);
  const [deliveryRegion, setdeliveryRegion] = useState([]);

  const [selpickUpRegion, setselpickUpRegion] = useState("");
  const [seldeliveryRegion, setseldeliveryRegion] = useState("");
 
  const [readOnly, setReadOnly] = useState(false);
  // const onSubmit = (data) => console.log(data);
  const {
    authState: { user },
  } = useContext(GlobalContext)
  useEffect(() => {
    if (isReadOnly) setReadOnly(!readOnly);
    setCountries((countries) => (countries = Country.getAllCountries()));

  
    // console.log(`user`, user.CompanyId);
    if (!isAddMode) {
      fetchData(
        "trip/findOne",
        tripId
      )((trip) => {
        //  console.log(`shipment`, shipment);
        const fields = [
          "ShipmentId",
          "DriverName",
          "CompanyId",
          "VehicleId",
          "Duration",
          "Description",
          "PickUpRegion",
          "PickUpCountry",
          "PickUpLocation",
          "DeliveryCountry",
          "DeliveryRegion",
          "DeliveryLocation",
          "ExpectedPickUpDate",
          "ExpectedDeliveryDate",
          "DriverNote",
        ];
        fields.forEach((field) => setValue(field, trip[field]));

        setPickUpRegion(
          (pickUpRegion) =>
            // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
            (pickUpRegion = State.getStatesOfCountry(trip["PickUpCountry"]))
        );

        setdeliveryRegion(
          (deliveryRegion) =>
            // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
            (deliveryRegion = State.getStatesOfCountry(trip["DeliveryCountry"]))
        );

        setselpickUpRegion(trip["PickUpRegion"]);
        setseldeliveryRegion(trip["DeliveryRegion"]);
      })((err) => {
        toast.error(err);
      });
    }
  }, []);

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
  const {
    register: tripform,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm();

  const {
    tripDispatch,
    tripState: {
      createTrip: { data: tripdata, error: triperror },
    },
  } = useContext(GlobalContext);

  function onSubmit(formdata) {
    return isAddMode ? CreateTrip(formdata) : updateTrip(formdata, tripId);
  }

  function CreateTrip(formdata) {
    // formdata.CompanyId = user.CompanyId;
    // formdata.UserId = user.UserId;

    createTrip(formdata)(tripDispatch)((res) => {
      if (res) {
        toast.success("Created new Trip enytry successfully");
      }
    })((err) => {
      toast.error(err);
    });
  }

  function updateTrip(formdata, tripId) {
    editTrip(formdata, tripId)(tripDispatch)((res) => {
      if (res) {
        toast.success("Updated record successfully");
      }
    })((err) => {
      toast.error(err);
    });
  }

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
  
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header alert alert-info">
              <h2> Trip Entry Information</h2>
            </div>
            <div class="card-body">
              <div class="col-md-12 ">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="hidden"
                    value={user.UserId}
                    class="form-control"
                  />
                  <input type="hidden" value="DriverId" class="form-control" />
                  <input
                    type="hidden"
                    value={user.CompanyId}
                    class="form-control"
                  />
                  <div class="form-group row">
                    <div class="col-md-12">
                      <h5 class="alert alert-info"> Trip Basic Info </h5>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-form-label col-md-2">Driver Name</label>
                    <div class="col-md-10">
                      <input name="DriverName" class="form-control" readOnly />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">
                      Shipment Reference Id
                    </label>

                    <div class="col-sm-4">
                      <input
                        name="ShipmentId"
                        class="form-control"
                        placeholder="Shipment Reference Number"
                        {...tripform("ShipmentId")}
                        required
                      />
                    </div>

                    <label class="col-sm-2 col-form-label">Vehicle Id</label>

                    <div class="col-sm-4">
                      <input
                        name="VehicleId"
                        class="form-control"
                        placeholder="Vehicle Id"
                        {...tripform("VehicleId")}
                        required
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-form-label col-md-2">Driver Note</label>
                    <div class="col-md-10">
                      <input
                        name="DriverNote"
                        class="form-control"
                        placeholder="Driver Note"
                        {...tripform("DriverNote", {
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
                        {...tripform("PickUpCountry")}
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

                    <label class="col-form-label col-md-2">Region/State</label>
                    <div class="col-md-4">
                      <select
                        name="PickUpRegion"
                        class="form-control"
                        id="PickUpRegion"
                        {...tripform("PickUpRegion")}
                        required
                      >
                        <option value=""> Select Region/State </option>
                        {pickUpRegion.map((item) => (
                          <option value={item.isoCode}>{item.name}</option>
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
                        class="form-control"
                        placeholder="Pick Up Location"
                        {...tripform("PickUpLocation", {
                          required: true,
                        })}
                        required
                      />
                    </div>
                    <label class="col-form-label col-md-2">PickUp Date</label>
                    <div class="col-md-4">
                      <Controller
                        name={"ExpectedPickUpDate"}
                        control={control}
                        // defaultValue={new Date()}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <DatePicker
                              wrapperClassName="datePicker"
                              className="form-control datepicker"
                              onChange={onChange}
                              selected={value}
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
                        class="form-control"
                        {...tripform("DeliveryCountry")}
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
                    <label class="col-form-label col-md-2">Region/State</label>
                    <div class="col-md-4">
                      <select
                        name="DeliveryRegion"
                        class="form-control"
                        id="DeliveryRegion"
                        {...tripform("DeliveryRegion", {
                          required: true,
                        })}
                      >
                        <option value=""> Select Region/State </option>
                        {deliveryRegion.map((item) => (
                          <option value={item.isoCode}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-form-label col-md-2">
                      Location/Address
                    </label>

                    <div class="col-md-10">
                      <input
                        name="DeliveryLocation"
                        class="form-control"
                        placeholder="Delivery Location"
                        {...tripform("DeliveryLocation")}
                        required
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-form-label col-md-2">Trip Duration</label>

                    <div class="col-md-4">
                      <input
                        type="number"
                        name="Duration"
                        class="form-control"
                        placeholder="Trip Duration"
                        {...tripform("Duration")}
                        required
                      />
                    </div>

                    <label class="col-form-label col-md-2">Delivery Date</label>
                    <div class="col-md-4">
                      <Controller
                        name={"ExpectedDeliveryDate"}
                        control={control}
                        // defaultValue={new Date()}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <DatePicker
                              wrapperClassName="datePicker"
                              className="form-control datepicker"
                              onChange={onChange}
                              selected={value}
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
                      <h5 class="alert alert-info"> Driver Note </h5>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-form-label col-md-2">
                      Driver Note(s)
                    </label>

                    <div class="col-md-10">
                      <input
                        name="DriverNote"
                        class="form-control"
                        placeholder=" Driver Note"
                        {...tripform("DriverNote")}
                      />
                    </div>
                  </div>

                  <div class="form-group"></div>

                  <div class="form-row">
                    <div class="col-sm-10 ">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck"
                          required
                        />
                        <label class="form-check-label" for="invalidCheck">
                          I confirm all information entered are accurate
                        </label>
                        <div class="invalid-feedback">
                          You must agree before submitting.
                        </div>
                      </div>
                    </div>
                    <div class="right" style={{ float: "right" }}>
                      <button
                        type="submit"
                        class="btn  btn-primary"
                        style={{ float: "right" }}
                      >
                        <i class="feather mr-2 icon-check-circle"></i> Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
   
    </>
  );
}
//Login.layout = "main";


export default AddEditTrip