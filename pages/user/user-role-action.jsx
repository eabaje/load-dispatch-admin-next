import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import AddEditUserRole from "../../components/form/user/AddEditUserRole";


function AddUserRole() {
  
  const router = useRouter()
  const {
    query
  } = router
 

  
  
 

  return (
    <>
     <MainLayout>
        <AddEditUserRole query={query} />
        </MainLayout>
    </>
  );
}
//Login.layout = "main";
export default AddUserRole;
