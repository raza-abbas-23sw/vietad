import { useState, useCallback, useMemo, useRef, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import DropdownBar from './DropdownBar';
import { AppContext } from '../../context/AppContext';
import './drop.css';

const DropdownContainer = () => {
  const { navData } = useContext(AppContext);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isClickOpen, setIsClickOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const activeCategory = useMemo(() => (
    activeIndex !== null ? navData[activeIndex] : null
  ), [activeIndex, navData]);

  const clearHoverTimeout = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback((index) => {
    if (!isClickOpen && window.innerWidth >= 768) {
      clearHoverTimeout();
      setActiveIndex(index);
    }
  }, [clearHoverTimeout, isClickOpen]);

  const handleMouseLeave = useCallback(() => {
    if (!isClickOpen && window.innerWidth >= 768) {
      clearHoverTimeout();
      dropdownTimeoutRef.current = setTimeout(() => {
        setActiveIndex(null);
      }, 300);
    }
  }, [clearHoverTimeout, isClickOpen]);

  const handleBarClick = useCallback((index) => {
    if (index === 0) {
      // For "All Products", navigate directly
      setActiveIndex(null);
      setIsClickOpen(false);
      setIsMobileMenuOpen(false);
      navigate('/products');
    } else {
      if (window.innerWidth < 768) {
        // Mobile behavior - toggle the dropdown
        setIsClickOpen(true);
        setActiveIndex(prev => {
          if (prev === index) {
            setIsClickOpen(false);
            return null;
          }
          return index;
        });
      } else {
        // Desktop behavior
        setIsClickOpen(true);
        setActiveIndex(prev => {
          if (prev === index) {
            setIsClickOpen(false);
            return null;
          }
          return index;
        });
      }
    }
  }, [navigate]);

  const handleProductClick = useCallback((category, product) => {
    // Navigate to main products page with product as parameter
    navigate(`/products?product=${encodeURIComponent(product)}`);
    setActiveIndex(null);
    setIsClickOpen(false);
    setIsMobileMenuOpen(false);
  }, [navigate]);

  const handleViewAll = useCallback((category) => {
    // Navigate to products page with category filter
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    navigate(`/products?category=${categorySlug}`);
    setActiveIndex(null);
    setIsClickOpen(false);
    setIsMobileMenuOpen(false);
  }, [navigate]);

  const handleCloseDropdown = useCallback(() => {
    setActiveIndex(null);
    setIsClickOpen(false);
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
    setActiveIndex(null);
    setIsClickOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        handleCloseDropdown();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        handleCloseDropdown();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      } else {
        setActiveIndex(null);
        setIsClickOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleCloseDropdown]);

  // Close dropdown when route changes
  useEffect(() => {
    handleCloseDropdown();
  }, [navigate, handleCloseDropdown]);

  return (
    <div ref={containerRef} className="relative bg-gradient-to-r from-cyan-100 to-red-100 z-40 font-sans antialiased">
      <nav className="bg-gradient-to-r from-cyan-100 to-red-100 sticky top-0 border-gray-200 w-full shadow-sm">
        <div className="container">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-between px-4 py-3">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-white shadow-sm border border-gray-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <span className="text-sm font-medium text-gray-700">Categories</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-start justify-start px-4 w-full hide-horizontal-scroll">
            {navData.map((item, index) => (
              <div
                key={`nav-${item.title}`}
                className="relative py-3 flex-shrink-0"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {index === 0 ? (
                  <Link
                    to="/products"
                    className={`whitespace-nowrap focus:outline-none block group ${
                      activeIndex === index ? 'border-t-2 border-cyan-600' : ''
                    }`}
                    onClick={() => handleBarClick(index)}
                  >
                    <div className="flex items-center gap-1 px-3 py-2 rounded-lg transition-colors duration-200 group-hover:bg-white group-hover:shadow-sm">
                      <span className="font-medium text-gray-700 group-hover:text-gray-900">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <button
                    className={`whitespace-nowrap focus:outline-none group ${
                      activeIndex === index ? 'border-t-2 border-cyan-600' : ''
                    }`}
                    onClick={() => handleBarClick(index)}
                    aria-expanded={activeIndex === index}
                  >
                    <div className="flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-gray-200">
                      <span className="font-medium text-gray-700 group-hover:text-gray-900">
                        {item.title} 
                      </span>
                      {activeIndex === index ? (
                        <ChevronUp className="w-4 h-4 text-gray-500 transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:text-gray-500" />
                      )}
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
              <div className="px-4 py-2 space-y-1 max-h-[70vh] overflow-y-auto">
                {navData.map((item, index) => (
                  <div key={`mobile-nav-${item.title}`} className="border-b border-gray-100 last:border-b-0">
                    {index === 0 ? (
                      <Link
                        to="/products"
                        className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleBarClick(index);
                        }}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <button
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium flex items-center justify-between"
                        onClick={() => handleBarClick(index)}
                      >
                        <span>{item.title}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                    
                    {/* Mobile Dropdown Content */}
                    {activeIndex === index && activeCategory && (
                      <div className="ml-4 pl-4 border-l-2 border-cyan-200 bg-gray-50 rounded-r-lg my-2">
                        <div className="py-3">
                          <p className="text-sm text-gray-600 mb-3 px-2">
                            {activeCategory.description}
                          </p>
                          
                          {activeCategory.categories && activeCategory.categories.length > 0 ? (
                            <div className="space-y-4">
                              {activeCategory.categories.map((cat) => (
                                <div key={cat.title} className="min-w-0">
                                  <div className="font-semibold text-gray-900 text-sm border-b border-gray-200 pb-1 px-2">
                                    {cat.title}
                                  </div>
                                  <ul className="space-y-1 mt-1">
                                    {cat.products.map((product) => (
                                      <li key={product}>
                                        <button
                                          onClick={() => handleProductClick(cat.title, product)}
                                          className="w-full text-left text-gray-700 hover:text-cyan-600 transition-colors duration-200 py-2 px-3 rounded-md hover:bg-white text-sm font-medium"
                                        >
                                          {product}
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ) : activeCategory.items && activeCategory.items.length > 0 ? (
                            <ul className="space-y-1">
                              {activeCategory.items.map((product) => (
                                <li key={product}>
                                  <button
                                    onClick={() => handleProductClick(activeCategory.title, product)}
                                    className="w-full text-left text-gray-700 hover:text-cyan-600 transition-colors duration-200 py-2 px-3 rounded-md hover:bg-white text-sm font-medium"
                                  >
                                    {product}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="text-center text-gray-500 py-4 px-2">
                              <div className="text-sm font-medium">No products found</div>
                            </div>
                          )}

                          <div className="mt-4 pt-3 border-t border-gray-200">
                            <button 
                              className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm transition-colors duration-200 w-full text-left py-2 px-2"
                              onClick={() => handleViewAll(activeCategory.title)}
                            >
                              View all {activeCategory.title.toLowerCase()}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Desktop Dropdown */}
      {activeCategory && window.innerWidth >= 768 && (
        <div
          className="absolute top-full left-0 w-full bg-cyan-50 shadow-xl border-t border-gray-200 animate-in fade-in-50 slide-in-from-top-2 duration-200"
          onMouseEnter={() => handleMouseEnter(activeIndex)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container mx-auto px-4 md:px-8 py-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                {activeCategory.title} 
                {isClickOpen && (
                  <button
                    onClick={handleCloseDropdown}
                    className="ml-auto text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
                    aria-label="Close dropdown"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                )}
              </h3>
              <p className="text-gray-600 text-base mt-2 max-w-3xl">
                {activeCategory.description}
              </p>
            </div>

            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
              {activeCategory.categories && activeCategory.categories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {activeCategory.categories.map((cat) => (
                    <div key={cat.title} className="min-w-0">
                      <div className="font-semibold text-gray-900 text-lg border-b border-gray-100 pb-2">
                        {cat.title} 
                      </div>
                      <ul className="space-y-0">
                        {cat.products.map((product) => (
                          <li key={product}>
                            <button
                              onClick={() => handleProductClick(cat.title, product)}
                              className="w-full text-left text-gray-700 hover:text-cyan-600 transition-colors duration-200 py-1 px-2 rounded-md hover:bg-gray-50 text-sm font-medium"
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => e.key === 'Enter' && handleProductClick(cat.title, product)}
                            >
                              {product}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : activeCategory.items && activeCategory.items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="min-w-0">
                    <ul className="space-y-2">
                      {activeCategory.items.map((product) => (
                        <li key={product}>
                          <button
                            onClick={() => handleProductClick(activeCategory.title, product)}
                            className="w-full text-left text-gray-700 hover:text-cyan-600 transition-colors duration-200 py-2 px-3 rounded-md hover:bg-gray-50 text-sm font-medium border border-transparent hover:border-gray-200"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && handleProductClick(activeCategory.title, product)}
                          >
                            {product}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="col-span-full text-center text-gray-500 py-12">
                  <div className="text-lg font-medium">No products found in this category.</div>
                  <p className="text-sm mt-1">Please check back later for updates.</p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
              <button 
                className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm transition-colors duration-200 flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-cyan-50"
                onClick={() => handleViewAll(activeCategory.title)}
              >
                View all {activeCategory.title.toLowerCase()} 
                <ChevronDown className="w-4 h-4 transform rotate-270" />
              </button>
              
              {isClickOpen && (
                <button
                  onClick={handleCloseDropdown}
                  className="text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownContainer;