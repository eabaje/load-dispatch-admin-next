import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ChevronsDown, Edit, Trash, User } from "react-feather";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Form from "react-bootstrap/Form";
import "react-data-table-component-extensions/dist/index.css";
import { fetchData, fetchDataAll } from "../../helpers/query";
import { columns } from "../../datasource/dataColumns/payment";
import LoadingBox from "../../components/notification/loadingbox";
import { GlobalContext } from "../../context/Provider";
import { listPayments } from "../../context/actions/payment/payment.action";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import Datatable from "../../components/datatable/datatable-m";


function ListPayment({ history, match }) {
  // const { userId } = match.params;
  // const { fromDate } = match.params;
  // const { toDate } = match.params;

  const router = useRouter()
  const {
    query:userId 
  } = router
 
  const [data2, setData] = useState([]);
 

  // GET request function to your Mock API

  // Calling the function on component mount
  const {
    authState: { user },
  } = useContext(GlobalContext)

  const {
    paymentDispatch,
    paymentState: {
      Payments: { data, loading },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    fetchDataAll("/payment/findAll")((res) => {
      setData(res);
    })((err) => {});

    if (data.length === 0) {
      // listShipments()(shipmentDispatch);

      listPayments()(paymentDispatch)((res) => {
        setData(res.data);
      })((err) => {
      toast.error(err);
      });

   
    }
  }, []);
  return (
    <MainLayout>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header alert alert-info">
            <h3>List of payment</h3>
            <hr />
            <ul>
              <li>Keep a track of all Succesfull Payment transaction</li>
              <li>Keep a track of all Status Payment transaction </li>
            </ul>
          </div>
          <div class="card-body table-border-style">
          <Datatable loading={loading} col={columns(user)} 
            data={userId
              ? data.data.filter((item) => item.UserId === userId)
              : data.data}/>
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
  );
}
//Login.layout = "main";
export default ListPayment;
