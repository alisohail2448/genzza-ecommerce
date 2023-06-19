import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import newsletter from "../images/newsletter.png";
const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-10 align-items-center">
                <img src={newsletter} alt="newsletter" style={{width:"28px"}} />
                <h2 className="mb-0 text-white" style={{fontSize: "25px"}}>Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control footer-input py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4" style={{fontSize: "25px"}}>Contact Us</h4>
              <div>
                <address className="address fs-6">
                  Hno : Room No 4, <br /> Saban Pura, Amravati <br />
                  PinCode: 666406
                </address>
                <a
                  href="tel:+91 7249047105"
                  className="no mt-3 d-block mb-1"
                >
                  +91 7249047105
                </a>
                <a
                  href="mailto:alisohail2448@gmail.com"
                  className="mt-2 d-block mb-0 no"
                >
                  alisohail2448@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a className="no" href="#">
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a className="no" href="#">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="no" href="#">
                    <BsGithub className="fs-4" />
                  </a>
                  <a className="no" href="#">
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4" style={{fontSize: "25px"}}>Information</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="/privacy-policy" className="no py-2 mb-1">
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className="no py-2 mb-1">
                  Refund Policy
                </Link>
                <Link to="/shipping-policy" className="no py-2 mb-1">
                  Shipping Policy
                </Link>
                <Link to="/terms-conditions" className="no py-2 mb-1">
                  Terms & Conditions
                </Link>
                <Link to="/blogs" className="no py-2 mb-1">Blogs</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4" style={{fontSize: "25px"}}>Account</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="no py-2 mb-1">About Us</Link>
                <Link className="no py-2 mb-1">Faq</Link>
                <Link className="no py-2 mb-1">Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4" style={{fontSize: "25px"}}>Quick Links</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="no py-2 mb-1">Laptops</Link>
                <Link className="no py-2 mb-1">Headphones</Link>
                <Link className="no py-2 mb-1">Tablets</Link>
                <Link className="no py-2 mb-1">Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 no">
                &copy; {new Date().getFullYear()}; Powered by Genzza - By Sohail Ali
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;