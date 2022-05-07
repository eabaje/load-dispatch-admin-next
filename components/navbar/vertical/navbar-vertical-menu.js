import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Submenu from "./navbar-vertical-submenu";

const Menu = ({ id, items, user }) => {
  return (
    <li
    id={id}
      key={id}
      className={items.submenu ? "nav-item pcoded-hasmenu" : "nav-item"}
    >
      {items.submenu ? (
        <>
          <a href="#" className="nav-link ">
            <span className="pcoded-micon">
              <i className={items.icon}></i>
            </span>
            <span className="pcoded-mtext">{items.title}</span>
          </a>

          <Submenu submenus={items.submenu} user={user} />
        </>
      ) : (
        <>
          <Link to={items.path} title={items.title} className="nav-link ">
            <span className="pcoded-micon">
              <i className={items.icon}></i>
            </span>
            <span className="pcoded-mtext">{items.title}</span>
          </Link>{" "}
        </>
      )}
    </li>
  );
};

export default Menu;
