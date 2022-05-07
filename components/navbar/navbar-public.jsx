import React, { useEffect } from "react";
import { useContext, useState } from "react";
//import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import $ from "jquery";
import "./pcoded";
import { GlobalContext } from "../../context/Provider";

const NavBarPublic = () => {
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
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarPublic;
