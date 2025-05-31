import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DesignPopup from './DesignPopup'; 

const HeroSection = () => {
  const navigate = useNavigate();
  const [sizeUnit, setSizeUnit] = useState('inch');
  const [quantity, setQuantity] = useState(1);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [selectedStandardSize, setSelectedStandardSize] = useState('12x12');
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [showDesignPopup, setShowDesignPopup] = useState(false);

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

  const calculatePrice = () => {
    const basePrice = 5.99; // base price per square unit
    const selectedSize = isCustomSize 
      ? { width: parseFloat(width) || 0, height: parseFloat(height) || 0 }
      : standardSizes.find(s => s.id === selectedStandardSize);
    
    const area = selectedSize.width * selectedSize.height;
    const price = (area * basePrice * quantity).toFixed(2);
    return price;
  };

  const navigateToProducts = () => {
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto pt-20 lg:pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="inline-flex items-center bg-indigo-100 text-indigo-700 rounded-full px-4 py-1.5 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              Premium Quality Materials
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                Choose What's Right<br className="hidden sm:block" /> For Your Business
              </h1>
              
              <p className="text-lg text-slate-600 max-w-xl">
                Explore our extensive collection of personalized <span className="font-medium text-slate-800">displays, banners, signs</span>, and <span className="font-medium text-slate-800">branding solutions</span> for your company.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center gap-2"
                onClick={navigateToProducts}
              >
                Discover More
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-indigo-600">500+</h3>
                <p className="text-sm text-slate-600 mt-1">Products</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-indigo-600">99%</h3>
                <p className="text-sm text-slate-600 mt-1">Satisfaction</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-indigo-600">24h</h3>
                <p className="text-sm text-slate-600 mt-1">Support</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-slate-800">Select Your Size</h2>
                  <span className="bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full">
                    Best Seller
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-600">Size Unit:</label>
                  <div className="flex rounded-lg overflow-hidden border border-slate-200">
                    <button 
                      className={`flex-1 py-2 px-4 text-sm font-medium ${sizeUnit === 'inch' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'}`}
                      onClick={() => setSizeUnit('inch')}
                    >
                      Inch
                    </button>
                    <button 
                      className={`flex-1 py-2 px-4 text-sm font-medium ${sizeUnit === 'feet' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'}`}
                      onClick={() => setSizeUnit('feet')}
                    >
                      Feet
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-800">Standard Sizes</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {standardSizes.map((size) => (
                      <button
                        key={size.id}
                        className={`p-3 rounded-lg border ${selectedStandardSize === size.id && !isCustomSize ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}
                        onClick={() => handleStandardSizeChange(size.id)}
                      >
                        <p className="text-slate-700">{size.label} {sizeUnit}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="customSize"
                    checked={isCustomSize}
                    onChange={toggleCustomSize}
                    className="h-4 w-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="customSize" className="ml-2 text-sm text-slate-600">
                    I need a custom size
                  </label>
                </div>

                {isCustomSize && (
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 mb-4">Enter Custom Size</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-600 mb-2">Width</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            className="w-full border border-slate-200 rounded-lg p-2" 
                            placeholder="Enter width"
                            value={width}
                            onChange={(e) => setWidth(e.target.value.replace(/[^0-9.]/g, ''))}
                          />
                          <span className="flex items-center text-slate-600">{sizeUnit}</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-600 mb-2">Height</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            className="w-full border border-slate-200 rounded-lg p-2" 
                            placeholder="Enter height"
                            value={height}
                            onChange={(e) => setHeight(e.target.value.replace(/[^0-9.]/g, ''))}
                          />
                          <span className="flex items-center text-slate-600">{sizeUnit}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Quantity:</span>
                  <div className="flex items-center gap-4">
                    <button 
                      className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                      onClick={handleDecrement}
                    >
                      -
                    </button>
                    <span className="font-medium text-slate-800">{quantity}</span>
                    <button 
                      className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Price Total:</span>
                  <span className="text-2xl font-bold text-slate-800">${calculatePrice()}</span>
                </div>

                <button 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 transition-colors text-white py-3 px-6 rounded-lg font-medium"
                  onClick={() => setShowDesignPopup(true)}
                >
                  GET STARTED
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDesignPopup && (
        <DesignPopup onClose={() => setShowDesignPopup(false)} />
      )}
    </div>
  );
};

export default HeroSection;