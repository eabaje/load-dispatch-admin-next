import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router"

import { GlobalContext } from "../../context/Provider";

import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import { AddEditCarrier } from "../../components/form/carrier/AddEditCarrier";

function AddCarrier() {
  const {
    authState: { user, isLoggedIn },
  } = useContext(GlobalContext);

  const router = useRouter()
  const {
    query
  } = router

  return (
    <>
    <MainLayout>
        <AddEditCarrier  match={query} />
    </MainLayout>
    </>
  );
}

// AddCarrier.getInitialProps = ({ query: { example } }) => {
//   return { example }
// }
//AddCarrier.layout = "auth";
export default AddCarrier;
