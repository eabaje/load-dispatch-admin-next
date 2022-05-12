import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router"
import { columns } from "../../datasource/dataColumns/company";
import { GlobalContext } from "../../context/Provider";

import LoadingBox from "../../components/notification/loadingbox";
import {
  listCompanyByCompanyId,
  listCompanys,
} from "../../context/actions/user/user.action";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import Datatable from "../../components/datatable/datatable-m";

function ListCompany({ history, match }) {

  const router = useRouter()
  const {
    query:companyId 
  } = router
 

  const [data2, setData] = useState([]);
 

  const {
    authState: { user },
  } = useContext(GlobalContext)
  const {
    userDispatch,
    userState: {
      Companys: { data, loading },
    },
  } = useContext(GlobalContext);

  const loadData=()=>{

    if (data.length === 0) {
      listCompanys()(userDispatch)((res) => {
       
      })((err) => {
       toast.error(err);
      });
    }

 
  }
  // Calling the function on component mount
  useEffect(() => {
    let controller = new AbortController();
    loadData();
    return () => controller?.abort();
   
   
  }, []);

  const tableData = {
    columns,
    data2,
  };
  return (
    <>
      <MainLayout>
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header alert alert-info">
              <h4>View List of Company</h4>
              <ul>
                <li>Edit and delete Company</li>
              </ul>
            </div>
            <Datatable loading={loading} col={columns(user)} 
            data={
                  companyId
                  ? data.data?.filter(
                      (item) => item?.CompanyId === parseInt(companyId)
                    )
                  : data?.data

            }/>
           
          </div>
        </div>
        </MainLayout>               
    </>
  );
}
Login.layout = "main";
export default ListCompany;
