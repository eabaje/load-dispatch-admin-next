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

const NavBarCarrier = () => {
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
                    <Link to={"/add-shipment"} title="Post a Vehicle">
                      Post a Vehicle
                    </Link>{" "}
                  </li>
                  <li>
                    <Link to={"/list-all-shipments"} title="Find all Vehicles">
                      Find all Vehicles
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/my-shipments-info/${user.UserId}`}
                      title="My Vehicles"
                    >
                      My Vehicles
                    </Link>{" "}
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
                    <Link
                      to={`/list-carriers-info/${user.CompanyId}`}
                      title="List carrier Info"
                    >
                      List carrier Info
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/list-vehicles-info/${user.CompanyId}`}
                      title=" Vehicle List"
                    >
                      Vehicle List
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
                      to={`/list-carrier-drivers-info/${user.CompanyId}`}
                      title=" List Drivers"
                    >
                      List Drivers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/add-driver-info"}
                      title=" Create Driver Profile"
                    >
                      Create Driver Profile
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a href="#!" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="first fas fa-road"></i>
                  </span>
                  <span className="pcoded-mtext">
                    <Link to={"/list-trip"} title=" List All Trips">
                      Check Trips Made
                    </Link>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarCarrier;
