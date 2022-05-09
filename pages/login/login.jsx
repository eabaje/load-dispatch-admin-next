import React from "react";
import axios from "axios";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/Provider";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//import { yupResolver } from 'react-hook-form-resolvers';
import * as Yup from "yup";
import {
  LOAD_TYPE,
  LOAD_CAPACITY,
  LOAD_UNIT,
  TRIP_STATUS,
  API_URL,
} from "../../constants/enum";
import { signin2 } from "../../context/actions/auth/auth.action";
import { getError } from "../../utils/error";

function Login() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const history = useHistory();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const {
    authDispatch,
    authState: { isLoggedIn, loading },
  } = useContext(GlobalContext);

  const [isAuthenticated, setIsAuthenticated] = React.useState(isLoggedIn);

  //console.log(`isAuthenticated`, isLoggedIn);

  // React.useEffect(() => {
  //   if (isLoggedIn) {
  //     history.push("/dashboard");
  //   }
  //   if (error) {
  //     enqueueSnackbar(error, { variant: "error" });
  //   }
  // }, [isLoggedIn, history]);

  const SubmitForm = (formdata) => {
    // e.preventDefault();
    //  console.log("state:", formdata);

    signin2(formdata)(authDispatch)((res) => {
      // const userId=success.data.UserId;
      // res.user.isActivated===true ?
      // history.push(`/dashboard`)
      //  : history.push(`/user-profile/${res.user.UserId}`)
      // alert(res.user.UserId)
       history.push(`/dashboard`);
     
    })((err) => {
      document.forms[0].reset();
      
      enqueueSnackbar(err, { variant: "error" });
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(SubmitForm)}>
        <div className="form-group mb-3">
          <label className="floating-label" htmlFor="Email">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            name="Email"
            {...register("Email", {
              required: true,
            })}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="floating-label" htmlFor="Password">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="Password"
            {...register("Password")}
            required
          />
        </div>
        <div className="custom-control custom-checkbox text-left mb-4 mt-2">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Save credentials.
          </label>
        </div>
        <button className="btn btn-block btn-primary mb-4">
          {loading && <i className="fa fa-spinner fa-spin"></i>} Signin
        </button>
        <p className="mb-2 text-muted">
          Forgot password?{" "}
          <a href="/reset-password" className="f-w-400">
            Reset
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
