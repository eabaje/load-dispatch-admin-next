import React, { useState, useContext, useEffect } from "react";
import { fetchData, fetchDataAll } from "../../helpers/query";
import {
  listUserSubscriptions,
  listUserSubscriptionByUserId,
} from "../../context/actions/user/user.action";
import { GlobalContext } from "../../context/Provider";

import { columns } from "../../datasource/dataColumns/usersubscription";

import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import Datatable from "../../components/datatable/datatable-m";
import dynamic from 'next/dynamic';


// import SortIcon from "@mui/icons-material/ArrowDownward";

function UserSubscription({query}) {

 // const router = useRouter()
  const {
    subscribeId,userId
  } = query
 
  const isSingleMode = !subscribeId;
 
  const [res, setData] = useState([]);
  
  // const [loading, setLoading] = useState(false);
  console.log(`userSubscriptionId`, subscribeId);
  console.log(`isSingleMode`, isSingleMode);
  // GET request function to your Mock API

  // enqueueSnackbar(getError(err), { variant: "error" });
  // Calling the function on component mount
  const {
    authState: { user },
  } = useContext(GlobalContext)
  const {
    userDispatch,
    userState: {
      UserSubscriptions: { data, loading },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
  

    if (data.length === 0) {
      listUserSubscriptions()(userDispatch)((res) => {})((err) => {
        toast.error(err);
      });
    }
   // console.log(`loading`, loading);
  }, []);
//  console.log(`data`, data);
  return (
   
    <MainLayout>
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header alert alert-info">
            <h3>List of User Subscription</h3>
            <hr />
            <ul>
              <li>Edit and delete Subscription</li>
              <li>Get an overview of all Subscription</li>
            </ul>
          </div>
          <div class="card-body table-border-style">
          <Datatable loading={loading} col={columns(user)} 
            data={
              userId
                ? data.data?.filter((item) => item?.UserId === userId)
                : subscribeId
                ? data.data?.filter(
                    (item) => item?.SubscribeId === parseInt(subscribeId)
                  )
                : data?.data
            }/>

         
          </div>
        </div>
      </div>
      </MainLayout>
  );
}
//Login.layout = "main";
//export default UserSubscription;
export async function getServerSideProps({ query }) {
  
  return {
    props: { query },
  };

 
}

export default dynamic(() => Promise.resolve(UserSubscription), { ssr: false });