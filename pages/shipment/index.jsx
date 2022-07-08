import React, { useState, useContext, useEffect } from "react";

import { useRouter } from "next/router";

import { columns } from "../../datasource/dataColumns/shipment";
import { GlobalContext } from "../../context/Provider";
import { listShipments } from "../../context/actions/shipment/shipment.action";

import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import Datatable from "../../components/datatable/datatable-m";
import dynamic from "next/dynamic";
import NextLink from "next/link";

function ListShipment({ query }) {
  const router = useRouter();
  const { userId, assigned, sent } = query;

  const [data2, setData] = useState([]);
  // const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [shipmentName, setshipmentName] = useState("");
  const [shipmentId, setshipmentId] = useState("");
  const {
    authState: { user },
  } = useContext(GlobalContext);
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
      ? listShipments()(shipmentDispatch)((result) => {})((err) => {
          toast.error(err);
        })
      : listShipments()(shipmentDispatch)((result) => {})((err) => {
          toast.error(err);
        });

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
    <MainLayout>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header alert alert-info">
            <h3>List of Shipments</h3>
            <hr />
            <ul>
              <li>Edit and delete Shipments</li>
              <li>Make Request for onboarding services</li>
              <li>View interest for your shipment</li>
            </ul>
            {user.roles !== "driver" && (
              <h1 className="my-5">
                <NextLink href="/shipment/shipment-action/" passHref>
                  <a className="mt-0 btn text-white float-right btn  btn-primary">
                    Create Shipment Info
                  </a>
                </NextLink>
              </h1>
            )}
          </div>
          <div className="card-body table-border-style">
            <Datatable
              loading={loading}
              col={columns(user)}
              data={
                userId
                  ? data?.data
                  : assigned
                  ? data.data?.filter((item) => item?.AssignedShipment === true)
                  : sent
                  ? data.data?.filter(
                      (item) =>
                        item?.ShipmentStatus === "Arrived" ||
                        item?.ShipmentStatus === "Delivered"
                    )
                  : data?.data
              }
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
//ListShipment.layout = "main";
//export default ListShipment;

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(ListShipment), { ssr: false });
