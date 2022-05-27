import React, { useState, useEffect, useContext } from "react";
import { Controller, useForm, useController } from "react-hook-form";
import { GlobalContext } from "..actions/../../context/Provider";
import {
  createSubscription,
  editSubscription,
  listSubscriptionsBySubscriptionId,
} from "../../../context/actions/subscribe/subscribe.action";
import { fetchData } from "../../../helpers/query";
import { Editor } from "draft-js";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import WYSIWYGEditor from "../../../components/wysiwyg/wysiwyg";

import { toast } from 'react-toastify';


const AddEditSubscription = ({query}) => {
  const { subscribeId } =query;
  const isAddMode = !subscribeId;
 

  const [data, setData] = useState([]);

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
    subscribeDispatch,
    subscribeState: { createSubscribe: error, loading },
  } = useContext(GlobalContext);

  const getSubscriptionById = (id) => {
    //  e.preventDefault();

    return listSubscriptionsBySubscriptionId(id)(subscribeDispatch);
  };

  function onSubmit(formdata) {
    return isAddMode
      ? CreateSubscription(formdata)
      : updateSubscription(subscribeId, formdata);
  }

  function CreateSubscription(formdata) {
    createSubscription(formdata)(subscribeDispatch)((res) => {
      if (res) {
        enqueueSnackbar(res.message, {
          variant: "success",
        });
      }
    })((err) => {
      toast.error(err);
    });
  }

  function updateSubscription(id, formdata) {
  
    editSubscription(id, formdata)(subscribeDispatch)((res) => {
      if (res) {
        enqueueSnackbar(res.message, {
          variant: "success",
        });
      }
    })((err) => {
      toast.error(err);
    });
  }

  useEffect(() => {
  

    if (!isAddMode) {
      fetchData(
        "subscription/findOne",
        subscribeId
      )((subscription) => {
        console.log(`subscription`, subscribeId);
        const fields = [
          "SubscriptionType",
          "SubscriptionName",
          "Amount",
          "Description",
          "Active",
          "Duration",
        ];
        fields.forEach((field) => setValue(field, subscription[field]));
      })((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      });
    }
  }, []);

  return (
    <>
    
        <div class="col-md-12">
          <div class="card">
            <div class="card-header alert alert-info">
              <h2>Subscription Form</h2>
            </div>
            <div class="card-body">
              <div class="col-md-12 ">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="hidden"
                    name="UserId"
                    value={user.UserId}
                    class="form-control"
                  />

                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">
                      Subscription Type
                    </label>

                    <div class="col-sm-4">
                      <input
                        name="SubscriptionType"
                        class="form-control"
                        placeholder="Subscription Type "
                        {...register("SubscriptionType", {
                          required: true,
                        })}
                        required
                      />
                    </div>
                    <label class="col-sm-2 col-form-label">
                      Subscription Name
                    </label>

                    <div class="col-sm-4">
                      <input
                        name="SubscriptionName"
                        class="form-control"
                        placeholder="Subscription Name"
                        {...register("SubscriptionName", {
                          required: true,
                        })}
                        required
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Amount</label>
                    <div class="col-sm-2">
                      <input
                        name="Amount"
                        type="number"
                        class="form-control"
                        placeholder="Amount"
                        {...register("Amount")}
                        required
                      />
                    </div>

                    <label class="col-sm-2 col-form-label">Duration</label>
                    <div class="col-sm-2">
                      <input
                        name="Duration"
                        type="number"
                        class="form-control"
                        placeholder="Duration"
                        {...register("Duration")}
                        required
                      />
                    </div>
                    {/* <div class="col-sm-2"> Active?</div> */}
                    <label class="col-sm-2 col-form-label">Active?</label>
                    <div class="col-md-2">
                      <div class="form-check">
                        <input
                          class="form-check-input-custom"
                          name="Active"
                          type="checkbox"
                          id="Active"
                          {...register("Active")}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-form-label col-md-2">Description</label>
                    <div class="col-md-10">
                      {/* <Controller
                        as={<WYSIWYGEditor />}
                        name="editor_content"
                        control={control}
                      /> */}
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
                      <h5 class="alert alert-info"> </h5>
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


export default AddEditSubscription