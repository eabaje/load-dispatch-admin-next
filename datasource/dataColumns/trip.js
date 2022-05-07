import { Link } from "react-router-dom";
export const columns = (params) => [
  {
    id: 1,
    name: "Driver Name",
    selector: (row) => row.DriverName,
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: "Company",
    selector: (row) => row.Company.CompanyName,
    sortable: true,
    reorder: true,
  },
  {
    id: 3,
    name: "Shipment Reference",
    selector: (row) => row.ShipmentId,
    sortable: true,
    reorder: true,
  },
  {
    id: 4,
    name: "Vehicle Id",
    selector: (row) => row.VehicleId,
    sortable: true,
    reorder: true,
  },

  {
    id: 5,
    name: "Driver Note",
    selector: (row) => row.DriverNote,
    sortable: true,
    reorder: true,
  },

  {
    id: 6,
    name: "Pick Up Region",
    selector: (row) => row.PickUpRegion,
    sortable: true,
    reorder: true,
  },

  {
    id: 7,
    name: "Pick Up Location",
    selector: (row) => row.PickUpLocation,
    sortable: true,
    reorder: true,
  },
  {
    id: 8,
    name: "Pick Up Country",
    selector: (row) => row.PickUpCountry,
    sortable: true,
    reorder: true,
  },
  {
    id: 9,
    name: "Delivery Region",
    selector: (row) => row.DeliveryRegion,
    sortable: true,
    reorder: true,
  },
  {
    id: 10,
    name: "Delivery Country",
    selector: (row) => row.DeliveryCountry,
    sortable: true,
    reorder: true,
  },
  {
    id: 11,
    name: "Delivery Location",
    selector: (row) => row.DeliveryLocation,
    sortable: true,
    reorder: true,
  },
  {
    id: 12,
    name: "Expected PickUpDate",
    selector: (row) => row.ExpectedPickUpDate,
    sortable: true,
    reorder: true,
  },
  {
    id: 13,
    name: "Expected Delivery Date",
    selector: (row) => row.ExpectedDeliveryDate,
    sortable: true,
    reorder: true,
  },

  {
    id: 14,
    name: "Trip Duration",
    selector: (row) => row.Duration,
    sortable: true,
    reorder: true,
  },
  {
    id: 15,
    name: "Driver Note",
    selector: (row) => row.DriverNote,
    sortable: true,
    reorder: true,
  },

  {
    id: 16,
    name: "Created Date",
    selector: (row) => row.createdAt,
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 17,
    name: "Updated Date",
    selector: (row) => row.updatedAt,
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    name: "Action",
    sortable: false,
    selector: "null",
    cell: (row) => [
      (params?.roles === "driver" || params?.roles === "admin") && (
        <Link
          to={"/edit-trip-info/" + row.TripId}
          className="btn btn-sm"
          title="Edit Trip Info"
        >
          <i className="first fas fa-pen"></i>
        </Link>
      ),

      <Link
        to={"/track-trip/" + row.TripId}
        className="btn btn-sm"
        title="Track Trip"
      >
        <i className="first fas fa-truck-moving"></i>
      </Link>,
      params?.roles === "admin" && (
        <Link
          to={"/delete-data/" + row.VehicleId}
          className="btn btn-sm"
          title="Delete/Archive Redundant/Incorrect data"
        >
          <i className="fas fa-trash-alt"></i>
        </Link>
      ),
    ],
  },
];
