import React, {useState, useContext, useEffect } from "react";

import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import AddEditUser from "../../components/form/user/AddEditUser";


function UserProfile() {

  const router = useRouter()
  const {
    query
  } = router
 
 
 
 // console.log("data", profile);
  return (
  
    <MainLayout>
      <AddEditUser query={query} />
      </MainLayout>
  );
}
//Login.layout = "main";
export default UserProfile;
