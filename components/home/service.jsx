import React from "react";

function Service() {
  return (
    <div>
      <section id="services" class="space bg">
        <div class="container">
          <div class="row">
            <div class="service-block col-sm-4">
              <div class="inner">
                <div class="service-image">
                  <img
                    class="img-responsive"
                    src="images/featured-services-02.jpg"
                    alt="service"
                  />
                  <a href="#" class="hover center">
                    <i class="fa fa-link" aria-hidden="true"></i>
                  </a>
                </div>
                <div class="service-text">
                  <a href="#" target="_parent">
                    <h3 class="title">Get your Cargo Across</h3>
                  </a>
                  <p>
                    We connect you with reputable carriers for your cargo
                    deliveries...
                  </p>
                  <a
                    target="_parent"
                    href="single-services.html"
                    class="simple"
                  >
                    Read More<i class="fa fa-long-arrow-right"></i>{" "}
                  </a>
                </div>
              </div>
            </div>
            <div class="service-block col-sm-4">
              <div class="inner">
                <div class="service-image">
                  <img
                    class="img-responsive"
                    src="images/t3.jpg"
                    alt="service"
                  />
                  <a href="#" class="hover center">
                    <i class="fa fa-link" aria-hidden="true"></i>
                  </a>
                </div>
                <div class="service-text">
                  <a href="#" target="_parent">
                    <h3 class="title">Get the Load for your truck</h3>
                  </a>
                  <p>
                    Become that Carrier with access to our large datatbase of
                    request from clients
                  </p>
                  <a
                    target="_parent"
                    href="single-services.html"
                    class="simple"
                  >
                    Read More<i class="fa fa-long-arrow-right"></i>{" "}
                  </a>
                </div>
              </div>
            </div>
            <div class="service-block col-sm-4">
              <div class="inner">
                <div class="service-image">
                  <img
                    class="img-responsive"
                    src="images/img03.jpg"
                    alt="service"
                  />
                  <a href="#" class="hover center">
                    <i class="fa fa-link" aria-hidden="true"></i>
                  </a>
                </div>
                <div class="service-text">
                  <a href="#" target="_parent">
                    <h3 class="title">Safe Shipment Guaranteed</h3>
                  </a>
                  <p>
                    Seamless delievery experience with our vetted providers.
                  </p>
                  <a
                    target="_parent"
                    href="single-services.html"
                    class="simple"
                  >
                    Read More<i class="fa fa-long-arrow-right"></i>{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Service;
