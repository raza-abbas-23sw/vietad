import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import logo from "../../assets/logos/sm_nav_logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-gray-300 py-12 px-4 sm:px-6 lg:px-8  mt-10">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {/* Brand Info */}
          <div className="lg:col-span-1 lg:flex flex-col items-center justify-center">
            <Link to="/">
              <div className="flex items-center gap-4 mb-4 cursor-pointer">
                <img src={logo} alt="logo" className="w-10" />
                <h1 className="text-xl font-bold text-white">
                  SQUARE <br /> SIGNS
                </h1>
              </div>
            </Link>
            <p className="mb-6 text-sm">
              © 2025 Square Signs LLC
              <br />
              All rights reserved.
            </p>
          </div>

          {/* Pages */}
          <div className="">
            <h3 className="text-white font-semibold mb-4">Pages</h3>
            <div className="grid grid-cols-2 gap-x-8">
              <ul className="space-y-2 text-sm">
                {[
                  "Products",
                  "Templates",
                  "Design Tool",
                  "Blog",
                  "Sitemap",
                  "FAQ",
                ].map((item) => (
                  <li
                    key={item}
                    className="transition-transform hover:translate-x-2"
                  >
                    <Link to="#" className="hover:text-white">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2 text-sm">
                {[
                  "Corporate Offers",
                  "Refer a Friend",
                  "Affiliate Program",
                  "About Us",
                  "Contact Us",
                  "Terms & Policies",
                ].map((item) => (
                  <li
                    key={item}
                    className="transition-transform hover:translate-x-2"
                  >
                    <Link to="#" className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="">
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">We accept</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-800 px-3 py-1 rounded">VISA</span>
                <span className="bg-gray-800 px-3 py-1 rounded">AMEX</span>
                <span className="bg-gray-800 px-3 py-1 rounded">PAYPAL</span>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">Trust matters</h3>
              <div className="flex flex-wrap gap-2">
                {["SECURE", "BRAINTREE", "NORTON", "TRUSTPILOT"].map((item) => (
                  <span
                    key={item}
                    className="bg-gray-800 px-2 py-1 rounded text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6  lg:flex  flex-col items-center">
            {/* Contacts */}
            <div className="">
              <h3 className="text-white font-semibold mb-3">Contacts</h3>
              <address className="not-italic">
                <p>
                  3520 Valinaire Dr.
                  <br />
                  Durbank, CA 91566-1126
                </p>
                <p className="mt-2">+1 (844) 833-4455</p>
                <p className="mt-2">support@squaresigns.com</p>
              </address>

              <div className="">
                <h3 className="text-white font-semibold mb-3">We are social</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="hover:text-white transition-colors"
                  >
                    <FaFacebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="hover:text-white transition-colors"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="hover:text-white transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="hover:text-white transition-colors"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
