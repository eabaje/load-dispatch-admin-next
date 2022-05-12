import React, {useState, useContext, useCallback, useEffect } from "react";
import { ChevronsDown, Edit, Trash, User } from "react-feather";
import { useRouter } from "next/router"
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Form from "react-bootstrap/Form";
import "react-data-table-component-extensions/dist/index.css";
import {
  listVehicles,
  listVehiclesByCarrier,
  listVehiclesByCompany,
} from "../../context/actions/vehicle/vehicle.action";
import { GlobalContext } from "../../context/Provider";
import { columns } from "../../datasource/dataColumns/vehicle";
import MainLayout from "../../layout/mainLayout";
import { toast } from 'react-toastify';
import Datatable from "../../components/datatable/datatable-m";


function ListVehicle() {

  const router = useRouter()
  const {
    query:{companyId,vehicleId,carrierId,carrierType }
  } = router
 
  const isAddMode = !vehicleId;
  
  const [data2, setData] = useState([]);

  const {
    authState: { user },
  } = useContext(GlobalContext)

  const {
    vehicleDispatch,
    vehicleState: {
      Vehicles: { data, error, loading },
    },
  } = useContext(GlobalContext);

  // Calling the function on component mount
  useEffect(() => {
   
    if (data.length === 0) {
    if (carrierType) {
     
        listVehiclesByCarrier(carrierId, carrierType)(vehicleDispatch);
        // listVehicles()(vehicleDispatch);
      
    } else if (companyId) {
          
        listVehiclesByCompany(companyId)(vehicleDispatch)(res=>{

        }

        )(err=>{
          toast.error(err);
        });
      }
     else {
     
        listVehicles()(vehicleDispatch);
      
    }
  }
   
    
  }, []);
 // console.log(`data`, data);
 
  return (
    
    <MainLayout>
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header alert alert-info">
            <h3>List of Vehicles</h3>
            <hr />
            <ul>
              <li>Edit and delete Vehicles</li>
              <li>Assign Vehicle to Drivers</li>
              <li>Add vehicles to Carrier </li>
            </ul>
          </div>
          <div class="card-body table-border-style">
          <Datatable loading={loading} col={columns(user)} 
            data={data}/>
           
          </div>
        </div>
      </div>
      </MainLayout>
  );
}
//Login.layout = "main";
export default ListVehicle;
