import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Country, State } from "country-state-city";
import { GlobalContext } from "../../../context/Provider";
import { LOAD_TYPE, LOAD_CAPACITY, LOAD_UNIT } from "../../../constants/enum";
import {
  createVehicle,
  editVehicle,
} from "../../../context/actions/vehicle/vehicle.action";
import { fetchData, fetchDataAll } from "../../../helpers/query";
import {
  assignDriverToVehicle,
  listDriversByCompany,
} from "../../../context/actions/driver/driver.action";
import UploadImages from "../../../components/upload/image-upload";

import { toast } from 'react-toastify';


const AddEditVehicle = ({query}) =>  {


  const { vehicleId,companyId,carrierId,carrierType,driverId } = query;
 
  const isAddMode = !vehicleId;
  const [formStep, setFormStep] = useState(0);
  const [refId, setRefId] = useState("");
 

  // const onSubmit = (data) => console.log(data);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    authState: { user },
  } = useContext(GlobalContext)

  const {
    vehicleDispatch,
    vehicleState: {
      createVehicle: { loading },
    },
  } = useContext(GlobalContext);

  const {
    driverDispatch,
    driverState: {
      Drivers: { data: driverdata, error },
      createDriver: { data: assigndata, error: assignerror },
    },
  } = useContext(GlobalContext);

  function SubmitForm(formdata) {
    console.log("formdata", formdata);
    return isAddMode
      ? CreateVehicle(formdata)
      : driverId
      ? AssignDriverToVehicle(formdata, vehicleId)
      : EditVehicle(formdata, vehicleId);
  }

  function CreateVehicle(formdata) {
  //  console.log(`formdata`, formdata);
    createVehicle(formdata)(vehicleDispatch)((res) => {
      enqueueSnackbar(res.message, {
        variant: "success",
      });
      setRefId(res.data.VehicleId);
      setFormStep(1);
      //Route to Upload Pictures for vehicle
    })((err) => {
      toast.error(err);
    });
  }
    const SetFormStep=()=>{

      setFormStep(0);

    }

  function EditVehicle(data, id) {
    editVehicle(data, id)(vehicleDispatch)((res) => {
      enqueueSnackbar(res.message, {
        variant: "success",
      });
    })((err) => {
      toast.error(err);
    });
  }

  function AssignDriverToVehicle(data, id) {
    assignDriverToVehicle(data, id)(driverDispatch)((res) => {
      enqueueSnackbar(res.message, {
        variant: "success",
      });
    })((err) => {
      toast.error(err);
      //  enqueueSnackbar(err, { variant: "error" });
    });
  }


  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
  

    if (driverdata.length === 0) {
      if (driverId) {
        listDriversByCompany(companyId)(driverDispatch)((res) => {})((err) => {
          toast.error(err);
        });
      }
    }
    if (!isAddMode) {
      fetchData(
        "vehicle/findOne",
        vehicleId
      )((res) => {
        const fields = [
          "VehicleType",
          "VehicleId",
          "VehicleNumber",
          "SerialNumber",
          "VehicleMake",
          "Description",
          "VehicleColor",
          "VehicleModel",
          "SerialNumber",
          "LicensePlate",
          "Insured",
          "VehicleModelYear",
          "PurchaseYear",
          "CompanyId",
          "CarrierId",
        ];
        fields.forEach((field) => setValue(field, res[field]));
        setRefId(vehicleId);
      })((err) => {
        toast.error(err);
      });
    }
  }, []);
  //console.log('data', driverdata)
  return (
    <>
     
    
        <div class="col-md-12">
          <div class="card">
            <div class="card-header alert alert-info">
              <h2 class="alert alert-info">Vehicle Information</h2>
            </div>
            <div class="card-body">
              <div class="col-md-12 ">
                {formStep === 0 && (
                  <form onSubmit={handleSubmit(SubmitForm)}>
                    <input
                      type="hidden"
                      name="UserId"
                      value={user.UserId}
                      class="form-control"
                      {...register("UserId")}
                    />
                    <input
                      type="hidden"
                      name="CompanyId"
                      value={companyId}
                      class="form-control"
                      {...register("CompanyId")}
                    />
                    <input
                      type="hidden"
                      name="CarrierId"
                      value={carrierId}
                      class="form-control"
                      {...register("CarrierId")}
                    />
                    {vehicleId && (
                      <input
                        type="hidden"
                        name="VehicleId"
                        value={vehicleId}
                        class="form-control"
                        {...register("VehicleId")}
                      />
                    )}
                    {driverId && (
                      <>
                        <div class="form-group row">
                          <div class="col-md-12">
                            <h5 class="alert alert-info">
                              Assign Vehicle to Driver{" "}
                            </h5>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-2 col-form-label">
                            Driver To Assign
                          </label>
                          <div class="col-md-4">
                            <select
                              id="DriverId"
                              class="form-control"
                              {...register("DriverId", {
                                required: true,
                              })}
                            >
                              <option selected>Select Driver</option>
                              {driverdata?.data?.map((item) => (
                                <option
                                  key={item.DriverId}
                                  value={item.DriverId}
                                >
                                  {item.DriverName}
                                </option>
                              ))}
                            </select>
                          </div>

                          <label class="col-sm-2 col-form-label">
                            Vehicle License Number(VIN)
                          </label>
                          <div class="col-sm-4">
                            <input
                              name="VehicleNumber"
                              id="VehicleNumber"
                              class="form-control"
                              placeholder="Vehicle Number"
                              {...register("VehicleNumber", {
                                required: true,
                              })}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div class="form-group row">
                      <div class="col-md-12">
                        <h5 class="alert alert-info"> Vehicle Info </h5>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">
                        Vehicle Type
                      </label>
                      <div class="col-md-4">
                        <select
                          id="VehicleType"
                          class="form-control"
                          {...register("VehicleType", {
                            required: true,
                          })}
                        >
                          <option selected>Select Vehicle Type</option>
                          {LOAD_TYPE.map((item) => (
                            <option
                              key={item.value}
                              selected={carrierType === item.value}
                              value={item.value}
                            >
                              {item.text}
                            </option>
                          ))}
                        </select>
                      </div>

                      <label class="col-sm-2 col-form-label">
                        Vehicle License Number(VIN)
                      </label>
                      <div class="col-sm-4">
                        <input
                          name="VehicleNumber"
                          class="form-control"
                          placeholder="Vehicle Number"
                          {...register("VehicleNumber", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">
                        Serial Number
                      </label>

                      <div class="col-sm-4">
                        <input
                          name="SerialNumber"
                          class="form-control"
                          placeholder="Serial Number"
                          {...register("SerialNumber", {
                            required: true,
                          })}
                        />
                      </div>
                      <label class="col-sm-2 col-form-label">
                        Vehicle Make
                      </label>
                      <div class="col-sm-4">
                        <input
                          name="VehicleMake"
                          class="form-control"
                          placeholder="Vehicle Make"
                          {...register("VehicleMake", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-form-label col-md-2">Description</label>
                      <div class="col-md-10">
                        <input
                          name="Description"
                          class="form-control"
                          placeholder="Description"
                          {...register("Description")}
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-md-12">
                        <h5 class="alert alert-info"> Vehicle Information </h5>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-form-label col-md-2">
                        Vehicle Color
                      </label>

                      <div class="col-md-4">
                        <input
                          name="VehicleColor"
                          class="form-control"
                          placeholder="Vehicle Color"
                          {...register("VehicleColor", {
                            required: true,
                          })}
                          required
                        />
                      </div>
                      <label class="col-form-label col-md-2">
                        Vehicle Model
                      </label>
                      <div class="col-md-4">
                        <input
                          name="VehicleModel"
                          class="form-control"
                          placeholder="Vehicle Model"
                          {...register("VehicleModel", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-form-label col-md-2">
                        Vehicle License Plate
                      </label>

                      <div class="col-md-4">
                        <input
                          name="LicensePlate"
                          class="form-control"
                          placeholder="License Plate"
                          {...register("LicensePlate", {
                            required: true,
                          })}
                        />
                      </div>

                      <label class="col-form-label col-md-2">
                        Vehicle Model Year
                      </label>

                      <div class="col-md-4">
                        <input
                          name="VehicleModelYear"
                          placeholder="Vehicle Model Year"
                          class="form-control"
                          {...register("VehicleModelYear", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-form-label col-md-2">
                        Purchase Year
                      </label>

                      <div class="col-md-4">
                        <input
                          name="PurchaseYear"
                          class="form-control"
                          placeholder=" Enter Purchase year"
                          {...register("PurchaseYear")}
                        />
                      </div>

                      <label class="col-sm-2 col-form-label">Insured?</label>
                      <div class="col-sm-4">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            name="Insured"
                            class="form-check-input-custom-2"
                            {...register("Insured", {
                              required: true,
                            })}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-md-12">
                        <h5 class="alert alert-info"></h5>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-sm-10 ">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="IsValid"
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
                    </div>
                    <div class="form-group row">
                      <div class="col-md-6 "></div>
                      <div class="col-md-4 ">
                        <span>
                          {!isAddMode && formStep === 0 && (
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
                        </span>
                        <span>
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
                            {isAddMode
                              ? "Submit"
                              : driverId
                              ? "Assign Driver"
                              : "Update"}
                          </button>
                        </span>
                      </div>
                    </div>
                  </form>
                )}
                {formStep === 1 && (
                  <UploadImages
                    title={`Upload Vehicle Pictures`}
                    refId={vehicleId}
                    backArrow={'back'}
                    SetFormStep={SetFormStep}
                    uploadType={'vehicle'}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        
    </>
  );
}
//Login.layout = "main";


export default AddEditVehicle