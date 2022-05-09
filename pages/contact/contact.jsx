import React from "react";
import BreadCrumb from "../../components/banner/breadcrumb";

function Contact() {
  return (
    <div>
      <BreadCrumb name="Contact Us" />
      <div class="container">
        <div class="page-header">
          <h1>Contact Us</h1>
        </div>

        <div class="row">
          <div class="col-sm-8">
            <p class="lead">
              Submit a question or comment to LoadDispatch&reg; support.
            </p>
          </div>

          <div class="col-sm-4">
            <address>
              <strong>LoadDispatch</strong>
              <br />
              26387 Network Place
              <br />
              Chicago, IL 60673-1263
            </address>

            <p>
              <a href="tel:8009287869">
                <i class="fa fa-phone"></i> 800-928-7869
              </a>
              <br />
            </p>
          </div>
        </div>

        <hr />

        <form
          action="/contact-us/submit"
          id="contact-form"
          method="post"
          enctype="x-www-form-urlencoded"
          autocomplete="off"
        >
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group has-feedback">
                <label for="contact-username">
                  Username (if you are a member)
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="username"
                  id="contact-username"
                  maxlength="64"
                  value=""
                />{" "}
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>

              <div class="form-group has-feedback">
                <label for="name">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  required="required"
                  name="name"
                  id="name"
                  maxlength="64"
                  value=""
                />
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>

              <div class="form-group has-feedback">
                <label for="company_name">Company Name</label>
                <input
                  type="text"
                  class="form-control"
                  required="required"
                  name="company_name"
                  id="company_name"
                  maxlength="64"
                  value=""
                />
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-sm-4">
              <div class="form-group has-feedback">
                <label for="email">Email</label>
                <input
                  type="text"
                  class="form-control email"
                  name="email"
                  id="email"
                  maxlength="50"
                  value=""
                  data-phoneoremail="true"
                />
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>

              <div class="form-group has-feedback">
                <label for="retype_email">Retype Email</label>
                <input
                  type="text"
                  class="form-control email"
                  name="retype_email"
                  id="retype_email"
                  maxlength="50"
                  value=""
                  data-match="#email"
                />
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>

              <div class="form-group has-feedback">
                <label for="phone">Phone</label>
                <input
                  type="text"
                  class="form-control"
                  name="phone"
                  id="phone"
                  maxlength="20"
                  value=""
                  data-phoneoremail="true"
                />
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-sm-4">
              <div class="form-group has-feedback">
                <label for="timezone">Timezone</label>
                <select id="timezone" name="timezone" class="form-control">
                  <option value="">--Select One--</option>
                  <option value="eastern">Eastern</option>
                  <option value="central">Central</option>
                  <option value="mountain">Mountain</option>
                  <option value="pacific">Pacific</option>
                </select>
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>

              <div class="form-group has-feedback">
                <label for="City">City</label>
                <input
                  type="text"
                  class="form-control"
                  id="City"
                  name="City"
                  id="City"
                  value=""
                  maxlength="50"
                  required="required"
                />
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>

              <div class="form-group has-feedback">
                <label for="State">State</label>
                <select
                  name="State"
                  id="State"
                  class="form-control"
                  required="required"
                >
                  <option value="">--Select One--</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="DC">Washington DC</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                  <option value="AB">Canada-Alberta</option>
                  <option value="BC">Canada-British Columbia</option>
                  <option value="MB">Canada-Manitoba</option>
                  <option value="NB">Canada-New Brunswick</option>
                  <option value="NL">Canada-Newfoundland</option>
                  <option value="NT">Canada-Northwest Territories</option>
                  <option value="NS">Canada-Nova Scotia</option>
                  <option value="NU">Canada-Nunavut</option>
                  <option value="ON">Canada-Ontario</option>
                  <option value="PE">Canada-Prince Edward Island</option>
                  <option value="QC">Canada-Quebec</option>
                  <option value="SK">Canada-Saskatchewan</option>
                  <option value="YT">Canada-Yukon</option>
                </select>
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <span class="help-block with-errors"></span>
              </div>
            </div>
          </div>

          <hr />

          <div class="row">
            <div class="col-sm-4">
              <div class="form-group has-feedback">
                <label for="nature_of_question">Nature of Question</label>
                <select
                  id="nature_of_question"
                  name="nature_of_question"
                  class="form-control"
                  required="required"
                >
                  <option value="">--Select One--</option>
                  <option value="app_status">
                    Status of Application (3-5 business days to process)
                  </option>
                  <option value="billing">
                    LoadDispatch Billing + Billing Address Change
                  </option>
                  <option value="classifieds_and_resources">
                    Classifieds and Resources
                  </option>
                  <option value="doc_packet">Document Packet</option>
                  <option value="logon_expired">
                    Logon Trouble - Account Expired
                  </option>
                  <option value="logon_password">
                    Logon Trouble - Password Does Not Work
                  </option>
                  <option value="other">Other</option>
                  <option value="other_trouble">
                    Other Trouble Using LoadDispatch.com
                  </option>
                  <option value="suggestions">
                    Suggestions for LoadDispatch.com
                  </option>
                </select>
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-sm-4">
              <div
                class="form-group has-feedback jsRatingQuestion"
                style={{ display: "none" }}
              >
                <label>
                  <strong>Reason</strong>
                </label>
                <select
                  id="reason"
                  name="reason"
                  class="form-control"
                  required="required"
                >
                  <option data-company-required="0" value="">
                    --Select One--
                  </option>
                  <option data-company-required="0" value="How to Submit">
                    How to Submit
                  </option>
                  <option
                    data-company-required="0"
                    value="How to Dispute or Escalate"
                  >
                    How to Dispute or Escalate
                  </option>
                  <option
                    data-company-required="1"
                    value="Rating Status Update"
                  >
                    Rating Status Update
                  </option>
                  <option
                    data-company-required="1"
                    value="Determination or Decision"
                  >
                    Determination or Decision
                  </option>
                </select>
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-sm-4">
              <div
                class="form-group has-feedback jsRatingQuestion rating-against-form-group"
                style={{ display: "none" }}
              >
                <label for="rating_against">
                  <span
                    class="text-danger small"
                    id="ratingAgainstRequiredIndicator"
                    style={{ display: "none" }}
                  >
                    *{" "}
                  </span>
                  <strong>Rating Against</strong>
                </label>
                <div class="input-group" id="spLightbox">
                  <div class="input-group-addon sp-lightbox">
                    <span
                      class="glyphicon glyphicon-search"
                      aria-hidden="true"
                    ></span>
                  </div>
                  <input
                    type="text"
                    class="form-control sp-lightbox"
                    id="rating_against_visible"
                    name="rating_against_visible"
                    maxlength="64"
                    value=""
                    readonly
                    data-ratingagainst="true"
                  />
                  <div
                    class="input-group-addon"
                    id="clearRatingAgainst"
                    style={{ display: "none" }}
                  >
                    <span
                      class="glyphicon glyphicon-remove"
                      aria-hidden="true"
                    ></span>
                  </div>
                </div>
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors error-rating-against"></div>
                <input type="hidden" id="againstId" name="againstId" value="" />
                <input
                  type="hidden"
                  id="rating_against"
                  name="rating_against"
                  value=""
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-4">
              <div
                class="form-group has-feedback jsRatingQuestion"
                style={{ display: "none" }}
              >
                <label for="order_id">Order ID</label>
                <input
                  type="text"
                  class="form-control"
                  name="order_id"
                  id="order_id"
                  maxlength="20"
                  value=""
                />
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>
            </div>
          </div>

          <div class="form-group has-feedback">
            <label for="question">
              <strong>Question/Comment</strong>
            </label>
            <textarea
              rows="6"
              class="form-control"
              name="question"
              id="question"
              cols="40"
              required
            ></textarea>
            <span
              class="glyphicon form-control-feedback"
              aria-hidden="true"
            ></span>
            <div class="help-block with-errors"></div>
          </div>

          <input
            type="submit"
            class="btn btn-primary"
            name="submit"
            id="jsSubmitContactUs"
            value="Send Question or Comment"
          />
          <input
            type="hidden"
            id="CSRFToken"
            name="CSRFToken"
            value="49ec8e6ac446c5f187ed8a9525b9a313798bfafd880fd403f8737c9a7488633e"
          />
        </form>

        <hr />

        <div class="modal fade" id="company-search" style={{ display: "none" }}>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span area-hidden="true">&times;</span>
                </button>

                <h3>Select Company</h3>
              </div>
              <div class="modal-body"></div>
              <div class="modal-footer">
                <button
                  type="button"
                  data-dismiss="modal"
                  class="btn btn-default"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
