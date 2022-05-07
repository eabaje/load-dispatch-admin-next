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

const NavBarDriver = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState({});

  //assigning location variable
  const location = useLocation();

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
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <>
      {" "}
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
                    <Link to={"/list-all-shipments"} title="Find all Vehicles">
                      Find all Vehicles
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item pcoded-hasmenu">
                <a href="#!" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="first fas fa-users"></i>
                  </span>
                  <span className="pcoded-mtext">Driver Management</span>
                </a>
                <ul className="pcoded-submenu">
                  <li>
                    <Link
                      to={`/edit-driver-info/${user.UserId}`}
                      title="Update Driver Profile"
                    >
                      Update Driver Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/list-assign-vehicle-driver"}
                      title="View Assigned Vehicle To Driver"
                    >
                      View Assigned Vehicle To Driver
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item pcoded-hasmenu">
                <a href="#!" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="first fas fa-road"></i>
                  </span>
                  <span className="pcoded-mtext">Trip Management</span>
                </a>
                <ul className="pcoded-submenu">
                  <li>
                    <Link
                      to={`/list-trip-info/${user.UserId}`}
                      title=" List All Trips"
                    >
                      List All Trips
                    </Link>
                   
                  </li>
                  {/* <li>
                    <Link to={"/add-trip"} title=" Create Trip Record">
                      Create Trip Record
                    </Link>
                  </li> */}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarDriver;
