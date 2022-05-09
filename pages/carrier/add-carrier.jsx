import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
//import { yupResolver } from 'react-hook-form-resolvers';
import * as Yup from "yup";
import axios from "axios";
import { Country, State } from "country-state-city";
import { GlobalContext } from "../../context/Provider";
import {
  LOAD_TYPE,
  LOAD_CAPACITY,
  LOAD_UNIT,
  API_URL,
} from "../../constants/enum";
import {
  createCarrier,
  editCarrier,
  listCarrierByCriteria,
  listCarriersById,
} from "../../context/actions/carrier/carrier.action";
import { fetchData } from "../../helpers/query";
import Rating from "../../components/rating/Rating";

function AddCarrier({ history, match }) {
  const { carrierId } = match.params;

  const isAddMode = !carrierId;
  // console.log(`params`, match.params);
  console.log(`isAddMode`, isAddMode);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    authState: { user, isLoggedIn },
  } = useContext(GlobalContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    carrierDispatch,
    carrierState: {
      createCarrier: { loading },
    },
  } = useContext(GlobalContext);

  function onSubmit(formdata) {
    return isAddMode
      ? CreateCarrier(formdata)
      : updateCarrier(formdata, carrierId);
  }

  function CreateCarrier(formdata) {
    formdata.CompanyId = user.CompanyId;

    createCarrier(formdata)(carrierDispatch)((res) => {
      if (res) {
        enqueueSnackbar(res.message, {
          variant: "success",
        });
        setTimeout(() => {
          closeSnackbar(res.message, {
            variant: "success",
          });
          history.push(
            `add-vehicle-to-carrier/${user.CompanyId}/${res.data.CarrierId}/${res.data.CarrierType}`
          );
        }, 5000);
      }
    })((err) => {
      enqueueSnackbar(err, {
        variant: "error",
      });
    });
  }
  function updateCarrier(formdata, id) {
    editCarrier(formdata, id)(carrierDispatch)((res) => {
      if (res.message) {
        enqueueSnackbar(res.message, {
          variant: "success",
        });
      }
    })((err) => {
      enqueueSnackbar(err, {
        variant: "error",
      });
    });
  }
  useEffect(() => {
    if (!isAddMode) {
      // console.log(`object`, fetchData("carrier/findOne", carrierId));
      // listCarriersById(carrierId)(carrierDispatch)()
      fetchData(
        "carrier/findOne",
        carrierId
      )((carrier) => {
        console.log(`carrier`, carrier);
        const fields = [
          "CarrierType",
          "FleetType",
          "FleetNumber",
          "Licensed",
          "AboutUs",
          "ServiceDescription",
          "Rating",
          "CompanyId",
        ];
        fields.forEach((field) => setValue(field, carrier[field]));
      })((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      });
    }
  }, []);

  return (
    <>
      <div className="col-md-12">
        <div className="card">
          <div className="card-header alert alert-info">
            <h2>Carrier Information</h2>
          </div>
          <div className="card-body">
            <div className="col-md-12 ">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="hidden"
                  name="UserId"
                  value={user.UserId}
                  className="form-control"
                  {...register("UserId")}
                />
                <input
                  type="hidden"
                  name="CompanyId"
                  value={user.CompanyId}
                  className="form-control"
                  {...register("CompanyId")}
                />

                <div className="form-group row">
                  <div className="col-md-12">
                    <h5 className="alert alert-info"> Basic Info </h5>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    Carrier category
                  </label>
                  <div className="col-md-4">
                    <select
                      id="CarrierType"
                      className="form-control"
                      {...register("CarrierType", {
                        required: true,
                      })}
                    >
                      <option selected>Select Carrier Categories</option>
                      {LOAD_TYPE.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </select>
                  </div>

                  <label className="col-sm-2 col-form-label">Fleet Type </label>
                  <div className="col-md-4">
                    <select
                      id="FleetType"
                      className="form-control"
                      {...register("FleetType", {
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
                  <label className="col-sm-2 col-form-label">
                    Fleet Number
                  </label>

                  <div className="col-sm-4">
                    <select
                      required="required"
                      className="form-control"
                      name="FleetNumber"
                      id="FleetNumber"
                      {...register("FleetNumber")}
                    >
                      <option value=""></option>
                      <option value="0-2">0-2</option>
                      <option value="3-5">3-5</option>
                      <option value="5-10">5-10</option>
                      <option value="11-20">11-20</option>
                      <option value="> 20">20+</option>
                    </select>
                  </div>
                  <label className="col-sm-2 col-form-label">Licensed?</label>
                  <div className="col-sm-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="Licensed"
                        className="form-check-input-custom-2"
                        {...register("Licensed", {
                          required: true,
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-form-label col-md-2">About Us</label>
                  <div className="col-md-10">
                    <input
                      name="AboutUs"
                      className="form-control"
                      placeholder="About Us"
                      {...register("AboutUs", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-form-label col-md-2">
                    Service Description
                  </label>
                  <div className="col-md-10">
                    <input
                      name="ServiceDescription"
                      className="form-control"
                      placeholder="Service Description"
                      {...register("ServiceDescription", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12"></div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <h6 className="alert alert-info">
                      After posting the basic information about your
                      service.kindly go to <b>List Carrier info</b> and add your
                      fleet.
                    </h6>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-sm-10 ">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="invalidCheck"
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="invalidCheck"
                      >
                        Agree to terms and conditions
                      </label>
                      <div className="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                  </div>
                  <div className="right" style={{ float: "right" }}>
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
                      {isAddMode ? "Submit" : "Update"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
AddCarrier.layout = "auth";
export default AddCarrier;
