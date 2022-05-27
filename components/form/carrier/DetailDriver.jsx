import React from 'react'

const DetailDriver = ({query}) => {
    const { driverId ,vehicleId} = query;
    const [profile, setProfile] = useState({});
    const [refId, setRefId] = useState();
   
  
    const {
      authState: { user },
    } = useContext(GlobalContext)
    // Calling the function on component mount
    useEffect(() => {
      fetchData(
        "driver/findOneAssigned",
        driverId
      )((driver) => {
        setProfile(driver);
        setRefId(driver?.Vehicles[0].VehicleId)
        console.log(driver?.Vehicles[0].VehicleId)
      //   for(var key in driver?.Vehicles) {
      //     // examples
        
        
      //     console.log( driver[key]["Vehicles"].VehicleId );
      //  }
  
  
  
      })((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  
   
    }, []);
  
    const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
      control,
    } = useForm();
  
    const {
      shipmentDispatch,
      shipmentState: {
        createShipment: { error, loading },
      },
    } = useContext(GlobalContext);
  
    function onRequestDriverService(formdata) {
      formdata.Email = profile?.Email;
      console.log("fromPasword", formdata);
      AssignShipmentsToDriver(formdata)(shipmentDispatch)((res) => {
        enqueueSnackbar(`Updated  Password successfully`, {
          variant: "success",
        });
      })((error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      });
    }
  
    console.log("data", profile);
  return (
    <div class="col-xl-12">
    <div class="card">
      <div class="card-header alert alert-info">
        <h3>Connect with Driver </h3>
        <hr />
        <ul>
          <li>View the driver Profile</li>
          <li>Check the truck images </li>
          <li>Send a request </li>
        </ul>
      </div>
      <div class="card-body table-border-style">
        <div class="container">
          <div class="row">
            {/* <!-- [ accordion-collapse ] start --> */}
            <div class="col-sm-12">
              <div class="accordion" id="accordionExample">
                <div class="card mb-0">
                  <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                      <a
                        href="#!"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Profile
                      </a>
                    </h5>
                  </div>
                  <div
                    id="collapseOne"
                    class="collapse show"
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div class="card user-card">
                      <div class="card-block">
                        <div class="user-image">
                          <img
                            src={
                              profile?.PicUrl
                                ? IMG_URL + profile?.PicUrl
                                : "https://bootdey.com/img/Content/avatar/avatar7.png"
                            }
                            class="img-radius"
                            alt="User-Profile-Image"
                          />
                        </div>
                        <h6 class="f-w-600 m-t-25 m-b-10">
                          {profile?.DriverName}
                        </h6>
                        <h6 class="f-w-600 m-t-25 m-b-10">
                          {profile?.Company?.CompanyName}
                        </h6>
                        <h7 class="f-w-600 m-t-25 m-b-10">
                          {profile?.Address}
                          {profile?.Vehicles?.map(vehicles => <>{vehicles?.VehicleId}</>)}
                        </h7>
                        <p class="text-muted">
                          {profile?.IsActivated && "Active"}
                          {profile?.DOB && "| Born " + profile?.DOB}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card mb-0">
                  <div class="card-header" id="headingTwo">
                    <h5 class="mb-0">
                      <a
                        href="#!"
                        class="collapsed"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Check Vehicle
                      </a>
                    </h5>
                  </div>
                  <div
                    id="collapseTwo"
                    class="collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordionExample"
                  >
                    <div class="card-body">
                      <div class="col-md-12 ">
                        <UploadImages title={'Check pictures of vehicle'} refId= {vehicleId} role={user?.roles}/>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-header" id="headingFour">
                    <h5 class="mb-0">
                      <a
                        href="#!"
                        class="collapsed"
                        data-toggle="collapse"
                        data-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        Any Interest
                      </a>
                    </h5>
                  </div>
                  <div
                    id="collapseFour"
                    class="collapse"
                    aria-labelledby="headingFour"
                    data-parent="#accordionExample"
                  >
                    <div class="card-body">
                      <form onSubmit={handleSubmit(onRequestDriverService)}>
                        <input
                          type="hidden"
                          name="Email"
                          value={profile?.Email}
                          class="form-control"
                          {...register("Email")}
                        />
                        <div class="form-row">
                              <div class="col-sm-10 ">
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="invalidCheck"
                                    required
                                  />
                                  <label class="form-check-label" for="invalidCheck">
                                    I am interested in engaging your services
                                  </label>
                                  <div class="invalid-feedback">
                                    You must agree before submitting.
                                  </div>
                                </div>
                              </div>
                              <div class="right" style={{ float: "right" }}>
                              <button
                              type="submit"
                              class="btn  btn-primary"
                              style={{ float: "right" }}
                            >
                              {loading ? (
                                <i className="fa fa-spinner fa-spin"></i>
                              ) : (
                                <i class="feather mr-2 icon-check-circle"></i>
                              )}
                              {"Submit "}
                            </button>
                              </div>
                            </div>

                       

                        <div class="form-row">
                          <div class="col-sm-10 "></div>
                          <div class="right" style={{ float: "right" }}>
                           
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- [ accordion-collapse ] end --> */}
          </div>
        </div>

        <div class="table-responsive">
          {/* <DataTableExtensions {...tableData}> 
          <DataTableExtensions exportHeaders columns={columns} data={data}>
            <DataTable
              columns={columns}
              data={data}
              className="table table-striped table-bordered table-hover table-checkable"
              defaultSortField={1}
              sortIcon={<ChevronsDown />}
              defaultSortAsc={true}
              pagination
              highlightOnHover
            />
          </DataTableExtensions>*/}
        </div>
      </div>
    </div>
  </div>
  )
}

export default DetailDriver