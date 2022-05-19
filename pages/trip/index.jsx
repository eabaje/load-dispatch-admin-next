import React, {useState, useContext, useEffect } from "react";
import { columns } from "../../datasource/dataColumns/trip";
import { ChevronsDown } from "react-feather";
import { GlobalContext } from "../../context/Provider";
import { listTrips } from "../../context/actions/trip/trip.action";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import Datatable from "../../components/datatable/datatable-m";

function ListTrip() {
 
  
  const {
    authState: { user },
  } = useContext(GlobalContext)
  const {
    tripDispatch,
    tripState: {
      Trips: { data, loading }, //loading
    },
  } = useContext(GlobalContext);
  const loadData = () => {
   
    // userId
    //   ? listShipments()(shipmentDispatch)((result) => {})((err) => {
    //     enqueueSnackbar(err, { variant: "error" });
    //   })
    //   : listShipments()(shipmentDispatch)((result) => {})((err) => {
    //     enqueueSnackbar(err, { variant: "error" });
    //   });

      listTrips()(tripDispatch)
      ((result) => {})((err) => {
        toast.error(err);
      });
       // setData(data.data?.filter((item) => item.UserId === userId));
  };
  // Calling the function on component mount
  useEffect(() => {
    if (data.length === 0) {
     
      loadData();
    }
  }, []);

  return (
    <MainLayout>
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header ">
            <h3>List of Trips made</h3>
            <ul class="alert alert-info">
              <li>Edit and delete Trips</li>
              <li>Get an overview of all trips</li>
              <li>Add Rating</li>
            </ul>
          </div>
          <div class="card-body table-border-style">

          <Datatable loading={loading} col={columns(user)} 
            data={data.data}/>
          
          </div>
        </div>
      </div>
      </MainLayout>
  );
}
//Login.layout = "main";
export default ListTrip;
