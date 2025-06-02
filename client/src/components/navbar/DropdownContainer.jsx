import { useState, useCallback, useMemo, useRef, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DropdownBar from './DropdownBar';
import { AppContext } from '../../context/AppContext';
import './drop.css';

const DropdownContainer = () => {
  const { navData } = useContext(AppContext);
  const [activeIndex, setActiveIndex] = useState(null);
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
    if (index !== 0) {
      clearHoverTimeout();
      setActiveIndex(index);
    }
  }, [clearHoverTimeout]);

  const handleMouseLeave = useCallback(() => {
    clearHoverTimeout();
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveIndex(null);
    }, 300);
  }, [clearHoverTimeout]);

  const handleBarClick = useCallback((index) => {
    if (index === 0) {
      setActiveIndex(null);
    } else {
      setActiveIndex(prev => prev === index ? null : index);
    }
  }, []);

  const handleProductClick = useCallback((category, product) => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    const productSlug = product.toLowerCase().replace(/\s+/g, '-');
    navigate(`/products/${categorySlug}/${productSlug}`);
    setActiveIndex(null);
  }, [navigate]);

  const handleViewAll = useCallback((category) => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    navigate(`/products/${categorySlug}`);
    setActiveIndex(null);
  }, [navigate]);

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
      <nav className="bg-gradient-to-r from-cyan-50 to-red-50 sticky top-0 border-gray-200 w-full">
        <div className="container">
          <div className="flex items-start justify-start px-4 w-full hide-horizontal-scroll">
            {navData.map((item, index) => (
              <div
                key={`nav-${item.title}`}
                className="relative py-3 flex-shrink-0"
                onMouseEnter={() => handleMouseEnter(index)}
              >
                {index === 0 ? (
                  <Link
                    to="/products"
                    className={`whitespace-nowrap focus:outline-none block ${activeIndex === index ? 'border-t-2 border-cyan-600' : ''}`}
                    onClick={() => handleBarClick(index)}
                  >
                    <DropdownBar 
                      title={item.title} 
                      isActive={activeIndex === index}
                      link="/products"
                    />
                  </Link>
                ) : (
                  <button
                    className={`whitespace-nowrap focus:outline-none ${activeIndex === index ? 'border-t-2 border-cyan-600' : ''}`}
                    onClick={() => handleBarClick(index)}
                    aria-expanded={activeIndex === index}
                  >
                    <DropdownBar 
                      title={item.title} 
                      isActive={activeIndex === index}
                      link={`/products/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {activeCategory && (
        <div
          className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200"
          onMouseEnter={() => handleMouseEnter(activeIndex)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container mx-auto px-4 md:px-8 py-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {activeCategory.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {activeCategory.description}
              </p>
            </div>

            <div className="max-h-[50vh] overflow-y-auto">
              {activeCategory.categories && activeCategory.categories.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {activeCategory.categories.map((cat) => (
                    <div key={cat.title} className="min-w-0">
                      <div className="font-semibold text-gray-800 mb-2 text-sm">{cat.title}</div>
                      <ul className="space-y-1">
                        {cat.products.map((product) => (
                          <li
                            key={product}
                            onClick={() => handleProductClick(cat.title, product)}
                            className="cursor-pointer hover:text-cyan-600 transition-colors text-xs"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && handleProductClick(cat.title, product)}
                          >
                            {product}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : activeCategory.items && activeCategory.items.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <div className="min-w-0">
                    <ul className="space-y-1">
                      {activeCategory.items.map((product) => (
                        <li
                          key={product}
                          onClick={() => handleProductClick(activeCategory.title, product)}
                          className="cursor-pointer hover:text-cyan-600 transition-colors text-xs"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && handleProductClick(activeCategory.title, product)}
                        >
                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="col-span-full text-center text-gray-500 py-8">
                  No products found in this category.
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <button 
                className="text-cyan-600 hover:text-red-600 font-medium text-xs transition-colors"
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