import { useState, useCallback, useMemo, useRef, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DropdownBar from './DropdownBar';
import { AppContext } from '../../context/AppContext';
import './drop.css';

const DropdownContainer = () => {
  const { navData } = useContext(AppContext);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isClickOpen, setIsClickOpen] = useState(false);
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
    if (!isClickOpen) {
      clearHoverTimeout();
      setActiveIndex(index);
    }
  }, [clearHoverTimeout, isClickOpen]);

  const handleMouseLeave = useCallback(() => {
    if (!isClickOpen) {
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
      navigate('/products');
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
  }, [navigate]);

  const handleProductClick = useCallback((category, product) => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    const productSlug = product.toLowerCase().replace(/\s+/g, '-');
    navigate(`/products/${categorySlug}/${productSlug}`);
    setActiveIndex(null);
    setIsClickOpen(false);
  }, [navigate]);

  const handleViewAll = useCallback((category) => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    navigate(`/products/${categorySlug}`);
    setActiveIndex(null);
    setIsClickOpen(false);
  }, [navigate]);

  const handleCloseDropdown = useCallback(() => {
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

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleCloseDropdown]);

  // Close dropdown when route changes
  useEffect(() => {
    handleCloseDropdown();
  }, [navigate, handleCloseDropdown]);

  return (
    <div ref={containerRef} className="relative bg-cyan-50 z-40 font-sans antialiased" >
      <nav className="bg-cyan-50 sticky top-0 border-gray-200 w-full shadow-sm">
        <div className="container">
          <div className="flex items-start justify-start px-4 w-full hide-horizontal-scroll">
            {navData.map((item, index) => (
              <div
                key={`nav-${item.title}`}
                className="relative py-3 flex-shrink-0"
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
        </div>
      </nav>

      {activeCategory && (
        <div
          className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-200 animate-in fade-in-50 slide-in-from-top-2 duration-200"
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
                      <div className="font-semibold text-gray-900 mb-3 text-lg border-b border-gray-100 pb-2">
                        {cat.title}
                      </div>
                      <ul className="space-y-2">
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