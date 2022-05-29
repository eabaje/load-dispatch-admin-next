import React, { useState, useEffect, useContext } from "React";
import Ticker from "react-ticker";

import { listShipments } from "../../context/actions/shipment/shipment.action";
import { GlobalContext } from "../../context/Provider";
const TickerFeed = () => {
  const GetRssFeedData = () => {
    const [feed, setFeed] = useState();
    const {
      shipmentDispatch,
      shipmentState: {
        Shipments: { data, loading },
      },
    } = useContext(GlobalContext);

    useEffect(() => {
      listShipments()(shipmentDispatch)((res) => {
        // if(userId){
        // setData(res.data?.filter((item) => item?.UserId === userId));
        // }
        // else{
        // setData(res.data);
        // }
        // setData(res.data?.filter((item) => item?.UserId === userId);
      })((err) => {
        //  enqueueSnackbar(err.message, { variant: "error" });
      });
    }, []);

    return data ? (
      <p className="ticker__field__text">
        {data.map((items) => (
          <a
            key={items.ShipmentId}
            href={"/list-shipment-info/isReadOnly/" + items.ShipmentId}
            target="_blank"
            
          >
            {items.Description}
          </a>
        ))}
      </p>
    ) : (
      <p className="ticker__field__text">
        <span style={{ color: "#f4f4f4" }}>Just Waiting for the Feed!</span>
      </p>
    );
  };
  return (
    <div className="ticker">
      <div className="ticker__field">
        <Ticker offset="run-in">{() => <GetRssFeedData />}</Ticker>
      </div>
    </div>
  );
};
export default TickerFeed;
