import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import productsData from '../../assets/New Trend/trendproduct';
import './home.css';

const TrendySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // Default to 3 products
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + productsData.length) % productsData.length
    );
  };

  const getVisibleProducts = () => {
    const visibleProducts = [];
    const totalProducts = productsData.length;
    
    // Calculate how many products we need on each side
    const sideCount = Math.floor((visibleCount - 1) / 2);
    
    // Add products before the current index
    for (let i = sideCount; i > 0; i--) {
      const index = (currentIndex - i + totalProducts) % totalProducts;
      visibleProducts.push(productsData[index]);
    }
    
    // Add current product
    visibleProducts.push(productsData[currentIndex]);
    
    // Add products after the current index
    for (let i = 1; i <= sideCount; i++) {
      const index = (currentIndex + i) % totalProducts;
      visibleProducts.push(productsData[index]);
    }
    
    // If visibleCount is even, we might need one more product
    if (visibleCount % 2 === 0) {
      const index = (currentIndex + sideCount + 1) % totalProducts;
      visibleProducts.push(productsData[index]);
    }
    
    return visibleProducts;
  };

  const visibleProducts = getVisibleProducts();

  const handleProductClick = (product) => {
    const category = product.category === 'new' ? 'new-arrivals' : 'trending';
    navigate(`/products/${category}`);
  };

  // Calculate dynamic height based on number of products
  const sliderHeight = visibleCount === 1 ? '420px' : 
                      visibleCount === 2 ? '380px' : '420px';

  return (
    <section className="py-12 px-4 bg-gray-50 my-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">What's New & Trendy</h2>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Navigation Arrows - only show if there are more products than visible */}
        {productsData.length > visibleCount && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
              aria-label="Previous products"
            >
              <FiChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
              aria-label="Next products"
            >
              <FiChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}

        {/* Products Grid */}
        <div 
          className={`grid gap-8 px-4 h-[${sliderHeight}]`}
          style={{
            gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`
          }}
        >
          {visibleProducts.map((product, index) => {
            // Calculate if this is the center product
            const isCenter = index === Math.floor(visibleProducts.length / 2);
            
            return (
              <div
                key={`${product.title}-${currentIndex}-${index}`}
                className={`
                  bg-white rounded-lg overflow-hidden shadow-md relative transition-all duration-300
                  ${isCenter ? 'z-10 scale-100' : 'z-0 scale-95 opacity-90'}
                  hover:shadow-lg hover:scale-[1.02] hover:opacity-100
                `}
                onClick={() => handleProductClick(product)}
              >
                <div className="h-48 overflow-hidden cursor-pointer">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.title}</h3>
                  <p className={`text-sm font-bold mb-3 ${
                    product.category === 'new' ? 'text-blue-600' : 'text-red-600'
                  }`}>
                    {product.category === 'new' ? 'NEW ARRIVAL' : 'TRENDING NOW'}
                  </p>
                  <div className="text-gray-600 text-sm">
                    {product.content.split('\n').map((line, i) => (
                      <p key={i} className="my-1">{line}</p>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-medium">View Category →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrendySlider;