import React, { useState, useEffect, useContext } from "react";
import { Controller, useForm, useController } from "react-hook-form";

import { GlobalContext } from "../../../context/Provider";
import {
  LOAD_TYPE,
  LOAD_CAPACITY,
  LOAD_UNIT,
  ROLES,
} from "../../constants/enum";
import { fetchData, fetchDataAll } from "../../../helpers/query";
import { Editor } from "draft-js";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import WYSIWYGEditor from "../../../components/wysiwyg/wysiwyg";
import {
  subcribeUser,
  updateUserRole,
  updateUserSubscription,
} from "../../context/actions/user/user.action";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';


const AddEditUserRole = (query) => {
  const { userSubscriptionId,userId,action } = query;
 
  const isAddMode = !userId;
  

 

  
  const [subscribeUser, setSubscribeUser] = useState({});
  const [data, setData] = useState([]);
  const [subscriptionType, setsubscriptionType] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    control,
  } = useForm({ mode: "onChange" });
  const {
    authState: { user },
  } = useContext(GlobalContext)
  const {
    userDispatch,
    userState: {
      createUserSubscription: { loading },
    },
  } = useContext(GlobalContext);

  function onSubmit(formdata) {
    return isAddMode ? UpdateUserRole(formdata) : UpdateUserRole(formdata);
  }

  function UpdateUserRole(formdata) {
    updateUserRole(formdata)(userDispatch)((res) => {
      if (res.message) {
       toast.success(res.message)
      }
    });
  }

  useEffect(() => {
  

    if (!isAddMode) {
      fetchData(
        "user/findOne",
        userId
      )((userSubscription) => {
        setSubscribeUser(userSubscription);

        // const fields = ["SubscribeId", "StartDate", "Active", "EndDate"];
        // fields.forEach((field) => setValue(field, userSubscription[field]));
      })((err) => {
        toast.error(err);
      });
    }
  }, []);
  console.log(`subscribeUser`, subscribeUser);

  return (
    <>
    
        <div class="col-md-12">
          <div class="card">
            <div class="card-header alert alert-info">
              <h2>Add User Role Form</h2>
            </div>
            <div class="card-body">
              <div class="col-md-12 ">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="hidden"
                    name="UserId"
                    value={subscribeUser.UserId}
                    class="form-control"
                  />

                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Role Type</label>

                    <div class="col-sm-4">
                      <select
                        id="Role"
                        name="Role"
                        class="form-control"
                        {...register("Role", {
                          required: true,
                        })}
                        required
                      >
                        <option selected>Select Role Type</option>

                        {ROLES.map((item) => (
                          <option
                            key={item.value}
                            selected={
                              subscribeUser.UserRole?.RoleId === item.value
                            }
                            value={item.value}
                          >
                            {item.text}
                          </option>
                        ))}
                      </select>
                    </div>
                    <label class="col-sm-2 col-form-label">Full Name</label>

                    <div class="col-sm-4">
                      <input
                        name="FullName"
                        class="form-control"
                        value={subscribeUser?.FullName}
                        placeholder="User Name"
                        {...register("FullName", {
                          required: true,
                        })}
                        required
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
                    <div class="right" style={{ float: "right" }}>
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
//Login.layout = "main";






export default AddEditUserRole