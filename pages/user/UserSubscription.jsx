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
import { fetchData, fetchDataAll } from "../../helpers/query";
import {
  listUserSubscriptions,
  listUserSubscriptionByUserId,
} from "../../context/actions/user/user.action";
import { GlobalContext } from "../../context/Provider";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Form from "react-bootstrap/Form";
import "react-data-table-component-extensions/dist/index.css";
import { columns } from "../../datasource/dataColumns/usersubscription";
import LoadingBox from "../../components/notification/loadingbox";
// import SortIcon from "@mui/icons-material/ArrowDownward";

function UserSubscription({ history, match }) {
  const { subscribeId } = match.params;
  const { userId } = match.params;
  const isSingleMode = !subscribeId;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [res, setData] = useState([]);
  
  // const [loading, setLoading] = useState(false);
  console.log(`userSubscriptionId`, subscribeId);
  console.log(`isSingleMode`, isSingleMode);
  // GET request function to your Mock API

  // enqueueSnackbar(getError(err), { variant: "error" });
  // Calling the function on component mount
  const {
    authState: { user },
  } = useContext(GlobalContext)
  const {
    userDispatch,
    userState: {
      UserSubscriptions: { data, loading },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
  

    if (data.length === 0) {
      listUserSubscriptions()(userDispatch)((res) => {})((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
    }
   // console.log(`loading`, loading);
  }, []);
//  console.log(`data`, data);
  return (
   
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header alert alert-info">
            <h3>List of User Subscription</h3>
            <hr />
            <ul>
              <li>Edit and delete Subscription</li>
              <li>Get an overview of all Subscription</li>
            </ul>
          </div>
          <div class="card-body table-border-style">
            <div class="table-responsive">
              {loading && <LoadingBox />}
              {/* <DataTableExtensions {...tableData}> */}
              <DataTableExtensions
                exportHeaders
                columns={columns(user)}
                data={
                  userId
                    ? data.data?.filter((item) => item?.UserId === userId)
                    : subscribeId
                    ? data.data?.filter(
                        (item) => item?.SubscribeId === parseInt(subscribeId)
                      )
                    : data?.data
                }
              >
                <DataTable
                  columns={columns(user)}
                  data={
                    userId
                      ? data.data?.filter((item) => item?.UserId === userId)
                      : subscribeId
                      ? data.data?.filter(
                          (item) => item?.SubscribeId === parseInt(subscribeId)
                        )
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
export default UserSubscription;
