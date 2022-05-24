import React, { useState, useEffect, useContext } from "react";

import { useRouter } from "next/router"

import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import AddEditDriver from "../../components/form/driver/AddEditDriver";
import dynamic from 'next/dynamic';


const AddDriver=() => {
  
  // const onSubmit = (data) => console.log(data);
  const router = useRouter()
  const {
    query
  } = router


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



 

 
  return (
    <>
     
     <MainLayout>
       <AddEditDriver query={query}/>
      </MainLayout>
    </>
  );
}
//Login.layout = "main";
export default AddDriver;
