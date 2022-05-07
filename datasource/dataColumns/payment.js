import { Link } from "react-router-dom";
export const columns = (params) => [
  // {
  //   id: 1,
  //   name: "User",
  //   selector: (row) => row.RoleId,
  //   sortable: true,
  //   reorder: true,
  // },
  {
    id: 2,
    name: "Name",
    selector: (row) => row.User?.FullName,
    sortable: true,
    reorder: true,
  },
  {
    id: 3,
    name: "PaymentSessionId",
    selector: (row) => row.PaymentSessionId,
    sortable: true,
    reorder: true,
  },
  {
    id: 4,
    name: "ReferenceId",
    selector: (row) => row.ReferenceId,
    sortable: true,
    reorder: true,
  },
  {
    id: 5,
    name: "Order Status",
    selector: (row) => row.OrderStatus,
    sortable: true,
    reorder: true,
  },
  {
    id: 6,
    name: "PaymentSessionId",
    selector: (row) => row.PaymentSessionId,
    sortable: true,
    reorder: true,
  },
  {
    id: 7,
    name: "PaymentMethod",
    selector: (row) => row.PaymentMethod,
    sortable: true,
    reorder: true,
  },
  {
    id: 8,
    name: "Currency",
    selector: (row) => row.Currency,
    sortable: true,
    reorder: true,
  },
  {
    id: 9,
    name: "TotalPrice",
    selector: (row) => row.TotalPrice,
    sortable: true,
    reorder: true,
  },
  {
    id: 10,
    name: "PaymentDate",
    selector: (row) => row.PaymentDate,
    sortable: true,
    reorder: true,
  },

  {
    id: 12,
    name: "Created Date",
    selector: (row) => row.createdAt,
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 13,
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
      <Link
        to={"/delete-data/Payments/" + row.PaymentId}
        className="btn btn-sm"
        title="Delete/Archive Redundant/Incorrect data"
      >
        <i className="fas fa-trash-alt"></i>
      </Link>,
    ],
  },
];
