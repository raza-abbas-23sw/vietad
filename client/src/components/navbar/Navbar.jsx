import React, { useState, useContext, useRef, useEffect } from "react";
import { Search, ChevronDown, ShoppingCart, User, Menu, Heart, X } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
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
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const { searchQuery, setSearchQuery, handleSearch, searchResults, isSearching } = useContext(AppContext);
  const { wishlist } = useWishlist();
  const { cart, getCartCount } = useCart();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  
  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;
  const { currentUser, loading, logout } = useAuth();

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
    setShowSearchResults(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const handleSearchItemClick = (item, type) => {
    if (type === 'products') {
      navigate(`/product/${item.slug}`);
    } else if (type === 'templates') {
      navigate(`/design-tool?template=${item.id}`);
    }
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const executeSearch = () => {
    if (searchQuery.trim().length >= 2) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  return (
    <>
      <Sidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Main Navbar */}
      <div className="w-full shadow-md bg-gradient-to-r from-cyan-100 to-red-100 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4 border-b border-cyan-200">
            <div className="flex gap-1 items-center">
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu />
              </button>
              <Link to="/">
                <img src={logoPng} alt="Logo" className="hidden lg:block h-12" />
                <img src={logoPng} alt="Logo" className="lg:hidden h-10" />
              </Link>
            </div>

            {/* Search Bar */}
            <div 
              ref={searchRef}
              className="hidden md:flex items-center border border-cyan-300 rounded-full px-2 w-fit md:w-[35rem] lg:w-[25rem] xl:w-[35rem] focus-within:outline focus-within:outline-1 focus-within:outline-cyan-300 relative"
            >
              <input
                type="text"
                placeholder="Search for products or templates..."
                className="flex-grow px-2 py-2 text-sm outline-none rounded-full bg-transparent"
                value={searchQuery}
                onChange={onSearchChange}
                onKeyPress={handleKeyPress}
                onFocus={() => {
                  if (searchQuery.length >= 2) {
                    setShowSearchResults(true);
                  }
                }}
              />
              
              {searchQuery && (
                <button 
                  onClick={clearSearch}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              <button 
                onClick={executeSearch}
                className="p-2 cursor-pointer text-cyan-400 hover:text-cyan-600"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Search Results Dropdown */}
              {showSearchResults && searchQuery.length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
                  
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500 mx-auto"></div>
                      <p className="mt-2">Searching...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <>
                      {searchResults.map((resultGroup, index) => (
                        <div key={index} className="border-b last:border-b-0">
                          <div className="px-4 py-2 bg-gray-50 border-b">
                            <h4 className="font-semibold text-sm text-gray-700">
                              {resultGroup.title}
                              <span className="ml-2 text-xs text-gray-500">
                                ({resultGroup.items.length} found)
                              </span>
                            </h4>
                          </div>
                          
                          <div className="max-h-48 overflow-y-auto">
                            {resultGroup.items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="flex items-center gap-3 p-3 hover:bg-cyan-50 cursor-pointer border-b last:border-b-0"
                                onClick={() => handleSearchItemClick(item, resultGroup.type)}
                              >
                                <img 
                                  src={item.img} 
                                  alt={item.name}
                                  className="w-10 h-10 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm text-gray-800 truncate">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-gray-500 capitalize">
                                    {item.category}
                                  </p>
                                  {item.price && (
                                    <p className="text-xs font-semibold text-cyan-600">
                                      ${item.price}
                                    </p>
                                  )}
                                </div>
                                <div className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                                  {resultGroup.type === 'products' ? 'Product' : 'Template'}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      {/* View All Results */}
                     
                    </>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p>No results found for "{searchQuery}"</p>
                      <p className="text-sm mt-1">Try different keywords</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-6">
              <Link 
                to="/design-tool" 
                className="hidden lg:block border border-red-500 text-red-500 px-3 py-2 font-semibold cursor-pointer hover:bg-red-50 transition-colors rounded-full text-sm"
              >
                Design Tool
              </Link>
              
           
              
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

              {/* Account */}
              {loading ? (
                <p className="text-sm">Loading...</p>
              ) : (
                <div
                  className="relative"
                  onMouseEnter={() => setAccountDropdownOpen(true)}
                  onMouseLeave={() => setAccountDropdownOpen(false)}
                >
                  <div className=" flex gap-1 items-center hover:text-cyan-400 cursor-pointer">
                    <User className="w-5 h-5" />
                    <div className="hidden lg:block">
                      {currentUser ? currentUser.fullName || `My Profile` : `My Account`}
                    </div>
                    <ChevronDown className={accountDropdownOpen ? "rotate-180" : ""} />
                  </div>

                  {accountDropdownOpen && (
                    <div className=" bg-gradient-to-r from-cyan-100 to-red-100 absolute right-0 top-full text-start w-48 bg-white rounded-lg shadow-lg z-51">
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
                        <div className="text-xs text-center text-white w-4 h-4 rounded-full bg-red-400">
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

      {/* Render modals */}
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