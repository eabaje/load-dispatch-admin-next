import React, { useEffect } from "react";
import { useContext, useState } from "react";
import SideLinkMenu from "./sideLinkAdmin";
import SideLinkAdmin from "./sideLinkAdmin";
import SideLinkCarrier from "./sideLinkCarrier";
import { menuData } from "./sideLinkData";
import SideLinkShipper from "./sideLinkShipper";

function SideLink() {
  const [user, setUser] = useState({});

  useEffect(() => {
    let controller = new AbortController();
    setUser(JSON.parse(localStorage.getItem("user")));
    return () => controller?.abort();
  
  }, []);
  return (
    <>
    <SideLinkMenu menuData={menuData(user)} />
      {/* {(user.roles === "carrier" && <SideLinkCarrier />) ||
        (user.roles === "shipper" && <SideLinkShipper />) ||
        (user.roles === "broker" && <SideLinkShipper />) ||
        (user.roles === "audit" && <SideLinkAdmin />) ||
        (user.roles === "admin" && <SideLinkAdmin />) || <SideLinkAdmin />} */}
    </>
  );
}

export default SideLink;
