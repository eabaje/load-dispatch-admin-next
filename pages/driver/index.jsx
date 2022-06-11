import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../../constants";
import { GlobalContext } from "../../context/Provider";
import "react-data-table-component-extensions/dist/index.css";
import { columns } from "../../datasource/dataColumns/driver";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import Datatable from "../../components/datatable/datatable-m";
import dynamic from "next/dynamic";
import NextLink from "next/link";

function ListDriver({ query }) {
  const router = useRouter();
  const { companyId } = query;

  const [data, setData] = useState([]);

  const {
    authState: { user, loading },
  } = useContext(GlobalContext);
  // GET request function to your Mock API
  const fetchData = async () => {
    try {
      const lnk = companyId
        ? `${API_URL}driver/findAllDriversByCompany/${companyId}`
        : `${API_URL}driver/findAll`;

      const res = await axios.get(lnk);

      if (res) {
        setData(res.data.data);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  // Calling the function on component mount
  useEffect(() => {
    fetchData();
    //  console.log(`data`, data);
  }, []);

  return (
    <>
      <MainLayout>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header alert alert-info">
              <h4>View List of Drivers</h4>
              <hr />
              <ul>
                <li>Edit and delete Drivers</li>
                <li>Assign Drivers to Vehicle</li>
                <li>Request for Proposal</li>

                <li>Assign Jobs to Personnel</li>
              </ul>
              <h1 className="my-5">
                <NextLink href="/driver/driver-action/" passHref>
                  <a className="mt-0 btn text-white float-right btn  btn-primary">
                    Create Driver Info
                  </a>
                </NextLink>
              </h1>
            </div>
            <div className="card-body table-border-style">
              <Datatable loading={loading} col={columns(user)} data={data} />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
// Login.layout = "main";
//export default ListDriver;
export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(ListDriver), { ssr: false });
