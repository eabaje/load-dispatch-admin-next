import { Link } from "react-router-dom";
export const columns = (params) => [
  {
    id: 1,
    name: "RoleId",
    selector: (row) => row.RoleId,
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: "Name",
    selector: (row) => row.Name,
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
      <>
        {" "}
        <Link
          to={"/edit-role/" + row.RoleId}
          className="btn btn-sm"
          title="Edit  Subscription"
        >
          <Edit size={12} />
        </Link>
      </>,

      <Link
        to={"/add-user-to-role/" + row.RoleId}
        className="btn btn-sm"
        title="Add User to Role"
      >
        <i className="first fas fa-user"></i>
      </Link>,
      params?.roles === "admin" && (
        <Link
          to={"/delete-data/Roles/" + row.RoleId}
          className="btn btn-sm"
          title="Delete/Archive Redundant/Incorrect data"
        >
          <i className="fas fa-trash-alt"></i>
        </Link>
      ),
    ],
  },
];
