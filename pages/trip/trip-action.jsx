import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "next/router";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import AddEditTrip from "../../components/form/trip/AddEditTrip";


function AddTrip() {
  const router = useRouter()
  const {
    query
  } = router
  
  return (
    <>
    <MainLayout>
      <AddEditTrip query={query} />
    
    </MainLayout>
    </>
  );
}
//Login.layout = "main";
export default AddTrip;
