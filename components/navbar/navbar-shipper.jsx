import React, { useEffect } from "react";
import { useContext, useState } from "react";
//import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import $ from "jquery";
import "./pcoded";
import { GlobalContext } from "../../context/Provider";

const NavBarShipper = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState({});
  const {
    authDispatch,
    authState: { loading },
  } = useContext(GlobalContext);

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
                    <i class="feather icon-home"></i>
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
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/my-shipments-info/${user.UserId}`}
                      title="My Vehicles"
                    >
                      My Vehicles
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item pcoded">
                <a href="#!" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="first fas fa-users"></i>
                  </span>
                  <span className="pcoded-mtext">
                    <Link to={"/list-drivers-profile"} title="List Drivers">
                      Connect with Drivers
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

export default NavBarShipper;
