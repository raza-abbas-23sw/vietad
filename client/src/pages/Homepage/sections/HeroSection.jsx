import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DesignPopup from './DesignPopup'; 

const HeroSection = () => {
  const navigate = useNavigate();
  const [sizeUnit, setSizeUnit] = useState('inch');
  const [quantity, setQuantity] = useState(1);
  const [width, setWidth] = useState(12);
  const [height, setHeight] = useState(12);
  const [selectedStandardSize, setSelectedStandardSize] = useState('12x12');
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [showDesignPopup, setShowDesignPopup] = useState(false);

  // Single product data
  const product = {
    id: 101,
    title: "Premium Custom Sign",
    category: "custom-signs",
    description: "Create your perfect custom sign with premium materials and professional printing quality.",
    img: "https://smodprint.com/wp-content/uploads/2018/09/Large-Format-Flex-Banner-Print.jpg",
    basePrice: 25, // Base price for setup and minimum size
    pricePerSqIn: 0.15, // Price per square inch for smaller signs
    features: [
      "Premium quality materials",
      "Weather-resistant",
      "UV-protected",
      "Professional printing",
      "Custom sizes available",
      "Fast turnaround"
    ]
  };

  const standardSizes = [
    { id: '12x12', label: '12 x 12', width: 12, height: 12 },
    { id: '18x24', label: '18 x 24', width: 18, height: 24 },
    { id: '24x36', label: '24 x 36', width: 24, height: 36 },
    { id: '36x48', label: '36 x 48', width: 36, height: 48 },
  ];

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleStandardSizeChange = (sizeId) => {
    setSelectedStandardSize(sizeId);
    setIsCustomSize(false);
    const size = standardSizes.find(s => s.id === sizeId);
    setWidth(size.width);
    setHeight(size.height);
  };

  const toggleCustomSize = () => {
    setIsCustomSize(!isCustomSize);
    if (!isCustomSize) {
      setWidth('');
      setHeight('');
    } else {
      const size = standardSizes.find(s => s.id === selectedStandardSize);
      setWidth(size.width);
      setHeight(size.height);
    }
  };

  const convertToInches = (value, unit) => {
    return unit === 'feet' ? value * 12 : value;
  };

  const convertFromInches = (value, unit) => {
    return unit === 'feet' ? (value / 12).toFixed(1) : value;
  };

  const calculatePrice = () => {
    const selectedSize = isCustomSize 
      ? { 
          width: parseFloat(width) || 0, 
          height: parseFloat(height) || 0 
        }
      : standardSizes.find(s => s.id === selectedStandardSize);
    
    // Always calculate area in square inches for consistent pricing
    const widthInInches = convertToInches(selectedSize.width, sizeUnit);
    const heightInInches = convertToInches(selectedSize.height, sizeUnit);
    
    const areaInSqInches = widthInInches * heightInInches;
    
    // More realistic pricing calculation:
    // - Base price covers setup and minimum costs
    // - Price per square inch decreases slightly for larger sizes (economies of scale)
    
    let price;
    
    if (areaInSqInches <= 144) { // Up to 1 sq ft (12x12)
      price = product.basePrice + (areaInSqInches * product.pricePerSqIn);
    } else if (areaInSqInches <= 576) { // Up to 4 sq ft (24x24)
      price = product.basePrice + (areaInSqInches * product.pricePerSqIn * 0.9);
    } else if (areaInSqInches <= 1296) { // Up to 9 sq ft (36x36)
      price = product.basePrice + (areaInSqInches * product.pricePerSqIn * 0.85);
    } else { // Larger than 9 sq ft
      price = product.basePrice + (areaInSqInches * product.pricePerSqIn * 0.8);
    }
    
    // Minimum price guarantee
    price = Math.max(price, product.basePrice);
    
    // Apply quantity discount
    let totalPrice = price * quantity;
    if (quantity >= 10) {
      totalPrice *= 0.9; // 10% discount for 10+ items
    } else if (quantity >= 5) {
      totalPrice *= 0.95; // 5% discount for 5+ items
    }
    
    return totalPrice.toFixed(2);
  };

  const navigateToProducts = () => {
    navigate('/products');
  };

  const getCurrentSize = () => {
    if (isCustomSize) {
      return { 
        width: parseFloat(width) || 0, 
        height: parseFloat(height) || 0 
      };
    }
    return standardSizes.find(s => s.id === selectedStandardSize) || { width: 12, height: 12 };
  };

  const currentSize = getCurrentSize();

  // Format display size based on selected unit
  const formatDisplaySize = (size) => {
    if (sizeUnit === 'feet') {
      return {
        width: (size.width / 12).toFixed(1),
        height: (size.height / 12).toFixed(1)
      };
    }
    return size;
  };

  const displaySize = formatDisplaySize(currentSize);

  // Get area in proper units for display
  const getDisplayArea = () => {
    const widthInInches = convertToInches(currentSize.width, sizeUnit);
    const heightInInches = convertToInches(currentSize.height, sizeUnit);
    const areaInSqInches = widthInInches * heightInInches;
    
    if (sizeUnit === 'feet') {
      const areaInSqFeet = areaInSqInches / 144;
      return areaInSqFeet.toFixed(1) + ' sq ft';
    } else {
      return areaInSqInches.toFixed(0) + ' sq in';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-100 to-red-100 px-4 sm:px-6 py-2 sm:py-8">
      <div className="max-w-7xl mx-auto h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full">
          {/* Left Column - Enhanced Design */}
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-red-500 text-white rounded-full px-4 py-2 gap-2 shadow-lg animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <span className="text-sm font-medium">Premium Quality Materials</span>
            </div>

            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Custom Signs <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-cyan-600 to-red-600 bg-clip-text text-transparent">
                  Made Perfect
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-lg leading-relaxed">
                Create stunning <span className="font-semibold text-gray-900">custom signs, banners, and displays</span> with premium quality and fast turnaround.
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="flex gap-6 py-4 bg-white/50 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-center flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-cyan-600">500+</h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Products</p>
              </div>
              <div className="text-center flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-cyan-600">99%</h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Satisfaction</p>
              </div>
              <div className="text-center flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-cyan-600">24h</h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Support</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                className="bg-gradient-to-r cursor-pointer from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                onClick={navigateToProducts}
              >
                Explore Products
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
              
              <button 
                className="border-2 border-gray-300 cursor-pointer hover:border-gray-400 bg-white/80 hover:bg-white transition-all duration-300 text-gray-700 px-8 py-4 rounded-xl font-semibold inline-flex items-center justify-center gap-3 transform hover:-translate-y-1"
                onClick={() => setShowDesignPopup(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Quick Preview
              </button>
            </div>
          </div>

          {/* Right Column - Enhanced Product Customizer */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="space-y-6">
              {/* Enhanced Product Preview */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-gradient-to-br from-cyan-100 to-red-100 rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={product.img} 
                      alt={product.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-red-600 text-white px-2 py-2 rounded-full text-xs  shadow-lg">
                    {displaySize.width}×{displaySize.height} {sizeUnit}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mt-6 text-lg">{product.title}</h3>
                <p className="text-sm text-gray-600 mt-1">Premium quality custom signage</p>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-900 text-lg">Size & Quantity</h4>
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    Best Seller
                  </span>
                </div>

                {/* Unit Toggle */}
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                      sizeUnit === 'inch' 
                        ? 'bg-white text-cyan-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setSizeUnit('inch')}
                  >
                    Inches
                  </button>
                  {/* <button
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                      sizeUnit === 'feet' 
                        ? 'bg-white text-cyan-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setSizeUnit('feet')}
                  >
                    Feet
                  </button> */}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {standardSizes.map((size) => {
                    const displaySize = formatDisplaySize(size);
                    return (
                      <button
                        key={size.id}
                        className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          selectedStandardSize === size.id && !isCustomSize 
                            ? 'border-cyan-500 bg-cyan-50 text-cyan-700 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-md'
                        }`}
                        onClick={() => handleStandardSizeChange(size.id)}
                      >
                        {displaySize.width}×{displaySize.height}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Size Toggle */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="customSize"
                    checked={isCustomSize}
                    onChange={toggleCustomSize}
                    className="h-4 w-4 text-cyan-500 cursor-pointer rounded border-gray-300 focus:ring-cyan-500"
                  />
                  <label htmlFor="customSize" className="text-sm cursor-pointer font-medium text-gray-700 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Custom size
                  </label>
                </div>

                {isCustomSize && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 rounded-lg p-3 text-sm font-medium" 
                          placeholder="Width"
                          value={width}
                          onChange={(e) => setWidth(e.target.value.replace(/[^0-9.]/g, ''))}
                        />
                        <span className="flex items-center text-gray-600 font-medium text-sm min-w-[40px]">{sizeUnit}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 rounded-lg p-3 text-sm font-medium" 
                          placeholder="Height"
                          value={height}
                          onChange={(e) => setHeight(e.target.value.replace(/[^0-9.]/g, ''))}
                        />
                        <span className="flex items-center text-gray-600 font-medium text-sm min-w-[40px]">{sizeUnit}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Quantity Selector */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">Quantity</span>
                  <div className="flex items-center gap-4">
                    <button 
                      className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-lg font-bold transition-colors"
                      onClick={handleDecrement}
                    >
                      -
                    </button>
                    <span className="font-bold text-gray-900 min-w-[30px] text-center text-lg">{quantity}</span>
                    <button 
                      className="w-8 h-8 rounded-full border-2 cursor-pointer border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-lg font-bold transition-colors"
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Price and CTA */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Total:</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">${calculatePrice()}</span>
                    <div className="text-xs text-gray-500 mt-1">
                      {quantity} sign(s) • {displaySize.width}×{displaySize.height} {sizeUnit} • {getDisplayArea()}
                      {quantity >= 5 && (
                        <div className="text-green-600 font-medium mt-1">
                          {quantity >= 10 ? '10%' : '5%'} quantity discount applied
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-gradient-to-r cursor-pointer from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  onClick={() => setShowDesignPopup(true)}
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                    </svg>
                    START DESIGNING
                  </div>
                </button>
                
                <div className="text-center space-y-2">
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Free shipping
                  </p>
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    30-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showDesignPopup && (
        <DesignPopup 
          onClose={() => setShowDesignPopup(false)} 
          product={product}
          size={currentSize}
          quantity={quantity}
          sizeUnit={sizeUnit}
        />
      )}
    </div>
  );
};

export default HeroSection;