import { Form } from "react-bootstrap";
import Link from "next/link";
import { LOAD_CAPACITY, LOAD_TYPE, TRIP_STATUS } from "../../constants/enum";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";

import { showInterest } from "../../context/actions/shipment/shipment.action";
import React, { useContext } from "react";
import { API_URL } from "../../constants";
import axios from "axios";

const showInterestAction = async (shipmentId, companyId, userId) => {
  const data = {
    ShipmentId: shipmentId,
    CompanyId: companyId,
    UserId: userId,
  };

  try {
    console.log("shipmentId", data);
    const res = await axios.post(`${API_URL}shipment/showInterest`, data);

    if (res) {
      toast.success(res.data.message);
    }
  } catch (err) {
    toast.error(err.message);
  }
};

export const columns = (params) => [
  {
    id: 27,
    name: "Action",
    sortable: false,
    selector: "null",
    grow: 3,
    cell: (row) => [
      <></>,
      //params?.roles === "admin"|| params?.roles === "carrier"||   params?.UserId === row?.UserId

      params?.UserId === row?.UserId && params?.roles === "shipper" && (
        <Link
          href={
            "/shipment/shipment-interest-list/?shipmentId=" + row.ShipmentId
          }
          passHref
        >
          <a
            className="btn btn-outline-primary"
            title="Check shipment interests"
          >
            {" "}
            <i className="first fas fa-check"></i>Check shipment interests
          </a>
        </Link>
      ),

      params?.roles === "carrier" && (
        <>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={showInterestAction.bind(
              this,
              row.ShipmentId,
              params.CompanyId,
              params.UserId
            )}
          >
            <i title="Place interest" className="first fas fa-heart"></i>
            Place interest
          </button>
        </>
        //   <Link
        //   href={
        //     "/shipment/shipment-action/?IsReadOnly=IsReadOnly&shipmentId=" +
        //     row.ShipmentId +
        //     "&companyId=" +
        //     params.CompanyId +
        //     "&userId=" +
        //     params.UserId
        //   }
        //   passHref
        // >
        //   <a className="btn btn-sm" title="Place interest">
        //     <i className="first fas fa-heart"></i>
        //   </a>
        // </Link>
      ),
      params?.roles === "shipper" && (
        <Link
          href={"/shipment/shipment-action/?shipmentId=" + row.ShipmentId}
          passHref
        >
          <a className="btn btn-outline-primary" title="Edit Shipment">
            <i className="first fas fa-pen"></i>Edit Shipment
          </a>
        </Link>
      ),
      params?.roles === "admin" && (
        <Link
          href={
            "/delete-data/?tbl=Shipments&fld=ShipmentId&val=" + row.ShipmentId
          }
          passHref
        >
          <a
            className="btn btn-sm"
            title="Delete/Archive (Redundant/Incorrect data)"
          >
            <i className="fas fa-trash-alt"></i>
          </a>
        </Link>
      ),
    ],
  },

  {
    id: 1,
    name: `Name`,
    selector: (row) => row.User.FullName,
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: "Company",
    selector: (row) => row?.Company?.CompanyName,
    sortable: true,
    reorder: true,
  },
  {
    id: 27,
    name: "Price Offer",
    selector: (row) => row?.ShipmentRequestPrice,
    sortable: true,
    reorder: true,
  },
  // {
  //   id: 3,
  //   name: "Load Category",
  //   selector: (row) =>
  //     LOAD_TYPE.find((item) => item.value === row.LoadCategory).text,
  //   sortable: true,
  //   reorder: true,
  // },
  {
    id: 4,
    name: "Shipment Item(s)",
    maxWidth: "350px",
    cell: (row) => (
      <div
        style={{
          color: "grey",
          overflow: "hidden",
          whiteSpace: "wrap",
          textOverflow: "ellipses",
        }}
      >
        {row.ShipmentDetails.map((detail, i) => (
          <div key={i}>
            Type-{detail?.VehicleType}
            <br />
            VIN-{detail?.VIN}
            <br />
            Make-{detail?.VehicleMake}
            <br />
            Model-{detail?.VehicleModel}
            <br />
            Color-{detail?.VehicleColor}
            <br />
            Year-{detail?.VehicleModelYear}
            <br />
            <p></p>
          </div>
        ))}
      </div>
    ),
    sortable: true,
    reorder: true,
  },

  // {
  //   id: 5,
  //   name: "Load Type",
  //   selector: (row) =>
  //     LOAD_CAPACITY.find((item) => item.value === row.LoadType).text,
  //   sortable: true,
  //   reorder: true,
  // },

  // {
  //   id: 6,
  //   name: "Load Unit",
  //   selector: (row) => row.LoadUnit,
  //   sortable: true,
  //   reorder: true,
  // },

  // {
  //   id: 7,
  //   name: "Qty",
  //   selector: (row) => row.Qty,
  //   sortable: true,
  //   reorder: true,
  // },

  {
    id: 8,
    name: "Pick Up Region",
    selector: (row) =>
      row.PickUpRegion
        ? State.getStateByCodeAndCountry(row.PickUpRegion, row.PickUpCountry)
            .name
        : row.PickUpRegion,
    sortable: true,
    reorder: true,
  },
  // {
  //   id: 9,
  //   name: "AssignedShipment?",
  //   selector: (row) => (
  //     <Form.Check
  //       type="checkbox"
  //       id="custom-switch"
  //       checked={row.AssignedShipment}
  //       disabled
  //     />
  //   ),
  //   sortable: true,
  //   right: true,
  //   reorder: true,
  // },

  {
    id: 10,
    name: "Pick Up Location",
    selector: (row) => row.PickUpLocation,
    sortable: true,
    reorder: true,
  },
  {
    id: 11,
    name: "Pick Up Country",
    selector: (row) =>
      row.PickUpCountry
        ? Country.getCountryByCode(row.PickUpCountry).name
        : row.PickUpCountry,
    sortable: true,
    reorder: true,
  },
  {
    id: 12,
    name: "Delivery Region",
    selector: (row) =>
      row.DeliveryRegion
        ? State.getStateByCodeAndCountry(
            row.DeliveryRegion,
            row.DeliveryCountry
          ).name
        : row.DeliveryRegion,
    sortable: true,
    reorder: true,
  },
  {
    id: 13,
    name: "Delivery Country",
    selector: (row) =>
      row.DeliveryCountry
        ? Country.getCountryByCode(row.DeliveryCountry).name
        : row.DeliveryCountry,
    sortable: true,
    reorder: true,
  },
  {
    id: 14,
    name: "Delivery Location",
    selector: (row) => row.DeliveryLocation,
    sortable: true,
    reorder: true,
  },
  {
    id: 15,
    name: "Expected PickUpDate",
    selector: (row) => row.ExpectedPickUpDate,
    sortable: true,
    reorder: true,
  },
  {
    id: 16,
    name: "Expected Delivery Date",
    selector: (row) => row.ExpectedDeliveryDate,
    sortable: true,
    reorder: true,
  },

  {
    id: 17,
    name: "Request For Shipment",
    selector: (row) => row.RequestForShipment,
    sortable: true,
    reorder: true,
  },
  {
    id: 18,
    name: "Shipment Request Price",
    selector: (row) => row.ShipmentRequestPrice,
    sortable: true,
    reorder: true,
  },
  {
    id: 19,
    name: "Delivery Contact Name",
    selector: (row) => row.DeliveryContactName,
    sortable: true,
    reorder: true,
  },
  {
    id: 20,
    name: "Delivery Contact Phone",
    selector: (row) => row.DeliveryContactPhone,
    sortable: true,
    reorder: true,
  },
  {
    id: 21,
    name: "Delivery Email",
    selector: (row) => row.DeliveryEmail,
    sortable: true,
    reorder: true,
  },
  {
    id: 22,
    name: "Shipment Date",
    selector: (row) => row.ShipmentDate,
    sortable: true,
    reorder: true,
  },

  {
    id: 23,
    name: "Shipment Status",
    selector: (row) =>
      TRIP_STATUS.find((item) => item.value === row.ShipmentStatus).text,
    sortable: true,
    reorder: true,
  },
  {
    id: 24,
    name: "Shipment Docs",
    selector: (row) => row.ShipmentDocs,
    sortable: true,
    reorder: true,
  },

  params?.roles === "admin" &&
    ({
      id: 25,
      name: "Created Date",
      selector: (row) => row.createdAt,
      sortable: true,
      right: true,
      reorder: true,
    },
    {
      id: 26,
      name: "Updated Date",
      selector: (row) => row.updatedAt,
      sortable: true,
      right: true,
      reorder: true,
    }),
];
