import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";

import { GlobalContext } from "/../../context/Provider";

import { columns } from "../../datasource/dataColumns/subscribe";
import { listSubscriptions } from "../../context/actions/subscribe/subscribe.action";
import LoadingBox from "../../components/notification/loadingbox";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import Datatable from "../../components/datatable/datatable-m";

function ListSubscription() {

  // const router = useRouter()
  // const {
  //   query:companyId 
  // } = router
  const [data2, setData] = useState([]);

  // const [loading, setLoading] = useState(true);
  const {
    authState: { user },
  } = useContext(GlobalContext)

  const {
    subscribeDispatch,
    subscribeState: {
      Subscribes: { data, loading }, //loading
    },
  } = useContext(GlobalContext);

  // Calling the function on component mount

  // const getSubscription = useCallback(() => {
  //   listSubscriptions()(subscribeDispatch);
  // }, []);

  useEffect(() => {
    if (data.length === 0) {
      listSubscriptions()(subscribeDispatch);
      ((result) => {
        setData(result.data);
      })((err) => {
        toast.error(err);
      });
    }

  }, []);

  

  return (
      <MainLayout>

          <div class="col-xl-12">
            <div class="card">
              <div class="card-header alert alert-info">
                <h3>List of Subscription</h3>
                <hr />
                <ul>
                  <li>Edit and delete Subscription</li>
                  <li>Get an overview of all Subscription</li>
                </ul>
              </div>
              <div class="card-body table-border-style">
              <Datatable loading={loading} col={columns(user)} 
            data={data}/>
               
              </div>
            </div>
          </div>
      </MainLayout>
  );
}
//ListSubscription.layout = "main";
export default ListSubscription;
