import React from "react";
import { ConstantsList } from "../../constants";

function BreadCrumb(props) {
  const str = props.name;
  const newStr = `${str[0].toUpperCase()}${str.slice(1)}`;

  return (
    <div>
      <section id="breadcrumb" class="space">
        <div class="container">
          <div class="row">
            <div class="col-sm-6 breadcrumb-block">
              <h2>{newStr}</h2>
            </div>
            <div class="col-sm-6 breadcrumb-block text-right">
              <ol class="breadcrumb">
                <li>
                  <span>You are here:</span>
                  <a href="/">Home</a>
                </li>
                <li class="active">{props.name}</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BreadCrumb;
