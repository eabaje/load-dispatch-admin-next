import React, { useCallback, useContext, useEffect } from "react";
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
import { listUserSubscriptions } from "../../context/actions/user/user.action";
import { GlobalContext } from "../../context/Provider";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Form from "react-bootstrap/Form";
import "react-data-table-component-extensions/dist/index.css";
import { columns } from "../../datasource/dataColumns/subscribe";
import { listSubscriptions } from "../../context/actions/subscribe/subscribe.action";
import LoadingBox from "../../components/notification/loadingbox";
function ListSubscription() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data2, setData] = useState([]);

  // const [loading, setLoading] = useState(true);
  const {
    authState: { user },
  } = useContext(GlobalContext)

  const {
    subscribeDispatch,
    subscribeState: {
      Subscribes: { data, loading }, //loading
    },
  } = useContext(GlobalContext);

  // Calling the function on component mount

  // const getSubscription = useCallback(() => {
  //   listSubscriptions()(subscribeDispatch);
  // }, []);

  useEffect(() => {
    if (data.length === 0) {
      listSubscriptions()(subscribeDispatch);
      ((result) => {
        setData(result.data);
      })((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
    }

  }, []);

  

  return (
   
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header alert alert-info">
            <h3>List of Subscription</h3>
            <hr />
            <ul>
              <li>Edit and delete Subscription</li>
              <li>Get an overview of all Subscription</li>
            </ul>
          </div>
          <div class="card-body table-border-style">
            {loading && <LoadingBox />}
            <div class="table-responsive">
              {/* <DataTableExtensions {...tableData}> */}
              <DataTableExtensions
                exportHeaders
                columns={columns(Users)}
                data={data?.data}
              >
                <DataTable
                  columns={columns(user)}
                  data={data?.data}
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
export default ListSubscription;
