import React, { useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
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
import { columns } from "../../datasource/dataColumns/carrier";
import { GlobalContext } from "../../context/Provider";
import {
  listCarriers,
  listCarriersByCompany,
  listCarriersById,
} from "../../context/actions/carrier/carrier.action";
import LoadingBox from "../../components/notification/loadingbox";

function ListCarrier() {
 // const { companyId } = match.params; { history, match }
  const { companyId } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data2, setData] = useState([]);
 
  const {
    authState: { user },
  } = useContext(GlobalContext)
  const {
    carrierDispatch,
    carrierState: {
      Carriers: { data, loading },
    },
  } = useContext(GlobalContext);

  // GET request function to your Mock API
  const loadData = () => {
   
    companyId
      ? listCarriersByCompany(companyId)(carrierDispatch)((res) => {
          // setData(res.data);
        })((err) => {
          enqueueSnackbar(err, { variant: "error" });
        })
      : listCarriers()(carrierDispatch)((res) => {
          // setData(res.data);
        })((err) => {
          enqueueSnackbar(err, { variant: "error" });
        });
  };
  // Calling the function on component mount
  useEffect(() => {
   
    if (data.length === 0) {
      loadData();
    }

    //  fetchData();
  }, []);
  // console.log(`data`, JSON.parse(localStorage.getItem("user")));
  return (
    <div className="col-sm-12">
      <div className="card">
        <div className="card-header alert alert-info">
          <h4>View List of carriers</h4>
          <hr />
          <ul>
            <li>Edit and delete Vehicle</li>
            <li>Assign Drivers to Vehicle</li>
          </ul>
        </div>
        <div className="card-body table-border-style">
          <div className="table-responsive">
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
                  classNameName="table table-striped table-bordered table-hover table-checkable"
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
  );
}
Login.layout = "main";
export default ListCarrier;
