import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router"
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import DetailDriver from "../../components/form/carrier/DetailDriver";

function DriverDetail() {
  const router = useRouter()
  const {
    query
  } = router
 

 
  return (
    <>
    <MainLayout>
      <DetailDriver query={query} />
      </MainLayout>         
    </>
  );
}

//Login.layout = "main";
export default DriverDetail;
