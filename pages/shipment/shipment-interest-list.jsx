import React, { useState, useContext, useEffect } from "react";
import { Camera, Trash, Truck, List, Edit, ChevronsDown } from "react-feather";
import { API_URL } from "../../constants";
import $ from "jquery";
import { fetchDataAll } from "../../helpers/query";
import { columns } from "../../datasource/dataColumns/interest";
import { GlobalContext } from "../../context/Provider";
import {
  listShipments,
  listShipmentsInterestByCompany,
  listShipmentsInterestByShipmentId,
  showInterest,
} from "../../context/actions/shipment/shipment.action";
import LoadingBox from "../../components/notification/loadingbox";
import { Button, Modal } from "react-bootstrap";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import Datatable from "../../components/datatable/datatable-m";
import dynamic from "next/dynamic";

function ListInterest({ query }) {
  //  const router = useRouter();
  const { companyId, shipmentId } = query;
  const [data2, setData] = useState([]);

  const [show, setShow] = useState(false);
  const [shipmentName, setshipmentName] = useState("");
  // const [shipmentId, setshipmentId] = useState("");
  const {
    authState: { user },
  } = useContext(GlobalContext);
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
    // function saveInterest(shipmentid, userid) {
    //   showInterest(shipmentid, userid)(shipmentDispatch)((res) => {})((err) => {
    //     toast.error(err);
    //   });
    // }

    if (data.length === 0) {
      // listShipments()(shipmentDispatch);
      companyId
        ? listShipmentsInterestByCompany(companyId)(shipmentDispatch)((res) => {
            setData(res.data);
          })((err) => {
            toast.error(err);
          })
        : listShipmentsInterestByShipmentId(shipmentId)(shipmentDispatch)(
            (res) => {
              setData(res.data);
            }
          )((err) => {
            toast.error(err);
          });
    }
  }, []);

  return (
    <MainLayout>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header alert alert-info">
            <h3>List of Interest in Shipments</h3>
            <hr />
            <ul>
              <li>Make Request for onboarding services</li>
              <li>View interest for your shipment</li>
            </ul>
          </div>
          <div className="card-body table-border-style">
            <Datatable
              loading={loading}
              col={columns(user)}
              data={data.data?.filter((item) => item?.IsInterested === true)}
            />

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
    </MainLayout>
  );
}
//ListInterest.layout = "main";
//export default ListInterest;

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(ListInterest), { ssr: false });
