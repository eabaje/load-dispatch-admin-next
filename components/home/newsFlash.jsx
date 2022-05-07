import React, { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";


function NewsFlash(
  dataShipment,dataInterest) {
 
 
 
 
  //console.log(`data`, dataLengthInterest);
  return (
    <>
      <div className="grey-bg container-fluid">
        <section id="stats-subtitle">
          <div className="row">
            <div className="col-12 mt-3 mb-1">
              <h4 className="text-uppercase">DASHBOARD SUMMARY</h4>
              <hr />
              {/* <p>Statistics on minimal cards with Title &amp; Sub Title.</p> */}
            </div>
          </div>

          <div className="row">
            <div className="col-xl-6 col-md-12">
              <div className="card overflow-hidden">
                <div className="card-content">
                  <div className="card-body cleartfix">
                    <div className="media align-items-stretch">
                      <div className="align-self-center">
                        <i className="icon-bag primary font-large-2 mr-2"></i>
                      </div>
                      <div className="media-body">
                        <h6>Total Shipment Post</h6>
                        <Link to={"/list-all-shipments"}>
                          <span>click for more details</span>
                        </Link>
                      </div>
                      <div className="align-self-center">
                        <h6>{dataShipment.data?.length}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-md-12">
              <div className="card">
                <div className="card-content">
                  <div className="card-body cleartfix">
                    <div className="media align-items-stretch">
                      <div className="align-self-center">
                        <i className="icon-like warning font-large-2 mr-2"></i>
                      </div>
                      <div className="media-body">
                        <h6>Total Shipment Interest</h6>
                        <Link to={"/list-all-shipments-interest"}>
                          <span>click for more details</span>
                        </Link>
                      </div>
                      <div className="align-self-center">
                        <h6>{dataInterest.data?.length}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-6 col-md-12">
              <div className="card overflow-hidden">
                <div className="card-content">
                  <div className="card-body cleartfix">
                    <div className="media align-items-stretch">
                      <div className="align-self-center">
                        <i className="icon-drawer primary font-large-2 mr-2"></i>
                      </div>
                      <div className="media-body">
                        <h6>Total Shipment Assigned</h6>
                        <Link to={"/list-all-shipments-assigned"}>
                          <span>click for more details</span>
                        </Link>
                      </div>
                      <div className="align-self-center">
                        <h6>
                          {
                            dataShipment.data?.filter(
                              (item) => item.AssignedShipment === true
                            ).length
                          }
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-md-12">
              <div className="card">
                <div className="card-content">
                  <div className="card-body cleartfix">
                    <div className="media align-items-stretch">
                      <div className="align-self-center">
                        <i className="icon-plane warning font-large-2 mr-2"></i>
                      </div>
                      <div className="media-body">
                        <h6>Total Shipment Delivered </h6>
                        <Link to={"/list-all-shipments-sent"}>
                          <span>click for more details</span>
                        </Link>
                      </div>
                      <div className="align-self-center">
                        <h6>
                          {
                            dataShipment.data?.filter(
                              (item) => item.ShipmentStatus === "Delivered"
                            ).length
                          }
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default NewsFlash;
