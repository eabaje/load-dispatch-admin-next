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

const NavBarAudit = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  //  const { dispatch } = useContext(AuthContext);

  //assigning location variable
  const location = useLocation();

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
                    <i class="feather icon-home"></i>
                  </span>
                  <span class="pcoded-mtext">Dashboard</span>
                </a>
              </li>

              <li className="nav-item pcoded-hasmenu">
                <a href="#!" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="feather icon-box"></i>
                  </span>
                  <span className="pcoded-mtext">Ship Vehicles</span>
                </a>
                <ul className="pcoded-submenu">
                  
                  <li>
                    <a href="/my-shipments">My Vehicles</a>
                  </li>
                  <li>
                    <a href="/truck-listing">Search Truck Space</a>
                  </li>
                </ul>
              </li>

              <li className="nav-item pcoded-hasmenu">
                <a href="#!" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="feather icon-aperture"></i>
                  </span>
                  <span className="pcoded-mtext">Carrier</span>
                </a>
                <ul className="pcoded-submenu">
                 
                  <li>
                    <a href="/list-carriers" label="Resources">
                      List carrier Info
                    </a>
                  </li>
                
                  <li>
                    <a href="/list-vehicles" label="Resources">
                      Vehicle List
                    </a>
                  </li>
                  <li>
                    <a href="/view-vehicle-request" label="Resources">
                      View Requests
                    </a>
                  </li>
                 
                 
                  <li>
                    <a href="/list-company" label="Resources">
                      View All Company record(s)
                    </a>
                  </li>
                </ul>
              </li>

             

              <li className="nav-item pcoded-hasmenu">
                <a href="#!" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="feather icon-aperture"></i>
                  </span>
                  <span className="pcoded-mtext">Trip Management</span>
                </a>
                <ul className="pcoded-submenu">
                  <li>
                    <a href="/list-trip" label="Resources">
                      List All Trips
                    </a>
                  </li>
                 
                 
                
                </ul>
              </li>

              <li className="nav-item pcoded-hasmenu">
                <a href="#!" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="feather icon-aperture"></i>
                  </span>
                  <span className="pcoded-mtext">Subscription Management</span>
                </a>
                <ul className="pcoded-submenu">
                  <li>
                    <a href="/list-subscription" label="Resources">
                      List All Subscription Types
                    </a>
                  </li>
               
                  <li>
                    <a href="/list-user-subscription" label="Resources">
                      Search User Subscription
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item pcoded-hasmenu">
                <a href="#!" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="feather icon-book"></i>
                  </span>
                  <span className="pcoded-mtext">Resources</span>
                </a>
                <ul className="pcoded-submenu">
                  <li>
                    <a href="/list-payment" label="Resources">
                      View Payment Transaction
                    </a>
                  </li>
                  <li>
                    <a href="/protected/classifieds/" label="Resources">
                      Classifieds
                    </a>
                  </li>
                  <li>
                    <a href="/protected/services/" label="Resources">
                      Transporter Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://www.mapquest.com/"
                      label="Resources"
                      id="navMaps"
                      target="_blank"
                    >
                      Maps
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://www.mapquest.com/directions"
                      label="Resources"
                      id="navDirections"
                      target="_blank"
                    >
                      Directions
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://www.nws.noaa.gov/"
                      label="Resources"
                      id="navWeather"
                      target="_blank"
                    >
                      Weather
                    </a>
                  </li>
                  <li>
                    <a href="/contact-us/" label="resources" id="navContactUs">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a href="form_elements.html" class="nav-link ">
                  <span class="pcoded-micon">
                    <i class="feather icon-file-text"></i>
                  </span>
                  <span class="pcoded-mtext">Forms</span>
                </a>
              </li>

              <li className="nav-item pcoded-menu-caption">
                <label>Chart & Maps</label>
              </li>
              <li className="nav-item">
                <a href="chart-apex.html" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="feather icon-pie-chart"></i>
                  </span>
                  <span className="pcoded-mtext">Chart</span>
                </a>
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

export default NavBarAudit;
