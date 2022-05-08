// const imgMyimageexample = require("../assets/slider_2.jpg");
// const divStyle = {
//   width: "100vw",
//   height: "100vh",
//   backgroundImage: `url(${imgMyimageexample})`,
//   backgroundSize: "cover",
// };
import Image from "next/image";
const AuthLayout = ({ children }) => (
  <div>
    <div className="auth-wrapper" >
      <div className="auth-content">
        <div className="card">
          <div className="row align-items-center text-center">
            <div className="col-md-12">
              <div className=" card-body">
                <Image
                  src="/"
                  alt=""
                  className="logo-main"
                />
                <h4 className="mb-3 f-w-700">Global Load Dispatch</h4>

                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AuthLayout;
