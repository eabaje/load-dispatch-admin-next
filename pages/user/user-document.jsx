import React, { useState, useContext, useEffect } from "react";
import { listUserSubscriptions } from "../../context/actions/user/user.action";
import { GlobalContext } from "../../context/Provider";
import { columns } from "../../datasource/dataColumns/usersubscription";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";

import dynamic from "next/dynamic";
// import DocumentUpload from "../../components/upload/doc-file-upload";

// import SortIcon from "@mui/icons-material/ArrowDownward";

function UserDocument({ query }) {
  // const router = useRouter()
  const { companyId, userId } = query;

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
            <h3>My Documents</h3>
            <hr />
          </div>
          <div className="card-body table-border-style">
            <p class="lead">
              A Document Packet ("Docpack") is a compilation of your{" "}
              <strong>U.S. DOT Certification</strong>,{" "}
              <strong>Insurance and/or Bond Certificate</strong>,{" "}
              <strong>A Completed W-9 Form</strong>, and Other Licenses (if
              any). Once you fax us your documents, we securely store them and
              allow you to give either temporary or permanent viewing access at
              your discretion.
            </p>

            <hr />

            <h3>Creating and submitting your docpack</h3>

            <ol>
              <li>
                <a href="/protected/docpack/coversheet" target="_blank">
                  Download
                </a>{" "}
                & print fax cover sheet
                <br />
                <strong>
                  Please only use the fax cover sheet provided by Load Dispatch.
                </strong>
              </li>
              <li>
                Print & complete{" "}
                <a
                  href="http://www.irs.gov/pub/irs-pdf/fw9.pdf"
                  target="_blank"
                >
                  W-9
                </a>
                <br />
                <strong>
                  Do not include your social security number on your W-9. Your
                  docpack will be rejected if you do. Only include your EIN, if
                  you have one, or do not include your W-9 with your docpack.
                </strong>
              </li>
              <li>
                Please place your documents in the following order:
                <ol>
                  <li>Fax Cover</li>
                  <li>DOT Certificate or License</li>
                  <li>Insurance or Bond Certificate</li>
                  <li>Completed w-9 (w/o instructions)</li>
                </ol>
              </li>
              <li>
                Fax all documents in the appropriate order to{" "}
                <strong>(858 408-1835)</strong>
              </li>
            </ol>

            <hr />

            <p>
              You will be notified by email as soon as your docpack has been
              uploaded.
            </p>

            <br />
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
