import Link from "next/link";
import { LOAD_CAPACITY, LOAD_TYPE, TRIP_STATUS } from "../../constants/enum";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import { API_URL } from "../../constants";
import axios from "axios";
const AssignShipmentToCompanyAction = async (shipmentId, companyId, userId) => {
  const data = {
    ShipmentId: shipmentId,
    CompanyId: companyId,
    UserId: userId,
  };

  try {
    console.log("shipmentId", data);
    const res = await axios.post(
      `${API_URL}shipment/assignCompanyShipment`,
      data
    );

    if (res) {
      toast.success(res.data.message);
    }
  } catch (err) {
    toast.error(err.message);
  }
};

export const columns = (params) => [
  {
    name: "Action",
    sortable: false,
    selector: "null",
    wrap: false,
    grow: 3,
    cell: (row) => [
      params?.roles === "carrier" && (
        <Link
          href={
            "/shipment/assign-shipment/?shipmentId=" +
            row.ShipmentId +
            "&driverId=driver&companyId=" +
            params?.CompanyId
          }
        >
          <a
            className="btn btn-outline-primary"
            title="Assign Shipment to Driver"
          >
            {" "}
            <i className="first fas fa-briefcase"></i>
          </a>
        </Link>
      ),
      params?.roles === "shipper" && (
        <>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={AssignShipmentToCompanyAction.bind(
              this,
              row.ShipmentId,
              row.CompanyId,
              params.UserId
            )}
          >
            <i title="Assign Shipment" className="first fas fa-briefcase"></i>
            Assign Shipment
          </button>
        </>
      ),

      params?.roles === "admin" && (
        <Link
          href={
            "/delete-data/?tbl=ShipmentsInterested&fld=ShipmentInterestId&val=" +
            row.ShipmentInterestId
          }
        >
          <a
            className="btn btn-sm"
            title="Delete/Archive (Redundant/Incorrect data)"
          >
            {" "}
            <i className="fas fa-trash-alt"></i>
          </a>
        </Link>
      ),
    ],
  },

  {
    id: 1,
    name: "Interested Carrier",
    selector: (row) => row.User?.FullName,
    cell: (row) => [
      <>
        {" "}
        <Link
          href={
            "/company/review-company-action/?companyId=" +
            row.CompanyId +
            "&readOnly=true"
          }
        >
          <a title="Click to view Carrier Profile"> {row.User?.FullName} </a>
        </Link>
      </>,
    ],
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: "Shipment ",
    selector: (row) => row.Shipment?.Description,

    cell: (row) => [
      <>
        {" "}
        <Link href={"/shipment/?isReadOnly=" + row.ShipmentId}>
          <a className="btn btn-sm" title="click to shipment info">
            {row.Shipment?.Description}
          </a>
        </Link>
      </>,
    ],
    sortable: true,
    reorder: true,
  },
  {
    id: 3,
    name: "Load Category",
    selector: (row) =>
      LOAD_TYPE.find((item) => item.value === row.Shipment.LoadCategory).text,
    sortable: true,
    reorder: true,
  },
  {
    id: 4,
    name: "Load Weight",
    selector: (row) => row.Shipment.LoadWeight,
    sortable: true,
    reorder: true,
  },

  {
    id: 5,
    name: "Load Type",
    selector: (row) =>
      LOAD_CAPACITY.find((item) => item.value === row.Shipment.LoadType).text,
    sortable: true,
    reorder: true,
  },

  {
    id: 6,
    name: "Load Unit",
    selector: (row) => row.Shipment.LoadUnit,
    sortable: true,
    reorder: true,
  },

  {
    id: 7,
    name: "Qty",
    selector: (row) => row.Shipment.Qty,
    sortable: true,
    reorder: true,
  },

  //   {
  //     id: 8,
  //     name: "Pick Up Region",
  //     selector: (row) =>
  //       row.PickUpRegion
  //         ? State.getStateByCodeAndCountry(row.PickUpRegion, row.PickUpCountry)
  //             .name
  //         : row.PickUpRegion,
  //     sortable: true,
  //     reorder: true,
  //   },
  //   {
  //     id: 9,
  //     name: "AssignedShipment?",
  //     selector: (row) => (
  //       <Form.Check
  //         type="checkbox"
  //         id="custom-switch"
  //         checked={row.AssignedShipment}
  //         disabled
  //       />
  //     ),
  //     sortable: true,
  //     right: true,
  //     reorder: true,
  //   },

  //   {
  //     id: 10,
  //     name: "Pick Up Location",
  //     selector: (row) => row.PickUpLocation,
  //     sortable: true,
  //     reorder: true,
  //   },
  //   {
  //     id: 11,
  //     name: "Pick Up Country",
  //     selector: (row) =>
  //       row.PickUpCountry
  //         ? Country.getCountryByCode(row.PickUpCountry).name
  //         : row.PickUpCountry,
  //     sortable: true,
  //     reorder: true,
  //   },
  //   {
  //     id: 12,
  //     name: "Delivery Region",
  //     selector: (row) =>
  //       row.DeliveryRegion
  //         ? State.getStateByCodeAndCountry(
  //             row.DeliveryRegion,
  //             row.DeliveryCountry
  //           ).name
  //         : row.DeliveryRegion,
  //     sortable: true,
  //     reorder: true,
  //   },
  //   {
  //     id: 13,
  //     name: "Delivery Country",
  //     selector: (row) =>
  //       row.DeliveryCountry
  //         ? Country.getCountryByCode(row.DeliveryCountry).name
  //         : row.DeliveryCountry,
  //     sortable: true,
  //     reorder: true,
  //   },
  //   {
  //     id: 14,
  //     name: "Delivery Location",
  //     selector: (row) => row.DeliveryLocation,
  //     sortable: true,
  //     reorder: true,
  //   },
  //   {
  //     id: 15,
  //     name: "Expected PickUpDate",
  //     selector: (row) => row.ExpectedPickUpDate,
  //     sortable: true,
  //     reorder: true,
  //   },
  //   {
  //     id: 16,
  //     name: "Expected Delivery Date",
  //     selector: (row) => row.ExpectedDeliveryDate,
  //     sortable: true,
  //     reorder: true,
  //   },

  //   {
  //     id: 17,
  //     name: "Request For Shipment",
  //     selector: (row) => row.RequestForShipment,
  //     sortable: true,
  //     reorder: true,
  //   },
  //   {
  //     id: 18,
  //     name: "Shipment Request Price",
  //     selector: (row) => row.ShipmentRequestPrice,
  //     sortable: true,
  //     reorder: true,
  //   },
  //   {
  //     id: 19,
  //     name: "Delivery Contact Name",
  //     selector: (row) => row.DeliveryContactName,
  //     sortable: true,
  //     reorder: true,
  //   },
  //   {
  //     id: 20,
  //     name: "Delivery Contact Phone",
  //     selector: (row) => row.DeliveryContactPhone,
  //     sortable: true,
  //     reorder: true,
  //   },
  //   {
  //     id: 21,
  //     name: "Delivery Email",
  //     selector: (row) => row.DeliveryEmail,
  //     sortable: true,
  //     reorder: true,
  //   },
  {
    id: 22,
    name: "Date of Interest Shown",
    selector: (row) => row.InterestDate,
    sortable: true,
    reorder: true,
  },
  //   {
  //     id: 23,
  //     name: "Shipment Docs",
  //     selector: (row) => row.ShipmentDocs,
  //     sortable: true,
  //     reorder: true,
  //   },
  //   {
  //     id: 24,
  //     name: "Shipment Status",
  //     selector: (row) =>
  //       TRIP_STATUS.find((item) => item.value === row.ShipmentStatus).text,
  //     sortable: true,
  //     reorder: true,
  //   },
  //   params?.roles !== "admin" && (
  //   {
  //     id: 25,
  //     name: "Created Date",
  //     selector: (row) => row.createdAt,
  //     sortable: true,
  //     right: true,
  //     reorder: true,
  //   }
  // ),
  // params?.roles !== "admin" && (
  //   {
  //     id: 26,
  //     name: "Updated Date",
  //     selector: (row) => row.updatedAt,
  //     sortable: true,
  //     right: true,
  //     reorder: true,
  //   }

  //   ),
];
