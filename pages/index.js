import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import React from "react";
//import axios from "axios";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/Provider";

import { useForm } from "react-hook-form";
//import { yupResolver } from "@hookform/resolvers/yup";
//import { yupResolver } from 'react-hook-form-resolvers';
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { signin2 } from "../context/actions/auth/auth.action";
import AuthLayout from "../layout/authLayout";

function Login() {
  const {
    register,
    formState: { errors },
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

    signin2(formdata)(authDispatch)((success) => {
      window.location.href = '/dashboard/'
     // history.push("/dashboard");
    })((err) => {
      console.log(`err`, err);
      toast.error(err);
    //  enqueueSnackbar(err, { variant: "error" });
    });
  };

  return (
    <AuthLayout>
      
        <form onSubmit={handleSubmit(SubmitForm)}>
          <div className="form-group mb-3">
            {/* <label className="floating-label">Email address</label> */}
            <input
              type="text"
              className="form-control"
              placeholder="Email address"
              name="Email"
              {...register("Email", {
                required: true,
              })}
              required
            />
          </div>
          <div className="form-group mb-4">
            {/* <label className="floating-label">Password</label> */}
            <input
              type="password"
              className="form-control"
               placeholder="Password"
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
            <label className="custom-control-label">Save credentials.</label>
          </div>
          <button className="btn btn-block btn-primary mb-4">
            {loading && <i classNameName="fa fa-spinner fa-spin"></i>} Signin
          </button>
          <p className="mb-2 text-muted">
            Forgot password?{" "}
            <a href="auth-reset-password.html" className="f-w-400">
              Reset
            </a>
          </p>
          <p className="mb-0 text-muted">
            Don’t have an account?{" "}
            <a href="   `" className="f-w-400">
              Signup
            </a>
          </p>
        </form>
     
    </AuthLayout>
  );
}

//Login.layout = "auth";

export default Login;
