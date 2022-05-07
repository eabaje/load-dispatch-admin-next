import React from "react";
import { Link } from "react-router-dom";

function SideLinkMenu({menuData }) {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>Quick Links</h5>
        </div>
        <div className="card-body">
          <ul
            id="learningCenterVideos"
            style={{
              marginBottom: "15px",
             marginLeft: "-20px",
              listStyle: "none",
            }}
          >
             {menuData.map((menu, index) => (
          <li key={index}  style={{
           display: "flex",
            alignItems: "center",
          }}>
            <Link to={menu.path} title={menu.title}>
             
              <span> {menu.title}</span>
            </Link>{" "}
          </li>
        ))}
          
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideLinkMenu;
