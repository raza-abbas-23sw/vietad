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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Filter navData to show only specific categories
  const visibleNavData = useMemo(() => {
    const categoriesToShow = [
      'All Products',
      'Rigid Signs',
      'Banners & Displays', 
      'Decals & Magnets',
      'Office Signs',
      'Outdoor Signs'
      // Add or remove categories as needed
    ];
    return navData.filter(item => categoriesToShow.includes(item.title));
  }, [navData]);

  const activeCategory = useMemo(() => (
    activeIndex !== null ? visibleNavData[activeIndex] : null
  ), [activeIndex, visibleNavData]);

  const clearHoverTimeout = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  }, []);

  // Handle dropdown visibility with animation
  useEffect(() => {
    if (activeCategory && window.innerWidth >= 768) {
      setIsDropdownVisible(true);
    } else {
      // Delay hiding to allow exit animation
      const timer = setTimeout(() => setIsDropdownVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [activeCategory]);

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
      setActiveIndex(null);
      setIsClickOpen(false);
      setIsMobileMenuOpen(false);
      navigate('/products');
    } else {
      if (window.innerWidth < 768) {
        setIsClickOpen(true);
        setActiveIndex(prev => {
          if (prev === index) {
            setIsClickOpen(false);
            return null;
          }
          return index;
        });
      } else {
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
    navigate(`/products?product=${encodeURIComponent(product)}`);
    setActiveIndex(null);
    setIsClickOpen(false);
    setIsMobileMenuOpen(false);
  }, [navigate]);

  const handleViewAll = useCallback((category) => {
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
    if (isMobileMenuOpen) {
      setActiveIndex(null);
      setIsClickOpen(false);
    }
  }, [isMobileMenuOpen]);

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
      clearHoverTimeout();
    };
  }, [handleCloseDropdown, clearHoverTimeout]);

  useEffect(() => {
    handleCloseDropdown();
  }, [navigate, handleCloseDropdown]);

  return (
    <div ref={containerRef} className="relative bg-gradient-to-r from-cyan-100 to-red-200 z-49 font-sans antialiased">
      <nav className="bg-gradient-to-r from-cyan-100 to-red-100 sticky top-0 border-gray-200 w-full shadow-sm">
        <div className="container">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-between px-4 py-3">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-200 active:scale-95"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <X className={`w-5 h-5 text-gray-700 absolute inset-0 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
                }`} />
                <Menu className={`w-5 h-5 text-gray-700 absolute inset-0 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`} />
              </div>
            </button>
            <span className="text-sm font-medium text-gray-700 transition-colors duration-200">Categories</span>
            <div className="w-9"></div> {/* Spacer for centering */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-start justify-start px-4 w-full hide-horizontal-scroll">
            {visibleNavData.map((item, index) => (
              <div
                key={`nav-${item.title}`}
                className="relative py-3 flex-shrink-0"
                onMouseLeave={handleMouseLeave}
              >
                {index === 0 ? (
                  <Link
                    to="/products"
                    className={`whitespace-nowrap focus:outline-none block group transition-all duration-200 ${
                      activeIndex === index ? 'border-t-2 border-cyan-600' : ''
                    }`}
                    onClick={() => handleBarClick(index)}
                  >
                    <div className="flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-white/50 group-hover:shadow-md group-hover:scale-105">
                      <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <button
                    className={`whitespace-nowrap focus:outline-none group transition-all duration-200 ${
                      activeIndex === index ? 'scale-105' : ''
                    }`}
                    onClick={() => handleBarClick(index)}
                    aria-expanded={activeIndex === index}
                  >
                    <div className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 border ${
                      activeIndex === index 
                        ? 'bg-white shadow-md border-cyan-200' 
                        : 'border-transparent group-hover:bg-white/50 group-hover:shadow-sm group-hover:border-gray-200'
                    }`}>
                      <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                        {item.title} 
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-all duration-300 ${
                        activeIndex === index 
                          ? 'rotate-180 text-gray-500' 
                          : 'group-hover:text-gray-500 group-hover:translate-y-0.5'
                      }`} />
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden bg-white border-t border-gray-200 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-4 py-2 space-y-1 overflow-y-auto" style={{ maxHeight: '70vh' }}>
              {visibleNavData.map((item, index) => (
                <div key={`mobile-nav-${item.title}`} className="border-b border-gray-100 last:border-b-0">
                  {index === 0 ? (
                    <Link
                      to="/products"
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200 hover:pl-5"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleBarClick(index);
                      }}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <button
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium flex items-center justify-between transition-all duration-200 hover:pl-5"
                      onClick={() => handleBarClick(index)}
                    >
                      <span>{item.title}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        activeIndex === index ? 'rotate-180' : ''
                      }`} />
                    </button>
                  )}
                  
                  {/* Mobile Dropdown Content with Slide Animation */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeIndex === index && activeCategory 
                      ? 'max-h-[1000px] opacity-100 my-2' 
                      : 'max-h-0 opacity-0 my-0'
                  }`}>
                    {activeIndex === index && activeCategory && (
                      <div className="ml-4 pl-4 border-l-2 border-cyan-200 bg-gray-50 rounded-r-lg">
                        <div className="py-3">
                          <p className="text-sm text-gray-600 mb-3 px-2 animate-fade-in">
                            {activeCategory.description}
                          </p>
                          
                          {activeCategory.categories && activeCategory.categories.length > 0 ? (
                            <div className="space-y-4">
                              {activeCategory.categories.map((cat, catIndex) => (
                                <div 
                                  key={cat.title} 
                                  className="min-w-0 animate-slide-in-left"
                                  style={{ animationDelay: `${catIndex * 50}ms` }}
                                >
                                  <div className="font-semibold text-gray-900 text-sm border-b border-gray-200 pb-1 px-2">
                                    {cat.title}
                                  </div>
                                  <ul className="space-y-1 mt-1">
                                    {cat.products.map((product, productIndex) => (
                                      <li 
                                        key={product}
                                        style={{ animationDelay: `${(catIndex * 50) + (productIndex * 30)}ms` }}
                                        className="animate-fade-in"
                                      >
                                        <button
                                          onClick={() => handleProductClick(cat.title, product)}
                                          className="w-full text-left text-gray-700 hover:text-cyan-600 transition-all duration-200 py-2 px-3 rounded-md hover:bg-white hover:shadow-sm hover:translate-x-1 text-sm font-medium"
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
                              {activeCategory.items.map((product, idx) => (
                                <li 
                                  key={product}
                                  className="animate-fade-in"
                                  style={{ animationDelay: `${idx * 30}ms` }}
                                >
                                  <button
                                    onClick={() => handleProductClick(activeCategory.title, product)}
                                    className="w-full text-left text-gray-700 hover:text-cyan-600 transition-all duration-200 py-2 px-3 rounded-md hover:bg-white hover:shadow-sm hover:translate-x-1 text-sm font-medium"
                                  >
                                    {product}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="text-center text-gray-500 py-4 px-2 animate-fade-in">
                              <div className="text-sm font-medium">No products found</div>
                            </div>
                          )}

                          <div className="mt-4 pt-3 border-t border-gray-200">
                            <button 
                              className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm transition-all duration-200 w-full text-left py-2 px-2 hover:translate-x-1 flex items-center gap-1"
                              onClick={() => handleViewAll(activeCategory.title)}
                            >
                              View all {activeCategory.title.toLowerCase()}
                              <ChevronDown className="w-4 h-4 -rotate-90 transition-transform duration-200 group-hover:translate-x-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Dropdown with Enhanced Transitions */}
      {isDropdownVisible && (
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-200 transition-all duration-300 ease-out ${
            activeCategory && window.innerWidth >= 768
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
          onMouseLeave={handleMouseLeave}
        >
          {activeCategory && (
            <div className="container mx-auto px-4 md:px-8 py-6">
              <div className="mb-6 animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {activeCategory.title} 
                  {isClickOpen && (
                    <button
                      onClick={handleCloseDropdown}
                      className="ml-auto text-gray-400 hover:text-gray-600 transition-all duration-200 p-1 rounded hover:bg-gray-100 hover:rotate-180"
                      aria-label="Close dropdown"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </h3>
                <p className="text-gray-600 text-base mt-2 max-w-3xl transition-opacity duration-300">
                  {activeCategory.description}
                </p>
              </div>

              <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                {activeCategory.categories && activeCategory.categories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {activeCategory.categories.map((cat, catIndex) => (
                      <div 
                        key={cat.title} 
                        className="min-w-0 animate-slide-up"
                        style={{ animationDelay: `${catIndex * 50}ms` }}
                      >
                        <div className="font-semibold text-gray-900 text-lg border-b border-gray-200 pb-2 transition-colors duration-200 hover:border-cyan-400">
                          {cat.title} 
                        </div>
                        <ul className="space-y-0">
                          {cat.products.map((product, productIndex) => (
                            <li 
                              key={product}
                              style={{ animationDelay: `${(catIndex * 50) + (productIndex * 20)}ms` }}
                              className="animate-fade-in"
                            >
                              <button
                                onClick={() => handleProductClick(cat.title, product)}
                                className="w-full text-left text-gray-700 hover:text-cyan-600 transition-all duration-200 py-1 px-2 rounded-md hover:bg-cyan-50 hover:shadow-sm hover:translate-x-1 text-sm font-medium"
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
                    {activeCategory.items.map((product, idx) => (
                      <div 
                        key={product}
                        className="animate-slide-up"
                        style={{ animationDelay: `${idx * 30}ms` }}
                      >
                        <button
                          onClick={() => handleProductClick(activeCategory.title, product)}
                          className="w-full text-left text-gray-700 hover:text-cyan-600 transition-all duration-200 py-2 px-3 rounded-md hover:bg-cyan-50 hover:shadow-md hover:scale-105 text-sm font-medium border border-transparent hover:border-cyan-200"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && handleProductClick(activeCategory.title, product)}
                        >
                          {product}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="col-span-full text-center text-gray-500 py-12 animate-fade-in">
                    <div className="text-lg font-medium">No products found in this category.</div>
                    <p className="text-sm mt-1">Please check back later for updates.</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center animate-fade-in">
                <button 
                  className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm transition-all duration-200 flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-cyan-50 hover:shadow-md hover:scale-105"
                  onClick={() => handleViewAll(activeCategory.title)}
                >
                  View all {activeCategory.title.toLowerCase()} 
                  <ChevronDown className="w-4 h-4 -rotate-90 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                
                {isClickOpen && (
                  <button
                    onClick={handleCloseDropdown}
                    className="text-gray-500 hover:text-gray-700 font-medium text-sm transition-all duration-200 px-4 py-2 rounded-lg hover:bg-gray-100 hover:shadow-sm"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownContainer;