import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import AddEditShipment from "../../components/form/shipment/AddEditShipment";

function AddShipment() {

  const router = useRouter()
  const {
    query
  } = router

  // const { shipmentId } = match.params;
  // const { isReadOnly } = match.params;
  // // const { SubscribeId } = match.params;
  // const isAddMode = !shipmentId;

 
  
  const {
    authState: { user },
  } = useContext(GlobalContext)
  

 

  useEffect(() => {
    

   
    // console.log(`user`, user.CompanyId);
  
  }, []);


  // console.log(`readOnly`, readOnly);
 

  return (
    <>
     <MainLayout>
          <AddEditShipment query={query} />
    </MainLayout>
    </>
  );
}
//Login.layout = "main";
export default AddShipment;
