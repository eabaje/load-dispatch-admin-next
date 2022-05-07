import React, { useEffect } from "react";
import { useContext, useState } from "react";
//import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import $ from "jquery";
import "./pcoded";
//import "./ripple";
// import "./horizontal-menu";
//import { AuthContext } from "../context/authContext/AuthContext";
//import { logout } from "../context/authContext/AuthActions";

const NavBarAdmin = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  //  const { dispatch } = useContext(AuthContext);

  //assigning location variable
  // const location = useLocation();

  //destructuring pathname from location
  // const { pathname } = location;

  // //Javascript split method to get the name of the path in array
  // const splitLocation = pathname.split("/");

  const handleMenu = () => {
    $(document).ready(function () {
      $("#pcoded").pcodedmenu({
        themelayout: "horizontal",
        MenuTrigger: "hover",
        SubMenuTrigger: "hover",
      });
    });
  };
  useEffect(() => {
    handleMenu();
  }, []);

  return (
    <>
      <nav class="pcoded-navbar theme-horizontal menu-light brand-blue">
        <div className="navbar-wrapper container">
          <div
            className="navbar-content sidenav-horizontal"
            id="layout-sidenav"
          >
            <ul className="nav pcoded-inner-navbar sidenav-inner">
              <li className="nav-item pcoded-menu-caption">
                <label>Navigation</label>
              </li>
              <li className="nav-item">
                <a href="/dashboard" class="nav-link ">
                  <span class="pcoded-micon">
                    {/* <i class="feather icon-home"></i> */}
                    <i className="first fas fa-home"></i>
                  </span>
                  <span class="pcoded-mtext">Dashboard</span>
                </a>
              </li>

              <li className="nav-item pcoded-hasmenu">
                <a href="#!" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="first fas fa-car"></i>
                  </span>
                  <span className="pcoded-mtext">Ship Vehicles</span>
                </a>
                <ul className="pcoded-submenu">
                  <li>
                    <Link to={"/add-shipment"} title="Post a Vehicle">
                      Post a Vehicle/Shipment
                    </Link>
                  </li>
                  <li>
                    <Link to={"/list-all-shipments"} title=" List all Vehicles">
                      List all Vehicles/Shipment
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/list-all-shipments-assigned/assigned"}
                      title=" List all Assigned Shipment"
                    >
                      List all Assigned Shipment
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/list-all-shipments-sent/sent"}
                      title=" List all sent/delivered Shipment"
                    >
                      List all sent/delivered Shipment
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item pcoded-hasmenu">
                <a href="#!" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="first fas fa-truck"></i>
                  </span>
                  <span className="pcoded-mtext">Carrier</span>
                </a>
                <ul className="pcoded-submenu">
                  <li>
                    <Link to={"/add-carrier"} title="Create carrier Info">
                      Create carrier Info
                    </Link>
                  </li>
                  <li>
                    <Link to={"/list-carriers"} title=" List carrier Info">
                      List carrier Info
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/add-vehicle-to-carrier"}
                      title=" Create Vehicle Info"
                    >
                      Create Vehicle Info
                    </Link>
                  </li>
                  <li>
                    <Link to={"/list-vehicles-info"} title=" Vehicle List">
                      Vehicle List
                    </Link>
                  </li>
                  <li>
                    <Link to={"/view-vehicle-request"} title=" View Requests">
                      View Requests
                    </Link>
                  </li>
                  <li>
                    <Link to={"/list-vehicle"} title=" Connect to Shippers">
                      Connect to Shippers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/list-company-info"}
                      title=" Update Company record"
                    >
                      View All Company record(s)
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item pcoded-hasmenu">
                <a href="#!" className="nav-link ">
                  <span className="pcoded-micon">
                    {/* <i className="feather icon-aperture"></i> */}
                    <i className="first fas fa-users"></i>
                  </span>
                  <span className="pcoded-mtext">Driver Management</span>
                </a>
                <ul className="pcoded-submenu">
                  <li>
                    <Link to={"/list-drivers-info"} title=" List Drivers">
                      List Drivers
                    </Link>
                  </li>
                 
                </ul>
              </li>

              <li className="nav-item pcoded-hasmenu">
                <a href="#!" className="nav-link ">
                  <span className="pcoded-micon">
                    {/* <i className="feather icon-aperture"></i> */}
                    <i className="first fas fa-road"></i>
                  </span>
                  <span className="pcoded-mtext">Trip Management</span>
                </a>
                <ul className="pcoded-submenu">
                  <li>
                    <Link to={"/list-trip"} title=" List All Trips">
                      List All Trips
                    </Link>
                   
                  </li>
                
                </ul>
              </li>

              <li className="nav-item pcoded-hasmenu">
                <a href="#!" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="first fas fa-gift"></i>
                  </span>
                  <span className="pcoded-mtext">Subscription Management</span>
                </a>
                <ul className="pcoded-submenu">
                  <li>
                    <Link
                      to={"/list-subscription"}
                      title=" List All Subscription Types"
                    >
                      List All Subscription Types
                    </Link>
                  </li>
                  <li>
                    <Link to={"/add-subscription"} title=" Create Subscription">
                      Create Subscription
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/list-user-subscription"}
                      title=" Search User Subscription"
                    >
                      Search User Subscription
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item pcoded-hasmenu">
                <a href="#!" className="nav-link ">
                  <span className="pcoded-micon">
                    {/* <i className="feather icon-book"></i> */}
                    <i className="first fas fa-cog"></i>
                  </span>
                  <span className="pcoded-mtext">Resources</span>
                </a>
                <ul className="pcoded-submenu">
                  <li>
                    <Link to={"/list-users"} title=" View list user">
                      View List User
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/list-payment"}
                      title=" View Payment Transaction"
                    >
                      View Payment Transaction
                    </Link>
                  </li>

                  <li>
                    <Link to={"/contact-us"} title=" Contact Us">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a href="map-google.html" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="feather icon-map"></i>
                  </span>
                  <span className="pcoded-mtext">Maps</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarAdmin;
