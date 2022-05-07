import { Country, State } from "country-state-city";
import React from "react";
import { Link } from "react-router-dom";
import { IMG_URL } from "../../constants";
import Rating from "../rating/Rating";

const DriverCard=(props)=> {
  const { driver } = props;
  const calculate_age = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  return (
    <>
      <div class="card p-3 py-6">
        <div class="text-center">
          {" "}
          <img
            src={
              driver.PicUrl
                ? IMG_URL + driver?.PicUrl
                : "https://bootdey.com/img/Content/avatar/avatar7.png"
            }
            width="100"
            class="rounded-circle"
          />{" "}
        </div>
        <div class="text-center mt-3">
          {" "}
          <span class="bg-secondary p-1 px-4 rounded text-white">
            {driver?.DriverName}
          </span>
          <h6 class="mt-2 mb-0">{driver.Company?.CompanyName}</h6>{" "}
          <span>
            <i class="fa fa-phone-square" aria-hidden="true"></i>{" "}
            {driver?.Phone}
          </span>
          <div class="row about-list ">
            <div class="col-md-12">
              <div class="media">
                <label>Age(yrs)</label>
                <p>{getAge(driver?.DOB)}</p>
              </div>
              <div class="media">
                <label>City</label>
                <p>{driver?.City}</p>
              </div>
              <div class="media">
                <label>Country</label>
                <p>
                  {" "}
                  {driver?.Country
                    ? Country.getCountryByCode(driver?.Country).name
                    : driver?.Country}
                </p>
              </div>
              <Rating rating={driver?.Rating? driver?.Rating:1} caption=" "></Rating>
            </div>
          </div>
          <div class="px-4 mt-1">
            <p class="fonts"> </p>
          </div>
          <ul class="social-list">
            <li>
              <i class="fa fa-facebook"></i>
            </li>
            <li>
              <i class="fa fa-dribbble"></i>
            </li>
            <li>
              <i class="fa fa-instagram"></i>
            </li>
            <li>
              <i class="fa fa-linkedin"></i>
            </li>
            <li>
              <i class="fa fa-google"></i>
            </li>
          </ul>
          <div class="buttons">
            {" "}
          
            <Link
              className="btn btn-outline-primary px-4"
              to={`list-driver-detail/${driver.DriverId}/${driver.Vehicles[0]['VehicleId']}`}
              title=" "
            >
              <i class="feather icon-log-out"></i> Check It Out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverCard;
