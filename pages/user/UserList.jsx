import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../constants";
import { getError } from "../../utils/error";
import $ from "jquery";
import { ChevronsDown, Edit, Trash, Users } from "react-feather";
import { fetchDataAll } from "../../helpers/query";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Form from "react-bootstrap/Form";
import "react-data-table-component-extensions/dist/index.css";
import { columns } from "../../datasource/dataColumns/user";
import { GlobalContext } from "../../context/Provider";
import { listUsers } from "../../context/actions/user/user.action";

function UserList({ history, match }) {
  const { userId } = match.params;
  const isSingleMode = !userId;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data2, setData] = useState([]);
 
  const {
    authState: { user },
  } = useContext(GlobalContext)
  const {
    userDispatch,

    userState: {
      Users: { data, loading }, //loading
    },
  } = useContext(GlobalContext);

  const loadData=()=>{

    if (data.length === 0) {
      listUsers()(userDispatch)((res) => {
        setData(res.data);
      })((err) => {
        enqueueSnackbar(err, { variant: "error" });
      });
    }

 

  }

  useEffect(() => {

    let controller = new AbortController();
    loadData();
    return () => controller?.abort();

  
   
  }, []);
 // console.log("user", data);
  return (
   
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header ">
            <h3>List of Users</h3>
            <hr />
            <ul class="alert alert-info">
              <li>Edit and delete Users</li>
              <li>Get an overview of all Users</li>
            </ul>
          </div>
          <div class="card-body table-border-style">
            <div class="table-responsive">
              {/* <DataTableExtensions {...tableData}> */}
              <DataTableExtensions
                exportHeaders
                columns={columns(user)}
                data={
                  userId
                    ? data.data?.filter((item) => item?.UserId === userId)
                    : data?.data
                }
              >
                <DataTable
                  columns={columns(user)}
                  data={
                    userId
                      ? data.data?.filter((item) => item?.UserId === userId)
                      : data?.data
                  }
                  className="table table-striped table-bordered table-hover table-checkable"
                  defaultSortField={1}
                  sortIcon={<ChevronsDown />}
                  defaultSortAsc={true}
                  pagination
                  highlightOnHover
                />
              </DataTableExtensions>
            </div>
          </div>
        </div>
      </div>
   
  );
}
Login.layout = "main";
export default UserList;
