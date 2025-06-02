import React, { useState } from "react";
import DesignPopup from './DesignPopup'; // Make sure this path is correct
import logoPng from '../../assets/logos/logo.png'; // Corrected import path

const CustomSignSection = () => {
  const [showDesignPopup, setShowDesignPopup] = useState(false);

  return (
    <div className="w-full bg-gradient-to-r from-cyan-100 to-red-100 py-12 px-4 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-10">
          {/* Left Column - Logo and Text */}
          <div className="flex items-start space-x-6 w-full md:w-auto mb-6 md:mb-0">
            <div className="bg-cyan-200 p-4 rounded-xl">
              <img
                src={logoPng}
                alt="VietAdSigns Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Create Your Custom Sign in Minutes
              </h2>
              <p className="text-gray-600 mb-4">
                Professional quality signs with our easy-to-use online designer
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-700">2,473 reviews</span>
              </div>
            </div>
          </div>

          {/* Right Column - CTA Button */}
          <div className="w-full md:w-auto">
            <button
              onClick={() => setShowDesignPopup(true)}
              className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md"
            >
              Design Your Sign Now
            </button>
          </div>
        </div>
      </div>

      {/* Design Popup - Same as in HeroSection */}
      {showDesignPopup && (
        <DesignPopup onClose={() => setShowDesignPopup(false)} />
      )}
    </div>
  );
};

export default CustomSignSection;