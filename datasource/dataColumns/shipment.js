import { Form } from "react-bootstrap";
import Link from "next/link";
import { LOAD_CAPACITY, LOAD_TYPE, TRIP_STATUS } from "../../constants/enum";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";

import { showInterest } from "../../context/actions/shipment/shipment.action";
import React, { useContext } from "react";
import { API_URL } from "../../constants";
import axios from "axios";

export const columns = (params, params1, loadSpinner) => [
  {
    id: 27,
    name: "Action",
    sortable: false,
    selector: "null",
    grow: 4,
    cell: (row) => [
      <></>,
      //params?.roles === "admin"|| params?.roles === "carrier"||   params?.UserId === row?.UserId

      params?.UserId === row?.UserId &&
        params?.roles === "shipper" &&
        row?.AssignDriverShipment?.IsAssigned !== true && (
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
              &nbsp;({row?.ShipmentsInteresteds.length})
            </a>
          </Link>
        ),

      params?.roles === "carrier" &&
        row?.ShipmentStatus !== "NotAssigned" &&
        // row?.Company?.CompanyId === params?.CompanyId &&
        row?.AssignDriverShipment?.IsAssigned === true && (
          <Link
            href={
              "/shipment/assign-shipment/?shipmentId=" +
              row.ShipmentId +
              "&companyId=" +
              params?.CompanyId
            }
            passHref
          >
            <a className="btn btn-outline-primary" title="Check Assignment">
              <i className="first fas fa-eye"></i>Check Assignment
            </a>
          </Link>
        ),

      params?.roles === "carrier" &&
        row?.ShipmentStatus === "Assigned" &&
        row?.AssignDriverShipment?.IsAssigned === true && (
          <Link
            href={
              "/shipment/assign-shipment-list/?shipmentId=" +
              row.ShipmentId +
              "&companyId=" +
              params?.CompanyId
            }
            passHref
          >
            <a className="btn btn-outline-primary" title="Check Assignment">
              <i className="first fas fa-id-card-o"></i>Check Assigned Driver
            </a>
          </Link>
        ),

      params?.roles === "driver" &&
        row?.ShipmentStatus === "Assigned" &&
        row?.AssignDriverShipment?.IsAssigned === true &&
        row?.AssignDriverShipment?.AssignedToDriver === params?.UserId && (
          <>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={params1.bind(
                this,
                row.ShipmentId,
                params.CompanyId,
                params.UserId
              )}
            >
              {loadSpinner ? (
                <>
                  {" "}
                  <i className="fa fa-spinner fa-spin"></i> Processing
                </>
              ) : (
                <>
                  {" "}
                  <i
                    title="Place interest"
                    className="first fas fa-paper-plane"
                  ></i>
                  Dispatch Shipment
                </>
              )}
            </button>
          </>
        ),

      params?.roles === "driver" &&
        row?.ShipmentStatus === "Dispatched" &&
        row?.AssignDriverShipment?.IsAssigned === true &&
        row?.AssignDriverShipment?.AssignedToDriver === params?.UserId && (
          <>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={params1.bind(
                this,
                row.ShipmentId,
                params.CompanyId,
                params.UserId
              )}
            >
              {loadSpinner ? (
                <>
                  {" "}
                  <i className="fa fa-spinner fa-spin"></i> Processing
                </>
              ) : (
                <>
                  {" "}
                  <i
                    title="Place interest"
                    className="first fas fa-paper-plane"
                  ></i>
                  PickUp Shipment
                </>
              )}
            </button>
          </>
        ),

      params?.roles === "driver" &&
        row?.ShipmentStatus === "PickedUp" &&
        row?.AssignDriverShipment?.IsAssigned === true &&
        row?.AssignDriverShipment?.AssignedToDriver === params?.UserId && (
          <>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={params1.bind(
                this,
                row.ShipmentId,
                params.CompanyId,
                params.UserId
              )}
            >
              {loadSpinner ? (
                <>
                  {" "}
                  <i className="fa fa-spinner fa-spin"></i> Processing
                </>
              ) : (
                <>
                  {" "}
                  <i
                    title="Place interest"
                    className="first fas fa-paper-plane"
                  ></i>
                  Delivered Shipment
                </>
              )}
            </button>
          </>
        ),

      params?.roles === "shipper" && row?.ShipmentStatus !== "NotAssigned" && (
        <>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={params1.bind(
              this,
              row.ShipmentId,
              params.CompanyId,
              params.UserId
            )}
          >
            {loadSpinner ? (
              <>
                {" "}
                <i className="fa fa-spinner fa-spin"></i> Processing
              </>
            ) : (
              <>
                {" "}
                <i title="Place interest" className="first fas fa-times"></i>
                Cancel Shipment
              </>
            )}
          </button>
        </>
      ),
      params?.roles === "shipper" &&
        row?.ShipmentStatus === "Assigned" &&
        row?.AssignDriverShipment?.IsAssigned === true && (
          <Link
            href={
              "/shipment/assign-shipment-list/?shipmentId=" +
              row.ShipmentId +
              "&companyId=" +
              params?.CompanyId
            }
            passHref
          >
            <a className="btn btn-outline-primary" title="Check Assignment">
              <i className="first fas fa-briefcase"></i>Check Assigned Driver
            </a>
          </Link>
        ),
      params?.roles === "carrier" &&
        row?.ShipmentStatus === "Assigned" &&
        row?.AssignDriverShipment?.IsAssigned !== true && (
          <Link
            href={
              "/shipment/assign-shipment/?shipmentId=" +
              row.ShipmentId +
              "&action=company&companyId=" +
              params?.CompanyId
            }
            passHref
          >
            <a className="btn btn-outline-primary" title="Assign to Driver">
              <i className="first fas fa-user"></i>Assign to Driver{" "}
            </a>
          </Link>
        ),
      params?.roles === "carrier" && row?.ShipmentStatus === "NotAssigned" && (
        <>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={params1.bind(
              this,
              row.ShipmentId,
              params.CompanyId,
              params.UserId
            )}
          >
            {loadSpinner ? (
              <>
                {" "}
                <i className="fa fa-spinner fa-spin"></i> Processing
              </>
            ) : (
              <>
                {" "}
                <i title="Place interest" className="first fas fa-heart"></i>
                Place interest
              </>
            )}
          </button>
        </>
      ),

      params?.roles === "shipper" && row?.ShipmentStatus === "NotAssigned" && (
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
