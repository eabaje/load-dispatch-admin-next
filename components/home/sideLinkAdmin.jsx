import React from "react";
import { Link } from "next/link";

function SideLinkMenu({ menuData }) {
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
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Link href={menu.path} title={menu.title}>
                  <a>
                    <span> {menu.title}</span>
                  </a>
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
