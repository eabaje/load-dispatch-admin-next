import {Form} from "react-bootstrap"
import { Link } from "react-router-dom";
import { LOAD_CAPACITY, LOAD_TYPE } from "../../constants/enum";
export const columns = (params) => [
  {
    id: 1,
    name: "Action",
    sortable: false,
    selector: "null",
    cell: (row) => [
      params?.roles === "carrier" && (
        <Link
          to={"/edit-carrier-info/" + row.CarrierId}
          className="btn btn-sm"
          title="Add  Carrier Info"
        >
          <i className="first fas fa-plus"></i>
        </Link>
      ),

       params?.roles === "carrier" && (
        <Link
          to={
            "/add-vehicle-to-carrier/" +
            row.CompanyId +
            "/" +
            row.CarrierId +
            "/" +
            row.CarrierType
          }
          className="btn btn-sm"
          title="Add Vehicle to carrier"
        >
          <i className="first fas fa-car"></i>
        </Link>
      ),
      params?.roles === "carrier" && (
        <Link
          to={"/list-carrier-vehicles/" + row.CarrierId + "/" + row.CarrierType}
          className="btn btn-sm"
          title="List all Carrier Vehicle "
        >
          <i className="first fas fa-truck"></i>
        </Link>
      )
     
    ],
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
    name: "Carrier Type",
    selector: (row) =>
      LOAD_TYPE.find((item) => item.value === row.CarrierType).text,
    sortable: true,
    reorder: true,
  },
  {
    id: 4,
    name: "Fleet Type",
    selector: (row) =>
      LOAD_CAPACITY.find((item) => item.value === row.FleetType).text,
    sortable: true,
    reorder: true,
  },
  {
    id: 5,
    name: "Fleet Number",
    selector: (row) => row.FleetNumber,
    sortable: true,
    reorder: true,
  },

  {
    id: 6,
    name: "Licensed?",
    selector: (row) => (
      <Form.Check
        type="checkbox"
        id="custom-switch"
        checked={row.Licensed}
        disabled
      />
    ),
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 7,
    name: "AboutUs",
    selector: (row) => row.AboutUs,
    sortable: true,
    reorder: true,
  },
  {
    id: 8,
    name: "Service Description",
    selector: (row) => row.ServiceDescription,
    sortable: true,
    reorder: true,
  },
  {
    id: 9,
    name: "Rating",
    selector: (row) => row.Rating,
    sortable: true,
    reorder: true,
  },

  {
    id: 10,
    name: "Created Date",
    selector: (row) => row.createdAt,
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 11,
    name: "Updated Date",
    selector: (row) => row.updatedAt,
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 12,
    name: "Action",
    sortable: false,
    selector: "null",
    cell: (row) => [
      params?.roles === "carrier" && (
        <Link
          to={"/edit-carrier-info/" + row.CarrierId}
          className="btn btn-sm"
          title="Edit  Carrier Info"
        >
          <i className="first fas fa-pen"></i>
        </Link>
      ),

       params?.roles === "carrier" && (
        <Link
          to={
            "/add-vehicle-to-carrier/" +
            row.CompanyId +
            "/" +
            row.CarrierId +
            "/" +
            row.CarrierType
          }
          className="btn btn-sm"
          title="Add Vehicle to carrier"
        >
          <i className="first fas fa-car"></i>
        </Link>
      ),
      params?.roles === "carrier" && (
        <Link
          to={"/list-carrier-vehicles/" + row.CarrierId + "/" + row.CarrierType}
          className="btn btn-sm"
          title="List all Carrier Vehicle "
        >
          <i className="first fas fa-truck"></i>
        </Link>
      ),
      params?.roles === "admin" && (
        <Link
          to={"/delete-data/Carriers/" + row.CarrierId}
          className="btn btn-sm"
          title="Delete/Archive Redundant/Incorrect data"
        >
          <i className="fas fa-trash-alt"></i>
        </Link>
      ),
    ],
  },
];
