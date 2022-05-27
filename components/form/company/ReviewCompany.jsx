import React, {useState, useContext, useEffect } from "react";
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
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';


const ReviewCompany = ({query}) => {
  const { companyId } = query;

  const isSingleMode = !companyId;

 
   const [profile, setProfile] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});

  const isAddMode = !companyId;

  const [IsEdit, setEdit] = useState(false);
  const [country, setCountry] = useState("");
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
      <p class="invalid-feedback" style={{ color: "red" }}>
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
  } = useContext(GlobalContext)
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
    setCountries((countries) => (countries = Country.getAllCountries()));
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
        toast.success(`Updated  Driver-${res.data.DriverName} successfully`)
    
    })((err) => {
      toast.error(err);
    });
  };

  function onChangePassword(formdata) {
    formdata.Email = profile?.Email;
   // console.log("fromPasword", formdata);
    resetPassword(formdata)(userDispatch)((res) => {
    
    toast.success(`Updated  Password successfully`)
     
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
 // console.log("userId", userId);
  return (
  
   
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header alert alert-info">
            <h3>User Profile</h3>
            <hr />
            <ul>
              <li>Review Registrant Info</li>
              <li>Approve /Activate User</li>
            </ul>
          </div>
          <div class="card-body table-border-style">
            <div class="container">
              <div class="row">
               



              <div class="col-sm-12">
                
                  <div class="accordion" id="accordionExample">
                    <div class="card mb-0">
                      <div class="card-header" id="headingOne">
                        <h5 class="mb-0"><a href="#!" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Basic Company Info</a></h5>
                      </div>
                      <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                        <form onSubmit={handleCompany(onChangeCompany)}>
                           
                        <div class="form-group row">
                                <label class="col-sm-2 col-form-label">
                                  Company Name
                                </label>

                                <div class="col-sm-4">
                                <label class=" col-form-label">
                                {companyInfo.CompanyName}
                                </label>  
                               
                                </div>
                                <label class="col-sm-2 col-form-label">
                                  Specialization
                                </label>
                               
                                <div class="col-sm-4">
                                <label class=" col-form-label">
                                  {companyInfo?.Specialization? SPECIALIZATION_TYPE.find((item) => item.value === companyInfo?.Specialization).text
                                :companyInfo?.Specialization}
                                 </label>  
                                </div>
                              </div>
                            
                              <div class="form-group row">
                                <label class="col-sm-2 col-form-label">
                                  Company Email
                                </label>

                                <div class="col-sm-4">
                                <label class=" col-form-label">{companyInfo.ContactEmail}</label> 
                                </div>
                                <label class="col-sm-2 col-form-label">
                                  Company Phone
                                </label>
                               
                                <div class="col-sm-4">
                                <label class=" col-form-label">{companyInfo.ContactPhone}</label>
                               
                                </div>
                              </div>

                              <div class="form-group row">
                                <label class="col-sm-2 col-form-label">
                                  Region
                                </label>

                                <div class="col-sm-4">
                                <label class=" col-form-label">{companyInfo?.Region
                                ? State.getStateByCodeAndCountry(companyInfo?.Region, companyInfo?.Country).name
                                : companyInfo?.Region
                                
                                }</label> 
                                </div>
                                <label class="col-sm-2 col-form-label">
                                  Country
                                </label>
                               
                                <div class="col-sm-4">
                                <label class=" col-form-label">{
                               companyInfo.Country ? Country.getCountryByCode(companyInfo.Country).name : companyInfo.Country}
                                </label>
                               
                                </div>
                              </div>


                              <div class="form-group row">
                                <label class="col-sm-2 col-form-label">
                                  Company Address
                                </label>

                                <div class="col-sm-10">
                                <label class=" col-form-label">{companyInfo.ContactAddress}</label> 
                                </div>
                               
                               
                                
                              </div>


                             

    
                           <div class="form-group row">
                             <div class="col-md-12">
                                  




                               <h5 class="alert alert-info"> </h5>
                             </div>
                           </div>
                           <div class="form-group"></div>

                           <div class="form-row">
                             <div class="col-sm-10 "></div>
                             <div class="right" style={{ float: "right" }}>
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
                    <div class="card mb-0">
                      <div class="card-header" id="headingTwo">
                        <h5 class="mb-0"><a href="#!" class="collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Company Document</a></h5>
                      </div>
                      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div class="card-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                          eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                          sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore
                          sustainable VHS.
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingThree">
                        <h5 class="mb-0"><a href="#!" class="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"></a></h5>
                      </div>
                      <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                          eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                          sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore
                          sustainable VHS.
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
}
//Login.layout = "main";


export default ReviewCompany

//export default dynamic(() => Promise.resolve(ReviewCompany), { ssr: true });