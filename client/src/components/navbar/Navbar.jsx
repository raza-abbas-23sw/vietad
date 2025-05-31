import React, { useState } from "react";
import { Search, ChevronDown, ShoppingCart, User, Menu } from "lucide-react";

import SignupModal from "../Modals/SignupModel";
import SignInModal from "../Modals/SigninModel";

import logo from "../../assets/logos/nav_logo.svg";
import smLogo from "../../assets/logos/sm_nav_logo.svg";
import DropdownContainer from './DropdownContainer';
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);

  return (
    <div className="w-full shadow-md f bg-white">
      {/* Top Bar */}
      <div className="flex  items-center justify-between px-4 py-5 border-b">
        {/* Logos  */}
        <div className="flex gap-4">
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu />
          </button>
          <img src={logo} alt="Logo" className="hidden lg:block h-12" />
          <img src={smLogo} alt="Logo" className=" lg:hidden h-12" />
        </div>
        {/* Search bar  */}
        <div className="hidden md:flex items-center md:border border-gray-300 rounded-full px-2 w-fit md:w-[35rem] lg:w-[20rem] xl:w-[35rem] focus-within:outline focus-within:outline-1 focus-within:outline-blue-300">
          <input
            type="text"
            placeholder="Search for products or templates"
            className="hidden md:block flex-grow px-2 py-2 text-sm outline-none rounded-full  "
          />
          <button type="submit" className="p-2  text-gray-800">
            <Search className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-6">
          {/* design tool button */}
          <button className="hidden lg:block border border-green-500 text-green-500 px-3 py-2 font-semibold cursor-pointer hover:bg-green-50 transition-colors rounded-full text-sm">
            Design Tool
          </button>
          {/* Mobile search icon */}
          <button className="block md:hidden p-2 text-gray-800">
            <Search className="w-5 h-5" />
          </button>
          {/* cart button   */}
          <div className="flex gap-1 hover:text-blue-400 cursor-pointer">
            <div className="relative w-7 h-7 flex items-center ">
              <ShoppingCart className="w-5 h-5" />
              <div className="absolute text-xs text-center text-white top-0 right-0 w-4 h-4 rounded-full bg-blue-400">
                0
              </div>
            </div>
            <div className="hidden lg:block">Cart</div>
          </div>
          <div
            className="relative"
            onMouseEnter={() => setAccountDropdownOpen(true)}
            onMouseLeave={() => setAccountDropdownOpen(false)}
          >
            <div className="flex gap-1 items-center hover:text-blue-400 cursor-pointer">
              <User className="w-5 h-5" />
              <div className="hidden lg:block">My Account</div>
              <ChevronDown className={accountDropdownOpen && "rotate-180"} />
            </div>

            {accountDropdownOpen && (
              <div className="absolute right-0 top-full text-start  w-40 bg-white rounded shadow-lg z-50">
                <div 
                  onClick={() => setShowSignupModal(true)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Sign Up
                </div>
                <div
                  onClick={() => setShowSigninModal(true)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Sign In
                </div>
                <div className="flex items-center gap-2  px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <div>My Designs</div>
                  <div className=" text-xs text-center text-white top right-0 w-4 h-4 rounded-full bg-blue-400">
                    0
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Render modals if state is true */}
      {showSignupModal && (
        <SignupModal open={showSignupModal} onClose={() => setShowSignupModal(false)} />
      )}
      {showSigninModal && (
        <SignInModal open={showSigninModal} onClose={() => setShowSigninModal(false)} />
      )}
      <DropdownContainer />

    </div>
  );
};

export default Navbar;
