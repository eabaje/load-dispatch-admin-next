import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import BreadCrumb from "../../components/banner/breadcrumb";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axios.post("auth/register", { email, username, password });
      history.push("/login");
    } catch (err) {}
  };
  return (
    <div>
      <BreadCrumb name="Register" />
      <section id="history" class="space-top">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 history-block">
              <h2>Sign Up Now</h2>
              <p>
                New users can enjoy LoadDispatch for 90-days at no-charge. After
                that, you hereby authorize LoadDispatch to charge you
                automatically every month until you cancel your subscription.
                After your application is accepted, we will contact you with a
                password. All fields marked with * are required..
              </p>

              <p>
                While LoadDispatch® is not a shipping company, we connect you to
                over 13,000 carriers ready to transport your vehicle. In
                addition, we provide access to U.S. DOT license information,
                insurance information and ratings for carriers as well as an
                online dispatching system to make dispatching faster and easier.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="about" class="space bg-color">
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-xs-12">
              <h3>Pricing Information</h3>
              <ul>
                <li>
                  Use LoadDispatch<sup>&reg;</sup> for <strong>90-days</strong>{" "}
                  at no-charge.
                </li>
                <li>
                  After 90-days, you can continue to use. Plans start as low as
                  <strong>
                    <span id="startingPrice">$89.95</span>/month
                  </strong>{" "}
                  plus tax for Shippers.
                </li>
                <li>
                  Carriers can get premium access for{" "}
                  <b>
                    <span id="unlimitedPrice">$115.95</span>/month
                  </b>{" "}
                  plus tax.
                </li>
                <li>
                  There is no obligation to continue membership and you will not
                  be charged until you sign up.
                </li>
              </ul>
            </div>
            <div class="col-md-6 col-xs-12">
              <h3>Important Notice!</h3>
              <p>
                If you have previously had an account, please{" "}
                <a href="/contact-us">contact us</a> so that we can verify your
                information and expedite your application.
              </p>
            </div>
          </div>
          <div></div>
          <div class="row">
            <div class="col-sm-12 about-block">
              <h3>Create an Account here</h3>

              <form className="input">
                <div class="row">
                  <div class="col-sm-6 col-md-4">
                    <div class="form-group has-feedback ">
                      <label for="userTypes">
                        Please describe your business
                      </label>
                      <select
                        name="usertypes"
                        class="form-control"
                        required="required"
                        id="userTypes"
                      >
                        <option></option>
                        <option class="form-control carrierType">
                          Carrier
                        </option>
                        <option class="form-control">Auction</option>
                        <option class="form-control">Corp. Relocation</option>
                        <option class="form-control brokerType">Broker</option>
                        <option class="form-control dealerType">
                          Rental Agency
                        </option>
                        <option class="form-control salvageType dealerType">
                          Salvage
                        </option>
                        <option class="form-control dealerType">Dealer</option>
                        <option class="form-control">Manufacturer</option>
                        <option class="form-control importExportType">
                          Import/Export
                        </option>
                      </select>
                      <span
                        class="glyphicon form-control-feedback"
                        aria-hidden="true"
                      ></span>
                      <span class="help-block with-errors text-right"></span>
                    </div>
                  </div>

                  <div class="col-sm-6 col-md-4">
                    <div class="form-group has-feedback ">
                      <label for="txtCompanyName">Company Name</label>
                      <input
                        type="text"
                        class="form-control"
                        name="companyname"
                        id="txtCompanyName"
                        maxlength="60"
                        required="required"
                        pattern="[\w\s]+"
                        value=""
                        data-error="Must not contain special characters."
                      />
                      <span
                        class="glyphicon form-control-feedback"
                        aria-hidden="true"
                      ></span>
                      <span class="help-block with-errors text-right small"></span>
                    </div>

                    <div class="form-group has-feedback " id="userNameGroup">
                      <label for="txtUserName">Username</label>
                      <input
                        type="text"
                        class="form-control"
                        name="username"
                        id="txtUserName"
                        data-minlength="6"
                        maxlength="8"
                        required="required"
                        pattern="[a-z0-9]+"
                        data-error="Must be between 6 and 8 characters long, all lowercase, and contain no special characters."
                        value=""
                      />
                      <span
                        class="glyphicon form-control-feedback"
                        aria-hidden="true"
                      ></span>
                      <span class="help-block with-errors text-right small"></span>
                    </div>
                  </div>

                  <div class="col-sm-6 col-md-4">
                    <div class="form-group has-feedback ">
                      <label for="txtEmail">Email</label>
                      <input
                        type="text"
                        class="form-control email"
                        name="email"
                        id="txtEmail"
                        maxlength="50"
                        required="required"
                        value=""
                      />
                      <span
                        class="glyphicon form-control-feedback"
                        aria-hidden="true"
                      ></span>
                      <span class="help-block with-errors text-right small"></span>
                    </div>

                    <div class="form-group has-feedback ">
                      <label for="txtEmailConfirm">Confirm Email</label>
                      <input
                        type="text"
                        class="form-control email"
                        id="txtEmailConfirm"
                        maxlength="50"
                        required="required"
                        data-match="#txtEmail"
                        value=""
                        data-error="Email does not match"
                      />
                      <span
                        class="glyphicon form-control-feedback"
                        aria-hidden="true"
                      ></span>
                      <span class="help-block with-errors text-right small"></span>
                    </div>
                  </div>
                  <button
                    className="sppb-btn sppb-btn-default sppb-btn-"
                    onClick={handleFinish}
                  >
                    Start
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section class="action">
        <div class="container">
          <div class="row">
            <div class="col-sm-9 action-block">
              <h2 class="title">do you need Carrier to lift your cargo?</h2>
            </div>
            <div class="col-sm-3 action-block text-right ">
              <a
                href="/register"
                class="sppb-btn sppb-btn-default sppb-btn-right"
              >
                Sign UP
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
