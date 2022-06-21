import React, { useState, useContext, useEffect } from "react";
import { IMG_URL, MEDIA_URL } from "../../../constants";
import { useForm, Controller } from "react-hook-form";

import { Country, State } from "country-state-city";

import { fetchData } from "../../../helpers/query";

import { GlobalContext } from "../../../context/Provider";
import {
  editUser,
  resetPassword,
  updateCompany,
} from "../../../context/actions/user/user.action";

import ImageUpload from "../../../components/upload/uploadImage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomButton from "../../../components/button/customButton";
import { SPECIALIZATION_TYPE } from "../../../constants/enum";
import CustomPopup from "../../../components/popup/popup.component";

import { toast } from "react-toastify";

import Pdfviewer from "../../pdf/pdfviewer";
import { getFiles } from "../../../helpers/uploadImage";
import Datatable from "../../datatable/datatable-m";
import { listVehiclesByCompany } from "../../../context/actions/vehicle/vehicle.action";
import { columns } from "../../../datasource/dataColumns/vehicle";

const ReviewCompany = ({ query }) => {
  const { companyId } = query;

  const isSingleMode = !companyId;

  const [profile, setProfile] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});

  const isAddMode = !companyId;

  const [imageInfos, setImageInfos] = useState([]);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [pickUpRegion, setPickUpRegion] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [selPickUpRegion, setselpickUpRegion] = useState("");
  const [value, setValues] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [visibilityImage, setVisibilityImage] = useState(false);
  function onChange(event) {
    setValues(event.target.value);
    // state.companyUser.Specilaization =
    //   event.target.options[event.target.selectedIndex].text;
    // console.log(
    //   "value:",
    //   event.target.options[event.target.selectedIndex].text
    //);
  }
  const popupCloseHandler = (e) => {
    //  PopUpClose()(userDispatch);
    setVisibility(e);
  };
  // Messages
  const required = "This field is required";
  const maxLength = "Your input exceed maximum length";

  // Error Component
  const errorMessage = (error) => {
    return (
      <p className="invalid-feedback" style={{ color: "red" }}>
        {error}
      </p>
    );
  };

  const selectCountry = async (e) => {
    setCountry((country) => e.target.value);

    setRegion(
      (region) =>
        // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
        (region = State.getStatesOfCountry(e.target.value))
    );
  };

  const selectPickUpCountry = async (e) => {
    setCountry((country) => e.target.value);

    setPickUpRegion(
      (pickUpRegion) =>
        // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
        (pickUpRegion = State.getStatesOfCountry(e.target.value))
    );
  };
  const popupCloseHandlerImage = (e) => {
    setVisibilityImage(e);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm();
  const {
    register: registerPassword,
    formState: { errors2 },
    setValue: setValue1,
    handleSubmit: handlePassword,
  } = useForm();

  const {
    register: registerCompany,
    formState: { errors3 },
    setValue: setValue2,
    handleSubmit: handleCompany,
  } = useForm();
  const {
    authState: { user },
    vehicleDispatch,
    vehicleState: {
      Vehicles: { vehicleData: data, loading },
    },
  } = useContext(GlobalContext);

  const getCompany = (companyId) => {
    fetchData(
      "user/findCompany",
      companyId
    )((company) => {
      console.log("company", company);
      setCompanyInfo(company);
      const fields2 = [
        "CompanyName",
        "ContactEmail",
        "ContactPhone",
        "Address",
        "Region",
        "Country",
        "CompanyType",
        "Specialization",
        "RoleType",
        "Website",
      ];
      fields2.forEach((field2) => setValue2(field2, company[field2]));
    })((err) => {
      toast.error(err);
    });
  };

  useEffect(() => {
    getCompany(companyId);
    if (companyId) {
      listVehiclesByCompany(companyId)(vehicleDispatch)((res) => {})((err) => {
        toast.error(err);
      });
    }
    // setCountries((countries) => (countries = Country.getAllCountries()));
    fetchData(
      "carrier/findOne",
      companyId
    )((user) => {
      setProfile(user);
      getCompany(companyId);
      const fields = [
        "FullName",
        "Email",
        "DOB",
        "Address",
        "City",
        "Country",
        "Phone",
        "PicUrl",
      ];
      fields.forEach((field) => setValue(field, user[field]));
      setEmail(user["Email"]);
      // setcompanyId(user["CompanyId"]);
      // setPickUpRegion(
      //   (pickUpRegion) =>
      //     // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
      //     (pickUpRegion = State.getStatesOfCountry(user["Country"]))
      // );

      // setselpickUpRegion(user["Region"]);
    })((err) => {
      toast.error(err);
    });
  }, []);

  useEffect(() => {
    if (companyId !== undefined) {
      getFiles(companyId, "pdf").then((files) => {
        const doc = files.data.data;

        setImageInfos(doc);
        console.log("GetFiles", doc);
      });
    }
  }, []);

  // console.log("userId", userId);
  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header alert alert-info">
          <h3>User Profile</h3>
          <hr />
          <ul>
            <li>Review Registrant Info</li>
            <li>Approve /Activate User</li>
          </ul>
        </div>
        <div className="card-body table-border-style">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="accordion" id="accordionExample">
                  <div className="card mb-0">
                    <div
                      className="card-header alert alert-info"
                      id="headingOne"
                    >
                      <h5 className="mb-0 ">
                        <a
                          href="#!"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Basic Company Info
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <form>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Company Name
                            </label>

                            <div className="col-sm-4">
                              <label className=" col-form-label">
                                {companyInfo.CompanyName}
                              </label>
                            </div>
                            <label className="col-sm-2 col-form-label">
                              Specialization
                            </label>

                            <div className="col-sm-4">
                              <label className=" col-form-label">
                                {companyInfo?.Specialization
                                  ? SPECIALIZATION_TYPE.find(
                                      (item) =>
                                        item.value ===
                                        companyInfo?.Specialization
                                    ).text
                                  : companyInfo?.Specialization}
                              </label>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Company Email
                            </label>

                            <div className="col-sm-4">
                              <label className=" col-form-label">
                                {companyInfo.ContactEmail}
                              </label>
                            </div>
                            <label className="col-sm-2 col-form-label">
                              Company Phone
                            </label>

                            <div className="col-sm-4">
                              <label className=" col-form-label">
                                {companyInfo.ContactPhone}
                              </label>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Region
                            </label>

                            <div className="col-sm-4">
                              <label className=" col-form-label">
                                {companyInfo?.Region
                                  ? State.getStateByCodeAndCountry(
                                      companyInfo?.Region,
                                      companyInfo?.Country
                                    ).name
                                  : companyInfo?.Region}
                              </label>
                            </div>
                            <label className="col-sm-2 col-form-label">
                              Country
                            </label>

                            <div className="col-sm-4">
                              <label className=" col-form-label">
                                {companyInfo.Country
                                  ? Country.getCountryByCode(
                                      companyInfo.Country
                                    ).name
                                  : companyInfo.Country}
                              </label>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Company Address
                            </label>

                            <div className="col-sm-10">
                              <label className=" col-form-label">
                                {companyInfo.ContactAddress}
                              </label>
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="col-md-12">
                              {imageInfos.length > 0 && (
                                <>
                                  <h5 className="alert alert-info">
                                    {" "}
                                    Company Document
                                  </h5>

                                  <ul className="list-group list-group-flush">
                                    {imageInfos.map((img, index) => (
                                      <li
                                        className="list-group-item"
                                        key={index}
                                      >
                                        {visibility && (
                                          <CustomPopup
                                            onClose={popupCloseHandler}
                                            show={visibility}
                                          >
                                            <Pdfviewer
                                              pdfLink={MEDIA_URL + img.ImgPath}
                                            />
                                          </CustomPopup>
                                        )}
                                        <a
                                          href="#"
                                          onClick={(e) =>
                                            setVisibility(!visibility)
                                          }
                                        >
                                          <i
                                            className="first fas fa-download"
                                            title="View PDF File"
                                            aria-hidden="true"
                                            style={{ cursor: "hand" }}
                                          ></i>
                                          {img.FileName}{" "}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="form-group"></div>

                          <div className="form-group row">
                            <div className="col-md-12">
                              {imageInfos.length > 0 && (
                                <>
                                  <h5 className="alert alert-info">
                                    {" "}
                                    Fleet Info
                                  </h5>
                                  <div className="card-body table-border-style">
                                    <Datatable
                                      loading={loading}
                                      col={columns(user)}
                                      data={data?.data}
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="form-group"></div>
                          <div className="form-row">
                            <div className="col-sm-10 "></div>
                            <div className="right" style={{ float: "right" }}>
                              <CustomButton
                                caption={"Activate User"}
                                loading={loading}
                                isAddMode={isAddMode}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//Login.layout = "main";

export default ReviewCompany;

//export default dynamic(() => Promise.resolve(ReviewCompany), { ssr: true });
