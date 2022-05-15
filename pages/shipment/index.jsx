import React, {useState, useContext, useEffect } from "react";

import { useRouter } from "next/router";


import { columns } from "../../datasource/dataColumns/shipment";
import { GlobalContext } from "../../context/Provider";
import {
  listShipments
 
} from "../../context/actions/shipment/shipment.action";

import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import Datatable from "../../components/datatable/datatable-m";


function ListShipment() {
 

  const router = useRouter()
  const {
    query:userId,assigned,sent 
  } = router

 
  const [data2, setData] = useState([]);
 // const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [shipmentName, setshipmentName] = useState("");
  const [shipmentId, setshipmentId] = useState("");
  const {
    authState: { user },
  } = useContext(GlobalContext)
  const {
    shipmentDispatch,
    shipmentState: {
      Shipments: { data, loading },
    },
  } = useContext(GlobalContext);
  // Calling the function on component mount
  function handleModal(params) {
    setshipmentName(params.shipmentName);
    setshipmentId(params.shipmentId);
    setShow(!show);
  }

  const loadData = () => {
    // listShipments()(shipmentDispatch)((result) => {})((err) => {
    //   toast.error(err);

    // });
    userId
      ?   listShipments()(shipmentDispatch)((result) => {})((err) => {
        toast.error(err);
      })
      : listShipments()(shipmentDispatch)((result) => {})((err) => {
        toast.error(err);
      });;


     //  setData(data.data?.filter((item) => item.UserId === userId));
  };

  useEffect(() => {
   
    if (data.length === 0) {
      loadData();


    }
  //  setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
   console.log(`user`, user);
 
  return (
    
    <MainLayout >
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header alert alert-info">
            <h3>List of Shipments</h3>
            <hr />
            <ul>
              <li>Edit and delete Shipments</li>
              <li>Make Request for onboarding services</li>
              <li>View interest for your shipment</li>
            </ul>
          </div>
          <div class="card-body table-border-style">
          <Datatable loading={loading} col={columns(user)} 
            data={ data?.data}/>

{/* userId
              ? data?.data
              : assigned
              ? data.data?.filter(
                  (item) => item?.AssignedShipment === true
                )
              : sent
              ? data.data?.filter(
                  (item) =>
                    item?.ShipmentStatus === "Arrived" ||
                    item?.ShipmentStatus === "Delivered"
                )
              : */}
           
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
//ListShipment.layout = "main";
export default ListShipment;
