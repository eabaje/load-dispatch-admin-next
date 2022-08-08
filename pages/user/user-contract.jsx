import React, { useState, useContext, useEffect } from "react";
import { listUserSubscriptions } from "../../context/actions/user/user.action";
import { GlobalContext } from "../../context/Provider";
import { columns } from "../../datasource/dataColumns/usersubscription";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import Datatable from "../../components/datatable/datatable-m";
import dynamic from "next/dynamic";

// import SortIcon from "@mui/icons-material/ArrowDownward";

function UserContract({ query }) {
  // const router = useRouter()
  const { subscribeId, userId } = query;

  const isSingleMode = !subscribeId;

  const {
    authState: { user },
  } = useContext(GlobalContext);
  const {
    userDispatch,
    userState: {
      UserSubscriptions: { data, loading },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    if (data.length === 0) {
      listUserSubscriptions()(userDispatch)((res) => {})((err) => {
        toast.error(err);
      });
    }
    // console.log(`loading`, loading);
  }, []);
  //  console.log(`data`, data);
  return (
    <MainLayout>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header alert alert-info">
            <h3>My Contract</h3>
            <hr />
            <p class="alert alert-info">
              If you post vehicles for shipment and have a pre-existing dispatch
              contract that you would like to use with your Central Dispatch
              dispatch sheets, you may copy and paste it below. Once you have
              added your contract, each carrier will be required to sign your
              contract at the same time they sign the dispatch sheet.
              <b>
                Please Note: Modifying your contract will NOT modify it for any
                dispatches that have been previously signed by the carrier.
              </b>
            </p>
          </div>
          <div className="card-body table-border-style">
            <div class="panel panel-default">
              <div class="panel-body">
                <form
                  id="contractForm"
                  method="POST"
                  action="/protected/contract"
                >
                  <div class="form-group has-feedback">
                    <textarea
                      class="form-control"
                      id="contract"
                      name="contract"
                      rows="30"
                      required
                    >
                      615-554-2496
                    </textarea>
                    <span
                      class="glyphicon form-control-feedback"
                      aria-hidden="true"
                    ></span>
                    <span class="help-block with-errors text-right small"></span>
                  </div>
                  <div class="form-group text-right">
                    <input
                      class="btn btn-primary"
                      type="submit"
                      value="Submit Contract"
                    />
                  </div>
                  <input
                    type="hidden"
                    id="CSRFToken"
                    name="CSRFToken"
                    value="071901dbafb50a4673c7eacfc488edcfbe36fdb701fc182598126beb4905bf48"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
//Login.layout = "main";
//export default UserSubscription;
export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(UserContract), { ssr: false });
