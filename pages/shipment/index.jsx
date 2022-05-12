import React, { useContext, useEffect } from "react";
import { Camera, Trash, Truck, List, Edit, ChevronsDown } from "react-feather";
import { useState } from "react";


import { columns } from "../../datasource/dataColumns/shipment";
import { GlobalContext } from "../../context/Provider";
import {
  listShipments,
  showInterest,
} from "../../context/actions/shipment/shipment.action";
import LoadingBox from "../../components/notification/loadingbox";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import Datatable from "../../components/datatable/datatable-m";


function ListShipment({ history, match }) {
 

  const router = useRouter()
  const {
    query:userId,assigned,sent 
  } = router

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
   
    userId
      ?   listShipments()(shipmentDispatch)((result) => {})((err) => {
        toast.error(err);
      })
      : listShipments()(shipmentDispatch)((result) => {})((err) => {
        toast.error(err);
      });;


       // setData(data.data?.filter((item) => item.UserId === userId));
  };

  useEffect(() => {
   
    if (data.length === 0) {
      loadData();


    }
  //  setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  // console.log(`userid`, userId);
 
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
            data={ userId
              ? data.data
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
              : data?.data}/>

           
           
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
//ListShipment.layout = "main";
export default ListShipment;
