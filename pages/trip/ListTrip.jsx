import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../constants";
import { getError } from "../../utils/error";
import $ from "jquery";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Form from "react-bootstrap/Form";
import "react-data-table-component-extensions/dist/index.css";
import { columns } from "../../datasource/dataColumns/trip";
import { ChevronsDown } from "react-feather";
import { GlobalContext } from "../../context/Provider";
import { listTrips } from "../../context/actions/trip/trip.action";
function ListTrip() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const [data, setData] = useState([]);
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
        enqueueSnackbar(err.message, { variant: "error" });
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
            <div class="table-responsive">
              {/* <DataTableExtensions {...tableData}> */}
              <DataTableExtensions
                exportHeaders
                columns={columns(user)}
                data={data.data}
              >
                <DataTable
                  columns={columns(user)}
                  data={data.data}
                  className="table table-striped table-bordered table-hover table-checkable"
                  defaultSortField={1}
                  sortIcon={<ChevronsDown />}
                  defaultSortAsc={true}
                  pagination
                  highlightOnHover
                />
              </DataTableExtensions>
            </div>
          </div>
        </div>
      </div>
   
  );
}
Login.layout = "main";
export default ListTrip;
