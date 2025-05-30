import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownBar from './DropdownBar';
import { navData } from './data/dropdownData';
import './drop.css';

const DropdownContainer = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const dropdownTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Memoize active category data (skip index 0 - "All Products")
  const activeCategory = useMemo(() => (
    activeIndex !== null && activeIndex !== 0 ? navData[activeIndex] : null
  ), [activeIndex]);

  const clearHoverTimeout = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback((index) => {
    if (index === 0) return; // Skip hover for "All Products"
    clearHoverTimeout();
    setActiveIndex(index);
  }, [clearHoverTimeout]);

  const handleMouseLeave = useCallback(() => {
    clearHoverTimeout();
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveIndex(null);
    }, 300);
  }, [clearHoverTimeout]);

  const handleBarClick = useCallback((index) => {
    if (index === 0) {
      setActiveIndex(null); // Close dropdowns
      navigate(navData[0].link); // Navigate to "/products"
      return;
    }
    setActiveIndex(prev => prev === index ? null : index);
  }, [navigate]);

  // Handle product click - navigate to product detail page
  const handleProductClick = useCallback((category, product) => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    const productSlug = product.toLowerCase().replace(/\s+/g, '-');
    navigate(`/products/${categorySlug}/${productSlug}`);
    setActiveIndex(null); // Close dropdown
  }, [navigate]);

  // Handle "View all" click - navigate to category page
  const handleViewAll = useCallback((category) => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    navigate(`/products/${categorySlug}`);
    setActiveIndex(null); // Close dropdown
  }, [navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative z-40 font-sans antialiased" onMouseLeave={handleMouseLeave}>
      {/* Navigation Bar */}
      <nav className="bg-white sticky top-0 border-b border-gray-200 w-full">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between md:justify-start w-full overflow-x-auto hide-horizontal-scroll">
            {navData.map((item, index) => (
              <div
                key={`nav-${item.title}`}
                className="relative px-2 py-3 flex-shrink-0"
                onMouseEnter={() => handleMouseEnter(index)}
              >
                {index === 0 ? (
                  <a
                    href={item.link}
                    className="whitespace-nowrap focus:outline-none block"
                    onClick={(e) => {
                      e.preventDefault();
                      handleBarClick(index);
                    }}
                  >
                    <DropdownBar title={item.title} isActive={false} />
                  </a>
                ) : (
                  <button
                    className="whitespace-nowrap focus:outline-none"
                    onClick={() => handleBarClick(index)}
                    aria-expanded={activeIndex === index}
                  >
                    <DropdownBar 
                      title={item.title} 
                      isActive={activeIndex === index} 
                    />
                  </button>
                )}
                {index !== 0 && (
                  <div 
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00ABA7] to-green-500 transition-opacity duration-300 ${
                      activeIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Dropdown Panel */}
      {activeCategory && (
        <div
          className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200"
          onMouseEnter={() => handleMouseEnter(activeIndex)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container mx-auto px-4 md:px-8 py-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {activeCategory.title}
              </h3>
              <p className="text-gray-500 mt-1">
                {activeCategory.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-4">
              {activeCategory.items.map((product) => (
                <div
                  key={product}
                  onClick={() => handleProductClick(activeCategory.title, product)}
                  className="group cursor-pointer py-2"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && 
                    handleProductClick(activeCategory.title, product)}
                >
                  <div className="relative">
                    <span className="text-gray-700 group-hover:text-[#00ABA7] transition-colors">
                      {product}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#00ABA7] to-green-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button 
                className="text-[#00ABA7] hover:text-green-600 font-medium text-sm"
                onClick={() => handleViewAll(activeCategory.title)}
              >
                View all {activeCategory.title.toLowerCase()} →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownContainer;