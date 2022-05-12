import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';


function AddUserSubscription() {
  const router = useRouter()
  const {
    query
  } = router
 

  useEffect(() => {
  

  }, []);
 
  return (
    <>
    <MainLayout>
      <AddUserSubscription query={query} />
      </MainLayout>
    </>
  );
}
//Login.layout = "main";
export default AddUserSubscription;
