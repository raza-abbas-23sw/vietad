import React, { useState, useContext } from "react";
import { Search, ChevronDown, ShoppingCart, User, Menu, Heart } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import SignupModal from "../Modals/SignupModel";
import SignInModal from "../Modals/SigninModel";

import logoPng from "../../assets/logos/logo.png";
import DropdownContainer from './DropdownContainer';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const { searchQuery, setSearchQuery, handleSearch, searchResults, isSearching } = useContext(AppContext);
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  const { currentUser, loading, logout } = useAuth();

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  return (
    <>
      <Sidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Main Navbar */}
      <div className="w-full shadow-md bg-cyan-50 z-50">
        <div className="container mx-auto px-4 bg-red-00">
          <div className="flex items-center justify-between py-4 border-b border-cyan-200">
            <div className="flex gap-1 items-center bg-green-00">
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu />
              </button>
              <Link to="/">
                <img src={logoPng} alt="Logo" className="hidden lg:block h-12 " />
                <img src={logoPng} alt="Logo" className="lg:hidden h-10" />
              </Link>
            </div>

            <div className="hidden md:flex items-center md:border border-cyan-300 rounded-full px-2 w-fit md:w-[35rem] lg:w-[25rem] xl:w-[35rem] focus-within:outline focus-within:outline-1 focus-within:outline-cyan-300 relative">
              <input
                type="text"
                placeholder="Search for products or templates"
                className="hidden md:block flex-grow px-2 py-2 text-sm outline-none rounded-full"
                value={searchQuery}
                onChange={onSearchChange}
                onFocus={() => {
                  if (searchQuery.length >= 2) {
                    handleSearch(searchQuery);
                  }
                }}
              />
              <button type="submit" className="p-2 cursor-pointer text-cyan-400">
                <Search className="w-4 h-4" />
              </button>

              {isSearching && searchQuery.length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-45">
                  Searching...
                </div>
              )}

              {searchResults.length > 0 && !isSearching && searchQuery.length >= 2 && document.activeElement.tagName !== 'INPUT' && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[400px] overflow-y-auto z-45">
                  {searchResults.map((result, index) => (
                    <div key={index} className="p-2 border-b last:border-b-0">
                      <h4 className="font-medium text-sm text-gray-700">{result.category}</h4>
                      <ul className="mt-1">
                        {result.products.map((product, pIndex) => (
                          <li key={pIndex} className="text-sm text-gray-600 hover:text-cyan-500 cursor-pointer py-1">
                            {product.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-6 bg-blue-40">
              <button className="hidden lg:block border border-red-500 text-red-500 px-3 py-2 font-semibold cursor-pointer hover:bg-red-50 transition-colors rounded-full text-sm">
                Design Tool
              </button>
              <button className="block md:hidden p-2 text-gray-800">
                <Search className="w-5 h-5" />
              </button>
              
              {/* Wishlist */}
              <Link to="/wishlist" className="flex gap-1 hover:text-cyan-400 cursor-pointer">
                <div className="relative w-7 h-7 flex items-center">
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <div className="absolute text-xs text-center text-white top-0 right-0 w-4 h-4 rounded-full bg-red-400">
                      {wishlistCount}
                    </div>
                  )}
                </div>
                <div className="hidden lg:block">Wishlist</div>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="flex gap-1 hover:text-cyan-400 cursor-pointer">
                <div className="relative w-7 h-7 flex items-center">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <div className="absolute text-xs text-center text-white top-0 right-0 w-4 h-4 rounded-full bg-red-400">
                      {cartCount}
                    </div>
                  )}
                </div>
                <div className="hidden lg:block">Cart</div>
              </Link>

              
            {loading ? (
              <p>loading ... </p>
            ) : (
              <div
                className="relative bg-red-00"
                onMouseEnter={() => setAccountDropdownOpen(true)}
                onMouseLeave={() => setAccountDropdownOpen(false)}
              >
                <div className="flex gap-1 items-center hover:text-cyan-400 cursor-pointer">
                  <User className="w-5 h-5" />
                  <div className="hidden lg:block">{currentUser ? currentUser.fullName || `My Profile` : `My Account`}</div>
                  <ChevronDown className={accountDropdownOpen && "rotate-180"} />
                </div>

                {accountDropdownOpen && (
                  <div className="absolute right-0 top-full text-start w-48 bg-white rounded shadow-lg z-50">
                    {currentUser ? (
                      <>
                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          My Profile
                        </Link>
                        <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          My Orders
                        </Link>
                        <button onClick={logout}
                          className="px-4 py-2 w-full hover:bg-gray-100 cursor-pointer text-red-500 text-left"
                        >
                          Log Out
                        </button>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                    <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <div>My Designs</div>
                      <div className="text-xs text-center text-white top right-0 w-4 h-4 rounded-full bg-red-400">
                        0
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            </div>

          </div>
        </div>
      </div>

      {/* Render modals if state is true */}
      {showSignupModal && (
        <SignupModal
          open={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onSwitchToSignin={() => {
            setShowSignupModal(false);
            setShowSigninModal(true);
          }}
        />
      )}
      {showSigninModal && (
        <SignInModal
          open={showSigninModal}
          onClose={() => setShowSigninModal(false)}
          onSwitchToSignup={() => {
            setShowSigninModal(false);
            setShowSignupModal(true);
          }}
        />
      )}
      
      {/* Only show DropdownContainer on desktop */}
      <div className="hidden md:block">
        <DropdownContainer />
      </div>
    </>
  );
};

export default Navbar;
