import React, {useState, useEffect,useContext } from "react";
import { useRouter } from "next/router"
import axios from "axios";
import { API_URL } from "../../constants";
import { GlobalContext } from "../../context/Provider";
import "react-data-table-component-extensions/dist/index.css";
import { columns } from "../../datasource/dataColumns/driver";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import Datatable from "../../components/datatable/datatable-m";


function ListDriver() {

  const router = useRouter()
  const {
    query:companyId 
  } = router



  
 
  const [data, setData] = useState([]);
 
  const {
    authState: { user },
  } = useContext(GlobalContext)
  // GET request function to your Mock API
  const fetchData = async () => {
   
    try {
     
      const lnk= companyId ? `${API_URL}driver/findAllDriversByCompany/${companyId}`: `${API_URL}driver/findAll`;
      
      const res =  await axios.get(lnk);

     
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
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header alert alert-info">
              <h4>View List of Drivers</h4>
              <hr />
              <ul>
                <li>Edit and delete Drivers</li>
                <li>Assign Drivers to Vehicle</li>
                <li>Request for Proposal</li>

                <li>Assign Jobs to Personnel</li>
              </ul>
            </div>
            <div class="card-body table-border-style">
            <Datatable loading={loading} col={columns(user)} 
            data={data}/>
              
            </div>
          </div>
        </div>
        </MainLayout>
    </>
  );
}
// Login.layout = "main";
export default ListDriver;
