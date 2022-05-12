import React, { useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useState } from "react";

import { ChevronsDown, Edit, Trash, Truck } from "react-feather";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Form from "react-bootstrap/Form";
import "react-data-table-component-extensions/dist/index.css";
import { columns } from "../../datasource/dataColumns/carrier";
import { GlobalContext } from "../../context/Provider";
import {
  listCarriers,
  listCarriersByCompany,
  listCarriersById,
} from "../../context/actions/carrier/carrier.action";
import LoadingBox from "../../components/notification/loadingbox";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify'
import Datatable from "../../components/datatable/datatable-m";

function ListCarrier() {
 // const { companyId } = match.params; { history, match }
  const { companyId } = useParams();
 
  
  const {
    authState: { user },
  } = useContext(GlobalContext)
  const {
    carrierDispatch,
    carrierState: {
      Carriers: { data, loading },
    },
  } = useContext(GlobalContext);

  // GET request function to your Mock API
  const loadData = () => {
   
    companyId
      ? listCarriersByCompany(companyId)(carrierDispatch)((res) => {
          // setData(res.data);
        })((err) => {
          toast.error(err);
        })
      : listCarriers()(carrierDispatch)((res) => {
          // setData(res.data);
        })((err) => {
          toast.error(err);
        });
  };
  // Calling the function on component mount
  useEffect(() => {
   
    if (data.length === 0) {
      loadData();
    }

    //  fetchData();
  }, []);
  // console.log(`data`, JSON.parse(localStorage.getItem("user")));
  return (
    <MainLayout>
    <div className="col-sm-12">
      <div className="card">
        <div className="card-header alert alert-info">
          <h4>View List of carriers</h4>
          <hr />
          <ul>
            <li>Edit and delete Vehicle</li>
            <li>Assign Drivers to Vehicle</li>
          </ul>
        </div>
        <Datatable loading={loading} col={columns(user)} data={
           companyId
           ? data.data?.filter(
               (item) => item?.CompanyId === parseInt(companyId)
             )
           : data?.data

        }/>
     
      </div>
    </div>
    </MainLayout>
  );
}
//Login.layout = "main";
export default ListCarrier;
