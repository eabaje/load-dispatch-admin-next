import React from "react";
import FooterUpper from "./footer-upper";
function Footer() {
  return (
    <>
      <FooterUpper />
      <footer id="sp-footer">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-sm-6 small">
              &copy; 2021 Load Dispatch Ltd. All Rights Reserved
            </div>

            <nav id="page-footer-legal-links" class="col-xs-12 col-sm-6">
              <ul class="list-inline small ">
                <li>
                  <a
                    href="/images/pdf/privacyPolicy.pdf?v=1.0"
                    class="color-gray"
                    target="_blank"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>|</li>
                <li>
                  <a href="/term" class="color-gray">
                    Terms of Use
                  </a>
                </li>
                <li>|</li>
                <li>
                  <a href="/contact" class="color-gray">
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
