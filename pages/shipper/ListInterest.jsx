import React, { useContext, useEffect } from "react";
import { Camera, Trash, Truck, List, Edit, ChevronsDown } from "react-feather";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { Link, useHistory } from "react-router-dom";
import { API_URL } from "../../constants";
import { getError } from "../../utils/error";
import $ from "jquery";
import { fetchDataAll } from "../../helpers/query";
import shipmentState from "../../context/initialStates/shipment.state";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Form from "react-bootstrap/Form";
import "react-data-table-component-extensions/dist/index.css";
import { columns } from "../../datasource/dataColumns/interest";
import { GlobalContext } from "../../context/Provider";
import {
  listShipments,
  showInterest,
} from "../../context/actions/shipment/shipment.action";
import LoadingBox from "../../components/notification/loadingbox";
import { Button, Modal } from "react-bootstrap";

function ListInterest() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data2, setData] = useState([]);

  const [show, setShow] = useState(false);
  const [shipmentName, setshipmentName] = useState("");
  const [shipmentId, setshipmentId] = useState("");
  const {
    authState: { user },
  } = useContext(GlobalContext)
  const {
    shipmentDispatch,
    shipmentState: {
      Interests: { data, loading },
      createShipment: { data: createdata }, //loading
    },
  } = useContext(GlobalContext);
  // Calling the function on component mount
  function handleModal(params) {
    setshipmentName(params.shipmentName);
    setshipmentId(params.shipmentId);
    setShow(!show);
  }

  useEffect(() => {
    function saveInterest(shipmentid, userid) {
      showInterest(shipmentid, userid)(shipmentDispatch)((res) => {})((err) => {
        enqueueSnackbar(err, { variant: "error" });
      });
    }

    if (data.length === 0) {
      // listShipments()(shipmentDispatch);

      listShipments()(shipmentDispatch)((res) => {
        setData(res.data);
      })((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
    }

 
  }, []);

  return (
  
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header alert alert-info">
            <h3>List of Interest in Shipments</h3>
            <hr />
            <ul>
             
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
              )}
            </div>
            {/* <Modal show={show} onHide={() => handleModal()}>
              <Modal.Header closeButton>Check your interest</Modal.Header>
              <Modal.Body>{show}</Modal.Body>
              <Modal.Footer>
                <Button onClick={() => handleModal()}>Close</Button>
                <Button onClick={() => handleModal()}>Save</Button>
              </Modal.Footer>
            </Modal> */}
          </div>
        </div>
      </div>
   
  );
}
Login.layout = "main";
export default ListInterest;
