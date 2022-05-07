import React from "react";

function FooterUpper() {
  return (
    <div>
      <section id="sp-bottom">
        <div class="container">
          <div class="row">
            <div class="col-lg-8" id="page-footer-nav-popout">
              <div class="row">
                <div class="col-xs-12 col-sm-6">
                  <a
                    href="#page-footer-nav-hdiw"
                    class="color-gray-medium clearfix collapse-toggle"
                    data-toggle="collapse"
                  >
                    <h4 class="text-uppercase pull-left sp-module-title">
                      How does it work?
                    </h4>
                    <i class="fa fa-chevron-down pull-right visible-xs"></i>
                  </a>

                  <ul id="page-footer-nav-hdiw" class="color-orange-dark ">
                    <li>
                      <a href="/carrier" class="color-gray-medium btn btn-link">
                        Carriers
                      </a>
                    </li>
                    <li>
                      <a href="/shipper" class="color-gray-medium btn btn-link">
                        Brokers
                      </a>
                    </li>
                    <li>
                      <a href="/shipper" class="color-gray-medium btn btn-link">
                        Dealers
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="col-xs-12 col-sm-6">
                  <a
                    href="#page-footer-nav-contacts"
                    class="color-gray-medium collapse-toggle clearfix"
                    data-toggle="collapse"
                  >
                    <h4 class="text-uppercase pull-left sp-module-title">
                      Contact Us
                    </h4>
                    <i class="fa fa-chevron-down pull-right visible-xs"></i>
                  </a>

                  <div id="page-footer-nav-contacts" class=" small">
                    <div class="clearfix">
                      <div class="pull-left info-group-icon fa fa-lg fa-map-marker"></div>
                      <div class="pull-left">
                        <address>
                          Load Dispatch Ltd
                          <br />
                          Loaddispatch.com
                          <br />
                          52A Ikorodu Road
                          <br />
                          Jibowu,Lagos
                        </address>
                      </div>
                    </div>

                    <div class="clearfix">
                      <div class="pull-left info-group-icon fa fa-lg fa-phone"></div>
                      <div class="pull-left">
                        <p>
                          <span class="color-gray-medium">Toll Free:</span>{" "}
                          <a class="color-white" href="tel:8009287869">
                            800-928-7869
                          </a>
                          <br />
                        </p>
                      </div>
                    </div>

                    <br />

                    <a href="/register" class="btn btn-default">
                      Try us out for 90-days at no-charge*!
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="page-footer-messaging"
              class="col-sm-8 col-md-6 col-lg-4 hidden-xs"
            >
              <div class="visible-lg">
                <p class="small message color-gray-medium">
                  LoadDispatch is the most cost-effective way to manage
                  transportation on your own.
                </p>

                <p class="small message color-gray-medium">
                  We’re not a shipping company, we’re a self-managed
                  transportation load board that matches shippers with our
                  network of professional auto carriers for inbound and outbound
                  transportation needs.
                </p>
              </div>

              <nav id="page-footer-social-media">
                <a
                  href="https://www.facebook.com/loadboard/"
                  class="color-gray-medium"
                  target="_blank"
                >
                  <span class="fa-stack fa-lg">
                    <i class="fa fa-stack-1x fa-facebook"></i>
                    <i class="fa fa-stack-2x fa-circle-thin"></i>
                  </span>
                </a>

                <a
                  href="https://twitter.com/loadboard"
                  class="color-gray-medium"
                  target="_blank"
                >
                  <span class="fa-stack fa-lg">
                    <i class="fa fa-stack-1x fa-twitter"></i>
                    <i class="fa fa-stack-2x fa-circle-thin"></i>
                  </span>
                </a>

                <a href="#" class="color-gray-medium" target="_blank">
                  <span class="fa-stack fa-lg">
                    <i class="fa fa-stack-1x fa-youtube"></i>
                    <i class="fa fa-stack-2x fa-circle-thin"></i>
                  </span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FooterUpper;
