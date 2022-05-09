import React, { useContext, useEffect } from "react";
import { Camera, Trash, Truck, List, Edit, ChevronsDown } from "react-feather";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { Link, useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Form from "react-bootstrap/Form";
import "react-data-table-component-extensions/dist/index.css";
import { columns } from "../../datasource/dataColumns/shipment";
import { GlobalContext } from "../../context/Provider";
import {
  listShipments,
  showInterest,
} from "../../context/actions/shipment/shipment.action";
import LoadingBox from "../../components/notification/loadingbox";


function ListShipment({ history, match }) {
  const { userId } = match.params;
  const { assigned } = match.params;
  const { sent } = match.params;

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
        enqueueSnackbar(err, { variant: "error" });
      })
      : listShipments()(shipmentDispatch)((result) => {})((err) => {
        enqueueSnackbar(err, { variant: "error" });
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
            <div class="table-responsive">
              {loading ? (
                <LoadingBox />
              ) : (
                <DataTableExtensions
                  exportHeaders
                  columns={columns(user)}
                  data={
                    userId
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
                      : data?.data
                  }
                  // data={data.data}
                >
                  <DataTable
                    columns={columns(user)}
                    data={
                      userId
                        ? data.data?.filter((item) => item?.UserId === userId)
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
                        : data?.data
                    }
                    // data={data.data}
                    className="table table-striped table-bordered table-hover table-checkable"
                    defaultSortField={1}
                    sortIcon={<ChevronsDown />}
                    defaultSortAsc={true}
                    pagination
                    highlightOnHover
                  />
                </DataTableExtensions>
              )}
            </div>
           
          </div>
        </div>
      </div>
    
  );
}
Login.layout = "main";
export default ListShipment;
