import React, { useState, useContext, useEffect } from "react";

import { useRouter } from "next/router";

import { columns } from "../../datasource/dataColumns/shipment";
import { GlobalContext } from "../../context/Provider";
import { listShipments } from "../../context/actions/shipment/shipment.action";

import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import axios from "axios";
import Datatable from "../../components/datatable/datatable-m";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { API_URL } from "../../constants";

function ListShipment({ query }) {
  const router = useRouter();
  const { userId, role, sent, companyId } = query;

  const [data2, setData] = useState([]);
  // const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [shipmentName, setshipmentName] = useState("");
  const [loadSpinner, setLoadSpinner] = useState(false);
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

  const showInterestAction = async (shipmentId, companyId, userId) => {
    setLoadSpinner(true);
    const data = {
      ShipmentId: shipmentId,
      CompanyId: companyId,
      UserId: userId,
    };

    try {
      console.log("shipmentId", data);
      const res = await axios.post(`${API_URL}shipment/showInterest`, data);

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner(false);
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner(false);
    }
  };

  const dispatchShipmentAction = async (shipmentId, companyId, userId) => {
    setLoadSpinner(true);
    const data = {
      ShipmentId: shipmentId,
      CompanyId: companyId,
      UserId: userId,
    };

    try {
      console.log("shipmentId", data);
      const res = await axios.post(`${API_URL}shipment/dispatchShipment`, data);

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner(false);
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner(false);
    }
  };

  const pickedUpShipmentAction = async (shipmentId, companyId, userId) => {
    setLoadSpinner(true);
    const data = {
      ShipmentId: shipmentId,
      CompanyId: companyId,
      UserId: userId,
    };

    try {
      console.log("shipmentId", data);
      const res = await axios.post(`${API_URL}shipment/pickUpShipment`, data);

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner(false);
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner(false);
    }
  };

  const deliveredShipmentAction = async (shipmentId, companyId, userId) => {
    setLoadSpinner(true);
    const data = {
      ShipmentId: shipmentId,
      CompanyId: companyId,
      UserId: userId,
    };

    try {
      console.log("shipmentId", data);
      const res = await axios.post(
        `${API_URL}shipment/deliveredShipment`,
        data
      );

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner(false);
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner(false);
    }
  };

  const cancelShipmentAction = async (shipmentId, companyId, userId) => {
    setLoadSpinner(true);
    const data = {
      ShipmentId: shipmentId,
      CompanyId: companyId,
      UserId: userId,
    };

    try {
      console.log("shipmentId", data);
      const res = await axios.post(`${API_URL}shipment/cancelShipment`, data);

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner(false);
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner(false);
    }
  };

  const ArchiveShipmentAction = async (shipmentId) => {
    setLoadSpinner(true);
    const data = {
      ShipmentId: shipmentId,
    };

    try {
      console.log("shipmentId", data);
      const res = await axios.post(`${API_URL}shipment/archiveShipment`, data);

      if (res) {
        toast.success(res.data.message);
        setLoadSpinner(false);
      }
    } catch (err) {
      toast.error(err.message);
      setLoadSpinner(false);
    }
  };

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
  console.log(`data`, data);

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
            {user.roles === "shipper" && (
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
            <div class="card-body">
              <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active text-uppercase"
                    id="Listing-tab"
                    data-toggle="tab"
                    href="#Listing"
                    role="tab"
                    aria-controls="Listing"
                    aria-selected="true"
                  >
                    Listing (
                    {
                      data.data?.filter(
                        (item) =>
                          item?.IsArchived === false &&
                          item?.ShipmentStatus === "NotAssigned"
                      ).length
                    }
                    )
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-uppercase"
                    id="Assigned-tab"
                    data-toggle="tab"
                    href="#Assigned"
                    role="tab"
                    aria-controls="Assigned"
                    aria-selected="false"
                  >
                    Assigned (
                    {
                      data.data?.filter(
                        (item) =>
                          item?.ShipmentStatus === "Assigned" &&
                          item?.IsArchived === false &&
                          item?.AssignedCarrier === parseInt(companyId)
                      ).length
                    }
                    )
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-uppercase"
                    id="Dispatched-tab"
                    data-toggle="tab"
                    href="#Dispatched"
                    role="tab"
                    aria-controls="Dispatched"
                    aria-selected="false"
                  >
                    Dispatched (
                    {
                      data.data?.filter(
                        (item) =>
                          item?.ShipmentStatus === "Dispatched" &&
                          item?.IsArchived === false &&
                          item?.AssignedCarrier === parseInt(companyId)
                      ).length
                    }
                    )
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-uppercase"
                    id="PickedUp-tab"
                    data-toggle="tab"
                    href="#PickedUp"
                    role="tab"
                    aria-controls="PickedUp"
                    aria-selected="false"
                  >
                    Picked Up (
                    {
                      data.data?.filter(
                        (item) =>
                          item?.ShipmentStatus === "Arrived" &&
                          item?.IsArchived === false &&
                          item?.AssignedCarrier === parseInt(companyId)
                      ).length
                    }
                    )
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-uppercase"
                    id="Delivered-tab"
                    data-toggle="tab"
                    href="#Delivered"
                    role="tab"
                    aria-controls="Delivered"
                    aria-selected="false"
                  >
                    Delivered (
                    {
                      data.data?.filter(
                        (item) =>
                          item?.ShipmentStatus === "Delivered" &&
                          item?.IsArchived === false &&
                          item?.AssignedCarrier === parseInt(companyId)
                      ).length
                    }
                    )
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-uppercase"
                    id="Cancelled-tab"
                    data-toggle="tab"
                    href="#Cancelled"
                    role="tab"
                    aria-controls="Cancelled"
                    aria-selected="false"
                  >
                    Cancelled (
                    {
                      data.data?.filter(
                        (item) =>
                          item?.IsArchived === false &&
                          item?.ShipmentStatus === "Cancelled"
                      ).length
                    }
                    )
                  </a>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="Listing"
                  role="tabpanel"
                  aria-labelledby="Listing-tab"
                >
                  <div class="mb-0">
                    <p>
                      These vehicles are listed on Load Dispatch and are not yet
                      assigned to a carrier.{" "}
                      {user.roles === "shipper" && (
                        <>
                          Once you have found a carrier to move your vehicle,
                          your next step is to "Assign" it to them so that they
                          can sign your dispatch sheet and contract. If you
                          don't see your vehicle listed here, you must first
                          create it using{" "}
                          <a href="/shipment/shipment-action">Post Shipment</a>.
                        </>
                      )}
                    </p>

                    <hr />

                    <div class="row">
                      <div class="col-lg-6 col-md-7 col-sm-8 margin-bottom-10">
                        <form id="searchForm" class="form-inline">
                          <div class="form-group">
                            <label for="exampleInputName2">
                              Search<span class="hidden-sm"> for</span>
                            </label>
                            <select name="searchIn" class="form-control">
                              <option value="origination_city">
                                Pickup City
                              </option>
                              <option value="origination_state">
                                Pickup State
                              </option>
                              <option value="destination_city">
                                Delivery City
                              </option>
                              <option value="destination_state">
                                Delivery State
                              </option>
                              <option value="order_id">Order ID</option>
                              <option value="vehicle_make">Vehicles</option>
                              <option value="carrier_company">
                                Carrier Name
                              </option>
                            </select>
                          </div>
                        </form>
                      </div>
                    </div>
                    <Datatable
                      loading={loading}
                      col={columns(
                        user,
                        showInterestAction,
                        loadSpinner,
                        ArchiveShipmentAction
                      )}
                      data={
                        userId
                          ? data.data?.filter(
                              (item) =>
                                item?.UserId === userId &&
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "NotAssigned"
                            )
                          : data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "NotAssigned"
                            )
                      }
                    />
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="Assigned"
                  role="tabpanel"
                  aria-labelledby="Assigned-tab"
                >
                  <div class="mb-0">
                    <p>
                      Your requests to move these vehicles have been emailed to
                      the assigned carrier and have been placed in the
                      respective carrier's Load Dispatch account. You are
                      waiting for these carriers to sign the dispatch sheet and
                      contract. If the carrier has not responded in a reasonable
                      amount of time you may send them a reminder email taking
                      the "Remind" action.
                    </p>

                    <Datatable
                      loading={loading}
                      col={columns(
                        user,
                        dispatchShipmentAction,
                        loadSpinner,
                        ArchiveShipmentAction
                      )}
                      data={
                        userId
                          ? data.data?.filter(
                              (item) =>
                                item?.UserId === userId &&
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "Assigned"
                            )
                          : role
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "Assigned"
                            )
                          : data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "Assigned" &&
                                item?.AssignedCarrier === parseInt(companyId)
                            )
                      }
                    />
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="Dispatched"
                  role="tabpanel"
                  aria-labelledby="Dispatched-tab"
                >
                  <div class="mb-0">
                    <p>
                      These orders have been electronically signed by their
                      assigned carriers and are awaiting pick-up. Either you or
                      the carrier may mark the order as "Picked-Up" once the
                      carrier has loaded your vehicle(s) on its truck.
                    </p>

                    <Datatable
                      loading={loading}
                      col={columns(
                        user,
                        pickedUpShipmentAction,
                        loadSpinner,
                        ArchiveShipmentAction
                      )}
                      data={
                        userId
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.UserId === userId &&
                                item?.ShipmentStatus === "Dispatched"
                            )
                          : role
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "Dispatched"
                            )
                          : data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.AssignedCarrier === parseInt(companyId) &&
                                item?.ShipmentStatus === "Dispatched"
                            )
                      }
                    />
                  </div>
                </div>

                <div
                  class="tab-pane fade"
                  id="PickedUp"
                  role="tabpanel"
                  aria-labelledby="PickedUp-tab"
                >
                  <div class="mb-0">
                    <p>
                      These vehicles have been picked up by their assigned
                      carriers and are in transport. Either you or the carrier
                      may mark the order as "Delivered" once the carrier has
                      delivered the vehicle(s) to their final destination.
                    </p>

                    <Datatable
                      loading={loading}
                      col={columns(
                        user,
                        deliveredShipmentAction,
                        loadSpinner,
                        ArchiveShipmentAction
                      )}
                      data={
                        userId
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.UserId === userId &&
                                item?.ShipmentStatus === "PickedUp"
                            )
                          : role
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "PickedUp"
                            )
                          : data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.AssignedCarrier === parseInt(companyId) &&
                                item?.ShipmentStatus === "PickedUp"
                            )
                      }
                    />
                  </div>
                </div>

                <div
                  class="tab-pane fade"
                  id="Delivered"
                  role="tabpanel"
                  aria-labelledby="Delivered-tab"
                >
                  <div class="mb-0">
                    <p>
                      These orders have been delivered and the transaction has
                      been completed. If you have a similar listing, you may
                      copy the vehicles of an order to Central Dispatch using
                      the "copy to CD" action, but the order will always remain
                      in the "Delivered" tab until it has been archived. To
                      reduce the number of records in this tab, you may move
                      these orders into the "Archived" tab by taking the
                      "Archive" action next to the order.
                    </p>

                    <Datatable
                      loading={loading}
                      col={columns(
                        user,
                        cancelShipmentAction,
                        loadSpinner,
                        ArchiveShipmentAction
                      )}
                      data={
                        userId
                          ? data.data?.filter(
                              (item) =>
                                item?.UserId === userId &&
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "Delivered"
                            )
                          : role
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "Delivered"
                            )
                          : data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.AssignedCarrier === parseInt(companyId) &&
                                item?.ShipmentStatus === "Delivered"
                            )
                      }
                    />
                  </div>
                </div>

                <div
                  class="tab-pane fade"
                  id="Cancelled"
                  role="tabpanel"
                  aria-labelledby="Cancelled-tab"
                >
                  <div class="mb-0">
                    <p>
                      These orders are requests that were declined by the
                      carrier, withdrawn by the company, or cancelled by either
                      party after the order had been signed. New listings or
                      requests may be created from a cancelled order, but the
                      order will always remain in the "Cancelled" tab until it
                      has been archived. To reduce the number of records in this
                      tab, you may move these orders into the "Archived" tab by
                      taking the "Archive" action next to the order.
                    </p>
                    <Datatable
                      loading={loading}
                      col={columns(
                        user,
                        showInterestAction,
                        loadSpinner,
                        ArchiveShipmentAction
                      )}
                      data={
                        userId
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.UserId === userId &&
                                item?.ShipmentStatus === "Cancelled"
                            )
                          : role
                          ? data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.ShipmentStatus === "Cancelled"
                            )
                          : data.data?.filter(
                              (item) =>
                                item?.IsArchived === false &&
                                item?.AssignedCarrier === parseInt(companyId) &&
                                item?.ShipmentStatus === "Cancelled"
                            )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
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
