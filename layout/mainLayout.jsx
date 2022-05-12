import Header from "../components/header/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="loader-bg">
        <div className="loader-track">
          <div className="loader-fill"></div>
        </div>
      </div>
      <Header />
      <div className="pcoded-main-container">
        {/* <div className="pcoded-wrapper container"> */}
        <div className="pcoded-content">
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="page-header-title">
                    {/* <h5 className="m-b-10">Alert</h5> */}
                  </div>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/dashboard">
                        <a>
                          <i className="feather icon-home"></i>
                        </a>
                      </Link>
                    </li>
                    {/* <li className="breadcrumb-item">
                    <a href="#!">Basic Components</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#!">Alert</a>
                  </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="pcoded-inner-content">
            <div className="main-body"> 
              <div className="page-wrapper">*/}
               <ToastContainer position="bottom-right" />
          <div className="row">{children}</div>

          {/* </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default MainLayout;
