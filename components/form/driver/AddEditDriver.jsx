import React, { useState, useEffect, useContext } from "react";

import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import { Country, State } from "country-state-city";
import { GlobalContext } from "../../context/Provider";
import { LOAD_TYPE, LOAD_CAPACITY, LOAD_UNIT } from "../../constants/enum";
import {
  createDriver,
  editDriver,
} from "../../context/actions/driver/driver.action";
import ImageUpload from "../../components/upload/uploadImage";
import "bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomButton from "../../components/button/customButton";
import { fetchData } from "../../helpers/query";
import { IMG_URL } from "../../constants";
import CustomPopup from "../../components/popup/popup.component";
import Pdfviewer from "../../components/pdf/pdfviewer";
import UpdateFileUpload from "../../components/upload/edit-file-upload";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';

const AddEditDriver = (query) => {
    const { driverId } = query;
    const isAddMode = !driverId;
    let imgPath = "";
    
    const [IsEdit, setEdit] = useState(false);
    const [country, setCountry] = useState("");
    const [companyId, setcompanyId] = useState("");
    const [email, setEmail] = useState("");
    const [countries, setCountries] = useState([]);
    const [pickUpRegion, setPickUpRegion] = useState([]);
    const [picFile, setpicFile] = useState(null);
    const [docFile, setdocFile] = useState(null);
    const [docUrl, setdocUrl] = useState(null);
    const [doc, setdoc] = useState(null);
    const [url, setUrl] = useState(null);
    const [selPickUpRegion, setselpickUpRegion] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [visibilityImage, setVisibilityImage] = useState(false);
    const [visibilityFile, setVisibilityFile] = useState(false);
    // const onSubmit = (data) => console.log(data);
    const {
      authState: { user },
    } = useContext(GlobalContext)
  
  
    const popupCloseHandler = (e) => {
      setVisibility(e);
    };
    const popupCloseHandlerImage = (e) => {
      setVisibilityImage(e);
    };
  
    const popupCloseHandlerFile = (e) => {
      setVisibilityFile(e);
    };
  
    const selectPickUpCountry = async (e) => {
      setCountry((country) => e.target.value);
  
      setPickUpRegion(
        (pickUpRegion) =>
          // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
          (pickUpRegion = State.getStatesOfCountry(e.target.value))
      );
    };
  
    const onChangePicHandler = async (e) => {
      setpicFile((picFile) => e.target.files[0]);
    };
    console.log(`picFile`, picFile);
  
    const onChangeDocHandler = async (e) => {
      setdocFile((docFile) => e.target.files[0]);
    };
  
    console.log(`docFile`, docFile);
  
    useEffect(() => {
      setCountries((countries) => (countries = Country.getAllCountries()));
    
      if (!isAddMode) {
        fetchData(
          "driver/findOne",
          driverId
        )((driver) => {
          console.log(`driver`, IMG_URL + driver["PicUrl"]);
          setUrl(driver["PicUrl"]);
          imgPath = driver["PicUrl"];
          //  alert(imgPath)
          const fields = [
            "DriverName",
            "Email",
            "DOB",
            "Address",
            "City",
            "Country",
            "Phone",
            "PicUrl",
            "Licensed",
            "LicenseUrl",
            "DriverDocs",
          ];
          fields.forEach((field) => setValue(field, driver[field]));
          //  setImgUrl(driver["PicUrl"]);
          setEmail(driver["Email"]);
          setcompanyId(driver["CompanyId"]);
          setdocUrl(IMG_URL + driver.DriverDocs);
  
          const splitdoc = driver?.DriverDocs ? driver.DriverDocs.split("/"): null;
          if (splitdoc!==null){(setdoc(splitdoc[2]))} ;
          setPickUpRegion(
            (pickUpRegion) =>
              // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
              (pickUpRegion = State.getStatesOfCountry(driver["Country"]))
          );
  
          setselpickUpRegion(driver["Region"]);
        })((err) => {
          enqueueSnackbar(err.message, { variant: "error" });
        });
      }
      console.log(`docUrl`, docUrl);
    }, []);
  
    const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
      control,
    } = useForm();
  
    const {
      driverDispatch,
      driverState: {
        createDriver: { error, loading },
      },
    } = useContext(GlobalContext);
  
    function onSubmit(formdata) {
      // console.log(`formdata`, formdata);
      return isAddMode
        ? CreateDriver(formdata)
        : UpdateDriver(formdata, driverId);
    }
  
    const CreateDriver = (data) => {
      data.CompanyId = user.CompanyId;
  
      console.log(`form`, data);
      createDriver(data, picFile, docFile)(driverDispatch)((res) => {
        if (res) {
          enqueueSnackbar(
            `Created New Driver-${res.data.DriverName} successfully`,
            {
              variant: "success",
            }
          );
        }
      })((error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      });
    };
  
    const UpdateDriver = (data, driverId) => {
      data.CompanyId = user.CompanyId;
  
      editDriver(data, driverId)(driverDispatch)((res) => {
        console.log(`res`, res);
        if (res) {
          enqueueSnackbar(`Updated  Driver-${res.data.DriverName} successfully`, {
            variant: "success",
          });
        }
      })((error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      });
    };
  
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
    <div class="col-md-12">
    <div class="card">
      <div class="card-header alert alert-info">
        <h2>Driver Information Collection Form</h2>
      </div>
      <div class="card-body">
        <div class="col-md-12 ">
          <form
            enctype="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="hidden"
              name="UserId"
              value={user.UserId}
              class="form-control"
            />
            <input
              type="hidden"
              name="CompanyId"
              value={user.CompanyId}
              class="form-control"
              {...register("CompanyId")}
            />
            <input
              type="hidden"
              name="PicUrl"
              class="form-control"
              {...register("PicUrl")}
            />
            <input
              type="hidden"
              name="LicenseUrl"
              class="form-control"
              {...register("LicenseUrl")}
            />
            <div class="form-group row">
              <div class="col-md-12 ">
                <span>
                  {" "}
                  <ImageUpload
                    refId={driverId}
                    show={driverId ? false : true}
                    url="/driver/findOne/"
                    fieldName="PicUrl"
                    onChangePicHandler={onChangePicHandler}
                  />
                  {driverId && (
                    <a
                      href="#"
                      onClick={(e) =>
                        setVisibilityImage(!visibilityImage)
                      }
                    >
                      <i className="first fas fa-pen" title="Update your picture"></i>
                    </a>
                  )}
                </span>

                {visibilityImage && (
                  <CustomPopup
                    onClose={popupCloseHandlerImage}
                    show={visibilityImage}
                   
                  >
                    <UpdateFileUpload
                      refId={driverId}
                      fileType="image"
                      email={email}
                      companyId={companyId}
                      popupCloseHandlerImage={popupCloseHandlerImage}
                    />
                  </CustomPopup>
                )}
              </div>
              <div class="col-md-2">
                <span> </span>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-12">
                <h5 class="alert alert-info"> </h5>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Company Name</label>

              <div class="col-sm-4">
                <input
                  name="CompanyName"
                  class="form-control"
                  readOnly="readonly"
                  value={user.CompanyName}
                  placeholder="Company Name"
                  {...register("CompanyName")}
                />
              </div>
              <label class="col-sm-2 col-form-label">Driver Name</label>

              <div class="col-sm-4">
                <input
                  name="DriverName"
                  class="form-control"
                  placeholder="Driver Name"
                  {...register("DriverName", {
                    required: true,
                  })}
                  required
                />
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Email</label>
              <div class="col-sm-4">
                <input
                  name="Email"
                  class="form-control"
                  placeholder="Email"
                  {...register("Email", {
                    required: true,
                  })}
                  required
                />
              </div>

              <label class="col-sm-2 col-form-label">Phone</label>
              <div class="col-sm-4">
                <input
                  name="Phone"
                  class="form-control"
                  placeholder="Phone"
                  {...register("Phone", {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">DOB</label>
              <div class="col-sm-4">
                <Controller
                  name={"DOB"}
                  control={control}
                  // defaultValue={new Date()}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <DatePicker
                        wrapperClassName="datePicker"
                        className="form-control datepicker"
                        onChange={onChange}
                        selected={Date.parse(value)}
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

              <label class="col-sm-2 col-form-label">City</label>
              <div class="col-sm-4">
                <input
                  name="Phone"
                  class="form-control"
                  placeholder="City"
                  {...register("City")}
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-form-label col-md-2">Country</label>
              <div class="col-md-4">
                <select
                  name="Country"
                  class="form-control"
                  {...register("Country")}
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
                  name="Region"
                  class="form-control"
                  id="Region"
                  {...register("Region", {
                    required: true,
                  })}
                >
                  <option value=""> Select Region/State </option>
                  {pickUpRegion.map((item) => (
                    <option
                      selected={selPickUpRegion === item.isoCode}
                      value={item.isoCode}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-form-label col-md-2">Address</label>
              <div class="col-md-10">
                <input
                  name="Address"
                  class="form-control"
                  placeholder="Address"
                  {...register("Address", {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-2"> Drivers License?</div>

              <div class="col-md-4">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    name="Licensed"
                    type="checkbox"
                    {...register("Licensed", {
                      required: true,
                    })}
                    required
                  />
                </div>
              </div>
              {driverId ? (
                <div class="col-md-6 ">
                  {docUrl && (
                    <a
                      href="#"
                      onClick={(e) => setVisibility(!visibility)}
                    >
                      {doc} <i className="first fas fa-download" title="View PDF File"></i>
                    </a>
                  )}

                  {visibility && (
                    <CustomPopup
                      onClose={popupCloseHandler}
                      show={visibility}
                     
                    >
                      <Pdfviewer pdfLink={docUrl} />
                    </CustomPopup>
                  )}

                  <a
                    href="#"
                    onClick={(e) => setVisibilityFile(!visibilityFile)}
                  >
                    <i className="first fas fa-pen" title="Upload PDF File"></i>
                  </a>

                  {visibilityFile && (
                    <CustomPopup
                      onClose={popupCloseHandler}
                      show={visibilityFile}
                     
                    >
                      <UpdateFileUpload
                        refId={driverId}
                        fileType="file"
                        email={email}
                        companyId={companyId}
                      />
                    </CustomPopup>
                  )}
                </div>
              ) : (
                <>
                  {" "}
                  <label class="col-form-label col-md-2">
                    Attach Drivers License
                  </label>
                  <div class="col-md-4">
                    <input
                      className="form-control"
                      type="file"
                      id="fileLicenseUrl"
                      name="fileLicenseUrl"
                      {...register("fileLicenseUrl")}
                      onChange={(e) => onChangeDocHandler(e)}
                    />
                  </div>
                </>
              )}
            </div>

            <div class="form-group row alert alert-info">
              <div class="col-md-8 "></div>
              <div class="col-md-4 "></div>
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
                <CustomButton loading={loading} isAddMode={isAddMode} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddEditDriver






