import React, { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  listUserSubscriptions,
  updateCompanyDoc,
  uploadCompanyDoc,
} from "../../context/actions/user/user.action";
import { GlobalContext } from "../../context/Provider";
import { columns } from "../../datasource/dataColumns/usersubscription";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";

import dynamic from "next/dynamic";
import { DOC_TYPE } from "../../constants/enum";
// import DocumentUpload from "../../components/upload/doc-file-upload";

// import SortIcon from "@mui/icons-material/ArrowDownward";

function UserDocument({ query }) {
  // const router = useRouter()
  const { companyId, userId } = query;
  const [docFile, setdocFile] = useState([]);
  const {
    authState: { user },
  } = useContext(GlobalContext);
  const {
    userDispatch,
    userState: {
      UserSubscriptions: { data, loading },
    },
  } = useContext(GlobalContext);

  const {
    register: documentform,
    formState: { errors },
    handleSubmit: handleSubmit,
    setValue,
    control,
  } = useForm();

  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {
    const rowsInput = {
      DocName: "",
      DocTitle: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const onChangeDocHandler = async (e) => {
    setdocFile((docFile) => [...docFile, e.target.files[0]]);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };
  function onSubmit(formdata, docFile) {
    console.log("formdata", formdata);
    return uploadCompanyDocAction(formdata, docFile);

    // return companyId
    //   ? uploadCompanyDocAction(shipmentId, companyId, userId)
    //   : updateCompanyDocAction(formdata, companyId);
  }

  function updateCompanyDocAction(formdata, shipmentId) {
    updateCompanyDoc(formdata, companyId)(userDispatch)((res) => {
      if (res) {
        toast.success("Contract created successfully");
      }
      setTimeout(() => {
        toast.dismiss();
        router.reload(`/user/?companyId=${user.CompanyId}`);
      }, 5000);
    })((error) => {
      toast.error(error);
    });
  }

  const uploadCompanyDocAction = (formdata, docFile) => {
    //   setLoadSpinner({ loadSigned: true });
    uploadCompanyDoc(formdata, docFile)(userDispatch)((res) => {
      if (res) {
        toast.success("Contract created successfully");
      }
      setTimeout(() => {
        toast.dismiss();
        router.reload(`/user/?companyId=${user.CompanyId}`);
      }, 5000);
    })((error) => {
      toast.error(error);
    });
  };

  function redirectPage() {
    setTimeout(() => {
      toast.dismiss();
      user.roles === "carrier"
        ? router.reload(`/shipment/?companyId=${user.CompanyId}`)
        : user.roles === "shipper"
        ? router.reload(`/shipment/?userId=${user.UserId}`)
        : router.reload(`/shipment/?companyId=${user.CompanyId}`);
    }, 5000);
  }
  useEffect(() => {
    addTableRows();
    if (data.length === 0) {
      listUserSubscriptions()(userDispatch)((res) => {})((err) => {
        toast.error(err);
      });
    }
    // console.log(`loading`, loading);
  }, []);
  console.log(`doc`, docFile);
  return (
    <MainLayout>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header alert alert-info">
            <h3>My Documents</h3>
            <hr />
          </div>
          <div className="card-body table-border-style">
            <p class="lead">
              A Document Packet ("Docpack") is a compilation of your{" "}
              <strong>Certificate of InCoporation</strong>,{" "}
              <strong>Insurance and/or Bond Certificate</strong>,{" "}
              <strong>A Completed W-9 Form</strong>, and Other Licenses (if
              any).Kindly upload a scanned copy, we securely store them and
              allow you to give either temporary or permanent viewing access at
              your discretion.
            </p>

            <hr />

            <p>
              Once we are satisfied with you documents as stated ,you will be
              notified by email .
            </p>

            <br />
            <div class="mb-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group row">
                  <div className="col-md-12">
                    <div className="col-md-12 alert alert-info">
                      <h6>
                        {" "}
                        User document List
                        {/* <a
                                href="javascript:void()"
                                className=" right"
                                onClick={addTableRows}
                              >
                                + Add Vehicle
                              </a> */}
                        <button
                          type="button"
                          className=" btn-outline-primary right"
                          onClick={addTableRows}
                        >
                          + Add Document
                        </button>
                      </h6>
                    </div>
                  </div>
                  <input
                    type="hidden"
                    name="RefId"
                    value={companyId}
                    className="form-control"
                    {...documentform("RefId")}
                  />
                  <input
                    type="hidden"
                    name="CompanyId"
                    value={companyId}
                    className="form-control"
                    {...documentform("CompanyId")}
                  />
                </div>
                {rowsData.map((document, index) => (
                  <>
                    <div id={index}>
                      <div className="form-group row">
                        <div className="col-sm-4">
                          <select
                            required="required"
                            className="form-control"
                            name={`document[${index}].DocType`}
                            id={`document[${index}].DocType`}
                            {...documentform(`document[${index}].DocType`)}
                          >
                            <option value="">Choose Document Type</option>
                            {DOC_TYPE.map((item) => (
                              <option key={item.value} value={item.value}>
                                {item.text}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <input
                            name={`document[${index}].DocTitle`}
                            className="form-control"
                            placeholder="Document Title"
                            {...documentform(`document[${index}].DocTitle`, {
                              required: true,
                            })}
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            className="form-control"
                            type="file"
                            id={`document[${index}].DocName`}
                            name={`document[${index}].DocName`}
                            {...documentform(`document[${index}].DocName`)}
                            onChange={(e) => onChangeDocHandler(e)}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-md-12 alert alert-info">
                          {index > 0 && (
                            <button
                              type="button"
                              className="btn btn-outline-danger right"
                              onClick={() => deleteTableRows(index)}
                            >
                              x
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ))}

                <div className="col-md-6">
                  <button type="submit" className="btn  btn-primary">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* <DocumentUpload
            refId={companyId}
            title={"Upload Document Files"}
            fileType="file"
            uploadType={"vehicle"}
          /> */}
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

export default dynamic(() => Promise.resolve(UserDocument), { ssr: false });
