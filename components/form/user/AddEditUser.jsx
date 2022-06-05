import React, { useState, useContext, useEffect } from "react";
import { IMG_URL } from "../../../constants";
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
import UpdateUserFileUpload from "../../../components/upload/edit-user-file-upload";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import UpdateFileUpload from "../../upload/edit-file-upload";
import DocumentUpload from "../../upload/doc-file-upload";

const AddEditUser = ({ query }) => {
  const { userId } = query;

  const isSingleMode = !userId;

  const [profile, setProfile] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});

  const isAddMode = !userId;

  const [IsEdit, setEdit] = useState(false);
  const [country, setCountry] = useState("");
  const [companyId, setcompanyId] = useState("");
  const [email, setEmail] = useState("");
  const [countries, setCountries] = useState([]);
  const [pickUpRegion, setPickUpRegion] = useState([]);
  const [region, setRegion] = useState([]);
  const [picFile, setpicFile] = useState(null);
  const [docFile, setdocFile] = useState(null);

  const [imgUrl, setImgUrl] = useState("");
  const [selPickUpRegion, setselpickUpRegion] = useState("");
  const [value, setValues] = useState("");
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
  const onChangePicHandler = async (e) => {
    setpicFile((picFile) => e.target.files[0]);
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
    userDispatch,
    userState: { User: data, loading },
  } = useContext(GlobalContext);
  const {
    authState: { user },
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
    setCountries((countries) => (countries = Country.getAllCountries()));
    fetchData(
      "user/findOne",
      userId
    )((user) => {
      setProfile(user);
      getCompany(user.CompanyId);
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
      setcompanyId(user["CompanyId"]);
      setPickUpRegion(
        (pickUpRegion) =>
          // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
          (pickUpRegion = State.getStatesOfCountry(user["Country"]))
      );

      setselpickUpRegion(user["Region"]);
    })((err) => {
      toast.error(err);
    });
  }, []);

  function onSubmit(formdata) {
    // console.log(`formdata`, formdata);
    return isAddMode ? null : UpdateDriver(userId, formdata);
  }

  const UpdateDriver = (data) => {
    editUser(data)(userDispatch)((res) => {
      //  console.log(`data`, data);
      toast.success(`Updated  Driver-${res.data.DriverName} successfully`);
    })((err) => {
      toast.error(err);
    });
  };

  function onChangePassword(formdata) {
    formdata.Email = profile?.Email;
    // console.log("fromPasword", formdata);
    resetPassword(formdata)(userDispatch)((res) => {
      toast.success(`Updated  Password successfully`);
    })((err) => {
      toast.error(err);
    });
  }

  function onChangeCompany(formdata) {
    updateCompany(formdata, formdata.CompanyId)(userDispatch)((res) => {
      toast.success(`Updated  Company Profile successfully`);
    })((err) => {
      toast.error(err);
    });
  }

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
  console.log("userId", userId);
  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header alert alert-info">
          <h3>User Profile</h3>
          <hr />
          <ul>
            <li>View and Edit User Profile</li>
            <li>Change User Password</li>
          </ul>
        </div>
        <div className="card-body table-border-style">
          <div className="container">
            <div className="row">
              {/* <!-- [ accordion-collapse ] start --> */}
              <div className="col-sm-12">
                <div className="accordion" id="accordionExample">
                  <div className="card ">
                    <div className="card-header alert-info" id="headingOne">
                      <h5 className="mb-0">
                        <a
                          href="#!"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Profile
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                    >
                      <div className="card user-card">
                        <div className="card-block">
                          <div className="user-image">
                            <img
                              src={
                                profile?.UserPicUrl
                                  ? IMG_URL + profile?.UserPicUrl
                                  : "https://bootdey.com/img/Content/avatar/avatar7.png"
                              }
                              className="img-radius"
                              alt="User-Profile-Image"
                            />
                          </div>
                          <h6 className="f-w-600 m-t-25 m-b-10">
                            {profile?.FullName}
                          </h6>
                          <h6 className="f-w-600 m-t-25 m-b-10">
                            {profile?.Company?.CompanyName}
                          </h6>
                          <h7 className="f-w-600 m-t-25 m-b-10">
                            {profile?.Address}
                          </h7>
                          <p className="text-muted">
                            {profile?.IsActivated && "Active"}
                            {profile?.DOB && "| Born " + profile?.DOB}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header alert-info" id="headingTwo">
                      <h5 className="mb-0">
                        <a
                          href="#!"
                          className="collapsed"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Update {profile?.FullName} Profile
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <div className="col-md-12 ">
                          <form
                            encType="multipart/form-data"
                            onSubmit={handleSubmit(onSubmit)}
                          >
                            <input
                              type="hidden"
                              name="UserId"
                              value={profile?.UserId}
                              className="form-control"
                            />
                            <input
                              type="hidden"
                              name="CompanyId"
                              value={profile?.CompanyId}
                              className="form-control"
                              {...register("CompanyId")}
                            />
                            <input
                              type="hidden"
                              name="PicUrl"
                              className="form-control"
                              {...register("PicUrl")}
                            />

                            <div className="form-group row">
                              <div className="col-md-12 ">
                                <ImageUpload
                                  refId={userId}
                                  show={userId ? false : true}
                                  url="/user/findOne/"
                                  fieldName="UserPicUrl"
                                  onChangePicHandler={onChangePicHandler}
                                />
                                <a
                                  href="#"
                                  onClick={(e) =>
                                    setVisibilityImage(!visibilityImage)
                                  }
                                >
                                  <i className="first fas fa-pen"></i>
                                </a>

                                {visibilityImage && (
                                  <CustomPopup
                                    onClose={popupCloseHandlerImage}
                                    show={visibilityImage}
                                    title="Upload File"
                                  >
                                    <UpdateUserFileUpload
                                      refId={userId}
                                      fileType="image"
                                      email={email}
                                      companyId={companyId}
                                      popupCloseHandlerImage={
                                        popupCloseHandlerImage
                                      }
                                    />
                                  </CustomPopup>
                                )}
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-md-12">
                                <h5 className="alert alert-info"> </h5>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Company Name
                              </label>

                              <div className="col-sm-4">
                                <input
                                  name="CompanyName"
                                  className="form-control"
                                  readOnly="readonly"
                                  value={profile?.Company?.CompanyName}
                                  placeholder="Company Name"
                                  {...register("CompanyName")}
                                />
                              </div>
                              <label className="col-sm-2 col-form-label">
                                Name
                              </label>

                              <div className="col-sm-4">
                                <input
                                  name="FullName"
                                  className="form-control"
                                  value={profile?.FullName}
                                  placeholder="Driver Name"
                                  {...register("FullName", {
                                    required: true,
                                  })}
                                  required
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Email
                              </label>
                              <div className="col-sm-4">
                                <input
                                  name="Email"
                                  className="form-control"
                                  placeholder="Email"
                                  value={profile?.Email}
                                  {...register("Email", {
                                    required: true,
                                  })}
                                  required
                                />
                              </div>

                              <label className="col-sm-2 col-form-label">
                                Phone
                              </label>
                              <div className="col-sm-4">
                                <input
                                  name="Phone"
                                  className="form-control"
                                  value={profile?.Phone}
                                  placeholder="Phone"
                                  {...register("Phone", {
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                DOB
                              </label>
                              <div className="col-sm-4">
                                <Controller
                                  name={"DOB"}
                                  control={control}
                                  // defaultValue={new Date()}
                                  render={({ field: { onChange, value } }) => {
                                    return (
                                      <DatePicker
                                        wrapperclassName="datePicker"
                                        className="form-control datepicker"
                                        onChange={onChange}
                                        selected={value}
                                        yearDropdownItemNumber={100}
                                        // dateFormat="dd-MM-yyyy"
                                        scrollableYearDropdown={true}
                                        showYearDropdown
                                        showMonthDropdown
                                        placeholderText="Enter date"
                                        customInput={<CustomInput />}
                                      />
                                    );
                                  }}
                                />
                              </div>

                              <label className="col-sm-2 col-form-label">
                                City
                              </label>
                              <div className="col-sm-4">
                                <input
                                  name="City"
                                  value={profile?.City}
                                  className="form-control"
                                  placeholder="City"
                                  {...register("City")}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-form-label col-md-2">
                                Country
                              </label>
                              <div className="col-md-4">
                                <select
                                  name="Country"
                                  className="form-control"
                                  {...register("Country")}
                                  onChange={selectPickUpCountry}
                                >
                                  <option value="">Select Country</option>
                                  {countries.map((item) => (
                                    <option
                                      key={item.isoCode}
                                      value={item.isoCode}
                                    >
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
                                  name="Region"
                                  className="form-control"
                                  id="Region"
                                  {...register("Region", {
                                    required: true,
                                  })}
                                >
                                  <option value="">
                                    {" "}
                                    Select Region/State{" "}
                                  </option>
                                  {pickUpRegion.map((item) => (
                                    <option
                                      key={item.isoCode}
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
                                Address
                              </label>
                              <div className="col-md-10">
                                <input
                                  name="Address"
                                  className="form-control"
                                  placeholder="Address"
                                  {...register("Address", {
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <div className="col-md-12">
                                <h5 className="alert alert-info"> </h5>
                              </div>
                            </div>
                            <div className="form-group"></div>

                            <div className="form-row">
                              <div className="col-sm-10 "></div>
                              <div className="right" style={{ float: "right" }}>
                                <CustomButton
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
                  <div className="card">
                    <div className="card-header alert-info" id="headingThree">
                      <h5 className="mb-0">
                        <a
                          href="#!"
                          className="collapsed"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Update Company Info
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseThree"
                      className="collapse"
                      aria-labelledby="headingThree"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <form onSubmit={handleCompany(onChangeCompany)}>
                          <input
                            type="hidden"
                            name="CompanyId"
                            className="form-control"
                            {...registerCompany("CompanyId")}
                          />
                          <input
                            type="hidden"
                            name="Email"
                            value={profile?.Email}
                            className="form-control"
                            {...registerCompany("Email")}
                          />
                          <div className="form-group col-sm-10">
                            <select
                              name="RoleType"
                              className="form-control"
                              id="RoleType"
                              {...registerCompany("RoleType", {
                                required: "* Please describe your business",
                              })}
                              onChange={onChange}
                            >
                              <option value="">
                                {" "}
                                Please describe your business{" "}
                              </option>

                              {SPECIALIZATION_TYPE.map((item) => (
                                <option
                                  key={item.value}
                                  selected={
                                    companyInfo?.CompanyType === item.value
                                  }
                                  value={item.value}
                                >
                                  {item.text}
                                </option>
                              ))}
                            </select>

                            {errors.RoleType &&
                              errors.RoleType.type === "required" &&
                              errorMessage(required)}
                            <input
                              id="Role"
                              name="Role"
                              type="hidden"
                              value={value}
                              // ref={rolesRef}
                              {...registerCompany("Role")}
                            />
                          </div>
                          <div className="form-group col-sm-10">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="* Company Name"
                              name="CompanyName"
                              {...registerCompany("CompanyName", {
                                required: true,
                                maxLength: 50,
                              })}
                            />
                            {errors.CompanyName &&
                              errors.CompanyName.type === "required" &&
                              errorMessage(required)}
                            {errors.CompanyName &&
                              errors.CompanyName.type === "maxLength" &&
                              errorMessage(maxLength)}
                          </div>

                          <div className="form-group col-sm-10">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Company Address"
                              name="Address"
                              {...registerCompany("Address", {
                                required: true,
                              })}
                            />
                            {errors.CompanyAddress &&
                              errors.CompanyAddress.type === "required" &&
                              errorMessage(required)}
                          </div>
                          <div className="form-group col-sm-10">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="* Company Email"
                              name="ContactEmail"
                              {...registerCompany("ContactEmail", {
                                required: true,
                                pattern: /^\S+@\S+$/i,
                              })}
                            />
                            {errors.ContactEmail &&
                              errors.ContactEmail.type === "required" &&
                              errorMessage(required)}
                          </div>
                          <div className="form-group col-sm-10">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="* Contact Phone"
                              name="ContactPhone"
                              {...registerCompany("ContactPhone", {
                                required: true,
                              })}
                            />
                            {errors.ContactPhone &&
                              errors.ContactPhone.type === "required" &&
                              errorMessage(required)}
                          </div>
                          <div className="form-group col-sm-10">
                            <select
                              name="Country"
                              className="form-control"
                              {...registerCompany("Country", {
                                required: "Select Country",
                              })}
                              onChange={selectCountry}
                            >
                              <option value="">Select Country</option>
                              {countries.map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                  {item.name}
                                </option>
                              ))}
                            </select>

                            {errors.Country &&
                              errors.Country.type === "required" &&
                              errorMessage(required)}
                          </div>

                          <div className="form-group col-sm-10">
                            <select
                              name="Region"
                              className="form-control"
                              id="Region"
                              {...registerCompany("Region")}
                            >
                              <option value=""> Select Region/State </option>
                              {region.map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="form-group col-sm-10">
                            <input
                              className="form-control"
                              type="url"
                              placeholder="Website"
                              name="Website"
                              {...registerCompany("Website")}
                            />
                          </div>

                          <div className="form-group row">
                            <div className="col-md-12">
                              <h5 className="alert alert-info"> </h5>
                            </div>
                          </div>
                          <div className="form-group"></div>

                          <div className="form-row">
                            <div className="col-sm-10 "></div>
                            <div className="right" style={{ float: "right" }}>
                              <CustomButton
                                loading={loading}
                                isAddMode={isAddMode}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header alert-info" id="headingFour">
                      <h5 className="mb-0">
                        <a
                          href="#!"
                          className="collapsed"
                          data-toggle="collapse"
                          data-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          Company Document
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseFour"
                      className="collapse"
                      aria-labelledby="headingFour"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <DocumentUpload
                          refId={companyId}
                          title={"Upload Document Files"}
                          fileType="file"
                          email={email}
                          companyId={companyId}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header alert-info" id="headingFour">
                      <h5 className="mb-0 ">
                        <a
                          href="#!"
                          className="collapsed"
                          data-toggle="collapse"
                          data-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          Change Password
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseFour"
                      className="collapse"
                      aria-labelledby="headingFour"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <form onSubmit={handlePassword(onChangePassword)}>
                          <input
                            type="hidden"
                            name="Email"
                            value={profile?.Email}
                            className="form-control"
                            {...registerPassword("Email")}
                          />
                          <div className="form-group row">
                            <label className="col-form-label col-md-2">
                              Password
                            </label>
                            <div className="col-md-10">
                              <input
                                name="Password"
                                className="form-control"
                                placeholder="Password"
                                {...registerPassword("Password", {
                                  required: true,
                                })}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="col-md-12">
                              <h5 className="alert alert-info"> </h5>
                            </div>
                          </div>
                          <div className="form-group"></div>

                          <div className="form-row">
                            <div className="col-sm-10 "></div>
                            <div className="right" style={{ float: "right" }}>
                              <CustomButton
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
              {/* <!-- [ accordion-collapse ] end --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//Login.layout = "main";

export default AddEditUser;

//export default dynamic(() => Promise.resolve(AddEditUser), { ssr: false });
