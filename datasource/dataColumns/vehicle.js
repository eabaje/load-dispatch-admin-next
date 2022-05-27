import {Form} from "react-bootstrap"
import  Link  from "next/link";
import { LOAD_TYPE } from "../../constants/enum";
export const columns = (params) => [
  {
    name: "Action",
    sortable: false,
    selector: "null",
    cell: (row) => [
      (params?.roles === "carrier" ) && (
        <Link
          href={"/vehicle/vehicle-action/?vehicleId=" + row.VehicleId}
          
        >
            <a className="btn btn-sm"
          title="Edit  Vehcile">
          <i className="first fas fa-pen"></i></a>
        </Link>
      ),
      params?.roles === "carrier" && (
        <Link
          href={"/vehicle/vehicle-action/?companyId="+ row.CompanyId+ "&vehicleId=" + row.VehicleId + "&driverId=driver"}
         
        >
         <a  className="btn btn-sm"
          title="Assign Driver to Vehicle"> <i className="first fas fa-user"></i></a>
        </Link>
      ),
      params?.roles === "admin" && (
        <Link
          href={"/delete-data/?tbl=Vehicles&fld=VehcleId&val=" + row.VehicleId}
        
        >
          <a   className="btn btn-sm"
          title="Delete/Archive (Redundant/Incorrect data)"><i className="fas fa-trash-alt"></i></a>
        </Link>
      ),
    ],
  },
  {
    id: 1,
    name: "Carrier Name",
    selector: (row) => row.Carrier.CarrierType,
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: "Vehicle Type",
    selector: (row) =>
      LOAD_TYPE.find((item) => item.value === row?.VehicleType).text,
    sortable: true,
    reorder: true,
  },
  {
    id: 3,
    name: "Vehicle Number",
    selector: (row) => row.VehicleNumber,
    sortable: true,
    reorder: true,
  },
  {
    id: 4,
    name: "Vehicle Color",
    selector: (row) => row.VehicleColor,
    sortable: true,
    reorder: true,
  },

  {
    id: 5,
    name: "Vehicle Model",
    selector: (row) => row.VehicleModel,
    sortable: true,
    reorder: true,
  },

  {
    id: 6,
    name: "License Plate",
    selector: (row) => row.LicensePlate,
    sortable: true,
    reorder: true,
  },

  {
    id: 7,
    name: "Purchase Year",
    selector: (row) => row.PurchaseYear,
    sortable: true,
    reorder: true,
  },

  {
    id: 8,
    name: "Vehicle Model",
    selector: (row) => row.VehicleModel,
    sortable: true,
    reorder: true,
  },
  {
    id: 9,
    name: "Insured?",
    selector: (row) => (
      <Form.Check
        type="checkbox"
        id="custom-switch"
        checked={row.Insured}
        disabled
      />
    ),
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 10,
    name: "PicUrl",
    selector: (row) => row.PicUrl,
    sortable: true,
    reorder: true,
  },
  {
    id: 11,
    name: "Vehicle Docs",
    selector: (row) => row.VehicleDocs,
    sortable: true,
    reorder: true,
  },
  params?.roles === "admin" && (
  {
    id: 12,
    name: "Created Date",
    selector: (row) => row.createdAt,
    sortable: true,
    right: true,
    reorder: true,
  }
  ),
  params?.roles === "admin" && (
  {
    id: 13,
    name: "Updated Date",
    selector: (row) => row.updatedAt,
    sortable: true,
    right: true,
    reorder: true,
  }),

  
];
