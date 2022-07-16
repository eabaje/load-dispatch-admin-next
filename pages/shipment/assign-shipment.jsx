import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Country, State } from "country-state-city";

import {
  LOAD_TYPE,
  LOAD_CAPACITY,
  LOAD_UNIT,
  TRIP_STATUS,
} from "../../constants/enum";
import { AssignShipmentsToDriver } from "../../context/actions/shipment/shipment.action";

//import "bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchData } from "../../helpers/query";
import UploadImages from "../../components/upload/image-upload";
import { toast } from "react-toastify";
import { GlobalContext } from "../../context/Provider";
import { listDriversByCompany } from "../../context/actions/driver/driver.action";
import dynamic from "next/dynamic";
import MainLayout from "../../layout/mainLayout";

const AssignShipment = ({ query }) => {
  const { shipmentId, companyId, driverId, review, action } = query;
  // const { SubscribeId } = match.params;
  const isAddMode = !shipmentId;

  const {
    authState: { user },
    shipmentDispatch,
    shipmentState: {
      createShipment: { data, loading },
    },
  } = useContext(GlobalContext);
  const {
    driverDispatch,
    driverState: {
      Drivers: { data: driverdata, error },
      createDriver: { data: assigndata, error: assignerror },
    },
  } = useContext(GlobalContext);
  // const {
  //   shipmentDispatch,
  //   shipmentState: {
  //     createShipment: { data, loading },
  //   },
  // } = useContext(GlobalContext);
  const [shipmentInfo, setShipmentInfo] = useState({});
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [pickUpRegion, setPickUpRegion] = useState([]);
  const [deliveryRegion, setdeliveryRegion] = useState([]);
  const [selpickUpRegion, setselpickUpRegion] = useState("");
  const [seldeliveryRegion, setseldeliveryRegion] = useState("");
  const [readOnly, setReadOnly] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [refId, setRefId] = useState("");
  const [driverName, setDriverName] = useState("");
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
    setCountries((countries) => (countries = Country.getAllCountries()));

    if (driverdata.length === 0) {
      if (driverId) {
        listDriversByCompany(companyId)(driverDispatch)((res) => {})((err) => {
          toast.error(err);
        });
      }
    }
    if (driverId && review) {
      fetchData(
        "driver/findOne",
        driverId
      )((res) => {
        setDriverName(res.DriverName);
      })((err) => {
        toast.error(err);
      });
    }

    if (!isAddMode) {
      fetchData(
        "shipment/findOne",
        shipmentId
      )((shipment) => {
        setShipmentInfo(shipment);
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
    AssignShipmentToDriver(formdata);
  }

  function AssignShipmentToDriver(formdata) {
    formdata.CompanyId = user.CompanyId;
    formdata.UserId = user.UserId;

    AssignShipmentsToDriver(formdata)(shipmentDispatch)((res) => {
      if (res) {
        toast.success(res.message);
      }
    })((error) => {
      toast.error(error);
    });
  }

  console.log(`readOnly`, readOnly);
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

  CustomInput.displayName = "CustomInput";

  return (
    <MainLayout>
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
                    value={shipmentInfo.ShipmentId}
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

                  {driverId && review && (
                    <>
                      <div className="form-group row">
                        <div className="col-md-12">
                          <h5 className="alert alert-info">
                            Assigned Shipment to Driver{" "}
                          </h5>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Driver
                        </label>
                        <div className="col-md-4">
                          <label className=" col-form-label">
                            {driverName}
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  {action === "driver" && (
                    <>
                      <div className="form-group row">
                        <div className="col-md-12">
                          <h5 className="alert alert-info">
                            Assign Shipment to Driver{" "}
                          </h5>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Driver To Assign
                        </label>
                        <div className="col-md-4">
                          <select
                            id="DriverId"
                            className="form-control"
                            {...shipmentform("DriverId", {
                              required: true,
                            })}
                          >
                            <option selected>Select Driver</option>
                            {driverdata?.data?.map((item) => (
                              <option key={item.DriverId} value={item.DriverId}>
                                {item.DriverName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {action === "company" && (
                    <>
                      <div className="form-group row">
                        <div className="col-md-12">
                          <h5 className="alert alert-info">
                            Assign Shipment to Company{" "}
                          </h5>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Driver To Assign
                        </label>
                        <div className="col-md-4">
                          <select
                            id="DriverId"
                            className="form-control"
                            {...shipmentform("DriverId", {
                              required: true,
                            })}
                          >
                            <option selected>Select Driver</option>
                            {driverdata?.data?.map((item) => (
                              <option key={item.DriverId} value={item.DriverId}>
                                {item.DriverName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="form-group row">
                    <div className="col-md-12">
                      <h5 className="alert alert-info">
                        {" "}
                        Pick Up Information{" "}
                      </h5>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Company Name
                    </label>

                    <div className="col-sm-4">
                      <label className=" col-form-label">
                        {shipmentInfo?.Company?.CompanyName}
                      </label>
                    </div>
                    <label className="col-sm-2 col-form-label">Industry</label>

                    <div className="col-sm-4">
                      <label className=" col-form-label">
                        {shipmentInfo?.Specialization
                          ? SPECIALIZATION_TYPE.find(
                              (item) =>
                                item.value === shipmentInfo?.Specialization
                            ).text
                          : shipmentInfo?.Specialization}
                      </label>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      PickUp Region
                    </label>

                    <div className="col-sm-4">
                      <label className=" col-form-label">
                        {shipmentInfo?.PickUpRegion
                          ? State.getStateByCodeAndCountry(
                              shipmentInfo?.PickUpRegion,
                              shipmentInfo?.PickUpCountry
                            ).name
                          : shipmentInfo?.PickUpRegion}
                      </label>
                    </div>
                    <label className="col-sm-2 col-form-label">
                      PickUp Country
                    </label>

                    <div className="col-sm-4">
                      <label className=" col-form-label">
                        {shipmentInfo.PickUpCountry
                          ? Country.getCountryByCode(shipmentInfo.PickUpCountry)
                              .name
                          : shipmentInfo.PickUpCountry}
                      </label>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      PickUp Address
                    </label>

                    <div className="col-md-4">
                      <label className=" col-form-label">
                        {shipmentInfo.PickUpAddress}
                      </label>
                    </div>

                    <label className="col-form-label col-md-2">
                      PickUp Date
                    </label>

                    <div className="col-md-4">
                      <label className=" col-form-label">
                        {Date.parse(shipmentInfo.PickUpDate)}
                      </label>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <h5 className="alert alert-info">
                        {" "}
                        Delivery Information{" "}
                      </h5>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Delivery Region
                    </label>

                    <div className="col-sm-4">
                      <label className=" col-form-label">
                        {shipmentInfo?.DeliveryRegion
                          ? State.getStateByCodeAndCountry(
                              shipmentInfo?.DeliveryRegion,
                              shipmentInfo?.DeliveryCountry
                            ).name
                          : shipmentInfo?.DeliveryRegion}
                      </label>
                    </div>
                    <label className="col-sm-2 col-form-label">
                      PickUp Country
                    </label>

                    <div className="col-sm-4">
                      <label className=" col-form-label">
                        {shipmentInfo.DeliveryCountry
                          ? Country.getCountryByCode(
                              shipmentInfo.DeliveryCountry
                            ).name
                          : shipmentInfo.DeliveryCountry}
                      </label>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Location/Address
                    </label>

                    <div className="col-md-4">
                      <label className=" col-form-label">
                        {shipmentInfo.DeliveryAddress}
                      </label>
                    </div>

                    <label className="col-form-label col-md-2">
                      Delivery Date
                    </label>
                    <div className="col-md-4">
                      <label className=" col-form-label">
                        {Date.parse(shipmentInfo.PickUpDate)}
                      </label>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <h5 className="alert alert-info">
                        {" "}
                        Fill in the information in the form accurately{" "}
                      </h5>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Contact Name
                    </label>

                    <div className="col-md-4">
                      <label className=" col-form-label">
                        {shipmentInfo.DeliveryContactName}
                      </label>
                    </div>
                    <label className="col-form-label col-md-2">
                      Contact Phone
                    </label>
                    <div className="col-md-4">
                      <label className=" col-form-label">
                        {shipmentInfo.DeliveryContactPhone}
                      </label>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">Email</label>

                    <div className="col-md-4">
                      <label className=" col-form-label">
                        {shipmentInfo.DeliveryEmail}
                      </label>
                    </div>

                    <label className="col-form-label col-md-2">
                      Shipment Date
                    </label>
                    <div className="col-md-4">{shipmentInfo.ShipmentDate}</div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Load category
                    </label>

                    <div className="col-md-4">
                      {" "}
                      {shipmentInfo?.LoadCategory
                        ? LOAD_TYPE.find(
                            (item) => item.value === shipmentInfo?.LoadCategory
                          ).text
                        : shipmentInfo?.LoadCategory}
                    </div>

                    <label className="col-sm-2 col-form-label">Load Type</label>
                    <div className="col-md-4">
                      {shipmentInfo?.LoadType
                        ? LOAD_CAPACITY.find(
                            (item) => item.value === shipmentInfo?.LoadType
                          ).text
                        : shipmentInfo?.LoadType}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Load Weight
                    </label>

                    <div className="col-sm-2">{shipmentInfo.LoadWeight}</div>
                    <label className="col-sm-2 col-form-label">Load Unit</label>
                    <div className="col-sm-2">
                      {shipmentInfo?.LoadUnit
                        ? LOAD_UNIT.find(
                            (item) => item.value === shipmentInfo?.LoadUnit
                          ).text
                        : shipmentInfo?.LoadUnit}
                    </div>

                    <label className="col-sm-1 col-form-label">Quantity</label>

                    <div className="col-sm-3">{shipmentInfo.Qty}</div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Description
                    </label>
                    <div className="col-md-10">{shipmentInfo.Description}</div>
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
                      {shipmentInfo.RequestForShipment}
                    </div>

                    <label className="col-sm-2 col-form-label">
                      Shipment Status
                    </label>
                    <div className="col-md-2">
                      {shipmentInfo?.ShipmentStatus
                        ? TRIP_STATUS.find(
                            (item) =>
                              item.value === shipmentInfo?.ShipmentStatus
                          ).text
                        : shipmentInfo?.ShipmentStatus}
                    </div>
                  </div>

                  <div className="form-group"></div>

                  <div className="form-group row">
                    <div className="col-md-10">
                      <button
                        type="submit"
                        className="btn  btn-primary"
                        style={{ float: "right" }}
                      >
                        {loading ? (
                          <i className="fa fa-spinner fa-spin"></i>
                        ) : (
                          <i className="feather mr-2 icon-check-circle"></i>
                        )}{" "}
                        Assign Shipment
                      </button>
                    </div>
                  </div>
                </form>
              )}
              {/* {formStep === 1 && <UploadImages refId={shipmentId} />} */}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

//export default AssignShipment;

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(AssignShipment), { ssr: false });
