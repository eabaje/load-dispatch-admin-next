import React, { useState, useEffect, useContext } from "react";
import { Controller, useForm, useController } from "react-hook-form";
import { GlobalContext } from "../../context/Provider";
import { LOAD_TYPE, LOAD_CAPACITY, LOAD_UNIT } from "../../constants/enum";
import {
  createSubscription,
  editSubscription,
  listSubscriptionsBySubscriptionId,
} from "../../context/actions/subscribe/subscribe.action";
import { fetchData } from "../../helpers/query";
import { Editor } from "draft-js";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import WYSIWYGEditor from "../../components/wysiwyg/wysiwyg";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import AddEditSubscription from "../../components/form/subscribe/AddEditSubscription";
import dynamic from 'next/dynamic';


function AddSubscription({query}) {

  // const router = useRouter()
  // const {
  //   query
  // } = router
 
  const { subscribeId } = query;
  const isAddMode = !subscribeId;
 

  

  useEffect(() => {
  

  }, []);

  return (
    <>
     <MainLayout>
        <AddEditSubscription query={query} />
     </MainLayout>
    </>
  );
}
//AddSubscription.layout = "main";
//export default AddSubscription;
export async function getServerSideProps({ query }) {
  
  return {
    props: { query },
  };

 
}

export default dynamic(() => Promise.resolve(AddSubscription), { ssr: false });
