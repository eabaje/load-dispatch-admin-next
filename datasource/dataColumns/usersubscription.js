import {Form} from "react-bootstrap"
import { Link } from "react-router-dom";
export const columns = (params) => [
  {
    id: 1,
    name: "Subscription Name",
    selector: (row) => row.SubscriptionName,
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: "User",
    selector: (row) => row.User.FullName,
    sortable: true,
    reorder: true,
  },
  {
    id: 3,
    name: "Active",
    selector: (row) => (
      <Form.Check
        type="checkbox"
        id="custom-switch"
        checked={row.Active}
        disabled
      />
    ),
    sortable: true,
    right: true,
    reorder: true,
  },
  {
    id: 4,
    name: "Start Date",
    selector: (row) => row.StartDate,
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    id: 4,
    name: "End Date",
    selector: (row) => row.EndDate,
    sortable: true,
    right: true,
    reorder: true,
  },

  {
    name: "Action",
    sortable: false,
    selector: "null",
    cell: (row) => [
      (params?.UserId === row.UserId || params?.roles === "admin") && (
        <Link
          to={
            "/edit-user-subscription/" +
            row.UserSubscriptionId +
            "/" +
            row.UserId
          }
          className="btn btn-sm"
          title="Edit User Subscription"
        >
          <i className="first fas fa-pen"></i>
        </Link>
      ),
      params?.roles === "admin" && (
        <Link
          to={"/list-user-subscription/" + row.UserSubscriptionId}
          className="btn btn-sm"
          title="Edit User Subscription"
        >
          <i className="first fas fa-pen"></i>
        </Link>
      ),
      params?.roles === "admin" && (
        <Link
          to={"/delete-data/" + row.UserSubscriptionId}
          className="btn btn-sm"
          title="Edit User Subscription"
        >
          <i className="fas fa-trash-alt"></i>
        </Link>
      ),
    ],
  },
];
