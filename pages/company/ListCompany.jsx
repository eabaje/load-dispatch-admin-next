import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../constants";
import { getError } from "../../utils/error";
import { ChevronsDown, Edit, Trash, Truck } from "react-feather";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Form from "react-bootstrap/Form";
import "react-data-table-component-extensions/dist/index.css";
import { columns } from "../../datasource/dataColumns/company";
import { GlobalContext } from "../../context/Provider";

import LoadingBox from "../../components/notification/loadingbox";
import {
  listCompanyByCompanyId,
  listCompanys,
} from "../../context/actions/user/user.action";

function ListCompany({ history, match }) {
  const { companyId } = match.params;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data2, setData] = useState([]);
 

  const {
    authState: { user },
  } = useContext(GlobalContext)
  const {
    userDispatch,
    userState: {
      Companys: { data, loading },
    },
  } = useContext(GlobalContext);

  const loadData=()=>{

    if (data.length === 0) {
      listCompanys()(userDispatch)((res) => {
        setData(res.data);
      })((err) => {
        enqueueSnackbar(err, { variant: "error" });
      });
    }

 
  }
  // Calling the function on component mount
  useEffect(() => {
    let controller = new AbortController();
    loadData();
    return () => controller?.abort();
   
   
  }, []);

  const tableData = {
    columns,
    data2,
  };
  return (
    <>
    
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header alert alert-info">
              <h4>View List of Company</h4>
              <ul>
                <li>Edit and delete Company</li>
              </ul>
            </div>
            <div class="card-body table-border-style">
              <div class="table-responsive">
                {/* <DataTableExtensions {...tableData}> */}

                {loading ? (
                  <LoadingBox />
                ) : (
                  <DataTableExtensions
                    exportHeaders
                    columns={columns(user)}
                    data={
                      companyId
                        ? data.data?.filter(
                            (item) => item?.CompanyId === parseInt(companyId)
                          )
                        : data?.data
                    }
                  >
                    <DataTable
                      columns={columns(user)}
                      data={
                        companyId
                          ? data.data?.filter(
                              (item) => item?.CompanyId === parseInt(companyId)
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
                )}
              </div>
            </div>
          </div>
        </div>
   
    </>
  );
}
Login.layout = "main";
export default ListCompany;
