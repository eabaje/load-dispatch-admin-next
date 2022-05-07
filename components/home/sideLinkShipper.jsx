import React from "react";
import { Link } from "react-router-dom";
function SideLinkShipper() {
  return (
    <>
      <div class="card">
        <div class="card-header">
          <h5>Quick Links</h5>
        </div>
        <div class="card-body">
          <ul
            id="learningCenterVideos"
            style={{
              "margin-bottom": "15px",
              "margin-left": "-20px",
              "list-style": "none",
            }}
          >
            <li
              style={{
                display: "flex",
                "align-items": "center",
              }}
            >
              <Link to="">
                {" "}
                <span>Quick Start Guide - Shippers</span>
              </Link>
            </li>
            <li
              style={{
                display: "flex",
                "align-items": "center",
              }}
            >
              <Link to="">
                {" "}
                <span>Change Your Password</span>
              </Link>
            </li>
            <li
              style={{
                display: "flex",
                "align-items": "center",
              }}
            >
              <Link to="">
                {" "}
                <span>Shipping Your First Vehicle</span>
              </Link>
            </li>
            <li
              style={{
                display: "flex",
                "align-items": "center",
              }}
            >
              <Link to="/add-shipment">
                {" "}
                <span>Post a Vehicle</span>
              </Link>
            </li>
            <li
              style={{
                display: "flex",
                "align-items": "center",
              }}
            >
              <Link to="/list-carrier-info">
                {" "}
                <span>Choose a Carrier</span>
              </Link>
            </li>
            <li
              style={{
                display: "flex",
                "align-items": "center",
              }}
            >
              <Link to="/list-vehicle-info">
                {" "}
                <span>Dispatching a Vehicle</span>
              </Link>
            </li>
            <li
              style={{
                display: "flex",
                "align-items": "center",
              }}
            >
              <Link to="/list-vehicle-info">
                {" "}
                <span>Search Truck Space</span>
              </Link>
            </li>
            <li
              style={{
                display: "flex",
                "align-items": "center",
              }}
            >
              <Link to="/list-vehicle-info">
                {" "}
                <span>Marking a Vehicle as Picked Up or Delivered</span>
              </Link>
            </li>
            <li
              style={{
                display: "flex",
                "align-items": "center",
              }}
            >
              <Link to="/list-carrier-info">
                {" "}
                <span>Rating a Carrier</span>
              </Link>
            </li>

            <li
              class="hidden"
              style={{
                display: "flex",
                "align-items": "center",
              }}
            >
              <a
                href={{ javascript: "void(0)" }}
                onclick="window.open('/video/learning-center?id=1', 'dispatchvid', 'height=496,width=640,resizable=no,toolbar=no,location=no');"
                title="4 Minute Video"
              >
                <span>Posting a Vehicle</span>
              </a>
            </li>
            <li
              class="hidden"
              style={{
                display: "flex",
                "align-items": "center",
              }}
            >
              <a
                href={{ javascript: "void(0)" }}
                onclick="window.open('/video/learning-center?id=44', 'dispatchvid', 'height=496,width=640,resizable=no,toolbar=no,location=no');"
                title="4 Minute Video"
              >
                <span>My Billing</span>
              </a>
            </li>
            <li
              class="hidden"
              style={{
                display: "flex",
                "align-items": "center",
              }}
            >
              <a
                href={{ javascript: "void(0)" }}
                onclick="window.open('/video/learning-center?id=20', 'dispatchvid', 'height=496,width=640,resizable=no,toolbar=no,location=no');"
                title="1 Minute Video"
              >
                <span>Changing Your Company Email Address</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideLinkShipper;
