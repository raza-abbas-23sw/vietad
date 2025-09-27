import React from 'react';
import { useNavigate } from 'react-router-dom';

const DesignPopup = ({ onClose, product, size, quantity, sizeUnit }) => {
  const navigate = useNavigate();

  const handleOptionClick = (optionType) => {
    onClose();
    
    if (optionType === 'design') {
      // Navigate to design tool with product data
      navigate('/design-tool', { 
        state: { 
          product,
          size,
          quantity,
          sizeUnit,
          designOption: optionType 
        }
      });
    } else {
      // For other options, navigate to products page
      navigate('/products', { 
        state: { 
          product,
          size,
          quantity,
          sizeUnit,
          designOption: optionType 
        }
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      {/* Main container with perspective for 3D children */}
      <div className="perspective-1000 w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl w-full p-6 md:p-8 relative overflow-hidden transform-style-preserve-3d">
          {/* Floating 3D decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-100 rounded-full opacity-20 transform rotate-45 translate-z-10"></div>
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-purple-100 rounded-full opacity-20 transform rotate-12 translate-z-5"></div>
          
          <div className="flex justify-between items-center mb-6 md:mb-8 relative z-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1 transform translate-z-10">
                Create And Customize Your Design
              </h2>
              <p className="text-slate-500 text-sm md:text-base transform translate-z-10">
                Choose how you'd like to create your perfect design
              </p>
            </div>
            <button 
              onClick={onClose}
              className="cursor-pointer text-slate-500 hover:text-slate-700 transition-all p-2 rounded-full hover:bg-slate-100 transform hover:rotate-90 duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
            {/* Option 1: Use a template */}
            <div 
              onClick={() => handleOptionClick('template')}
              className="group p-4 md:p-6 bg-white border border-slate-200 rounded-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden transform-style-preserve-3d hover:rotate-y-5 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-z-0"></div>
              <div className="relative z-10 transform translate-z-20">
                <div className="bg-cyan-100 p-3 rounded-full inline-flex transform group-hover:rotate-y-15 group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-800 mt-4 mb-3 group-hover:text-cyan-700">Use a template</h3>
                <p className="text-slate-600 text-sm md:text-base mb-4">Save time with our professionally designed templates.</p>
                <div className="text-cyan-600 hover:text-cyan-800 font-medium flex items-center gap-2 text-sm md:text-base">
                  Browse Templates
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 w-1 bg-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform rotate-y-45 translate-z-10"></div>
            </div>

            {/* Option 2: Design your own - This now goes to design tool */}
            <div 
              onClick={() => handleOptionClick('design')}
              className="group p-4 md:p-6 bg-white border border-slate-200 rounded-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden transform-style-preserve-3d hover:rotate-y-5 cursor-pointer border-2 border-cyan-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-z-0"></div>
              
              {/* Popular Badge */}
              <div className="absolute -top-2 -right-2 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold z-20 transform rotate-12">
                POPULAR
              </div>
              
              <div className="relative z-10 transform translate-z-20">
                <div className="bg-cyan-500 p-3 rounded-full inline-flex transform group-hover:rotate-y-15 group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-800 mt-4 mb-3 group-hover:text-cyan-700">Design your own</h3>
                <p className="text-slate-600 text-sm md:text-base mb-4">Create something unique with our design tools.</p>
                <div className="text-cyan-600 hover:text-cyan-800 font-medium flex items-center gap-2 text-sm md:text-base">
                  Open Design Tool
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 w-1 bg-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform rotate-y-45 translate-z-10"></div>
            </div>

            {/* Option 3: Upload your design */}
            <div 
              onClick={() => handleOptionClick('upload')}
              className="group p-4 md:p-6 bg-white border border-slate-200 rounded-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden transform-style-preserve-3d hover:rotate-y-5 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-z-0"></div>
              <div className="relative z-10 transform translate-z-20">
                <div className="bg-cyan-100 p-3 rounded-full inline-flex transform group-hover:rotate-y-15 group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-800 mt-4 mb-3 group-hover:text-cyan-700">Upload your design</h3>
                <p className="text-slate-600 text-sm md:text-base mb-4">Already have a design? Upload it here.</p>
                <div className="text-cyan-600 hover:text-cyan-800 font-medium flex items-center gap-2 text-sm md:text-base">
                  Upload Files
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 w-1 bg-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform rotate-y-45 translate-z-10"></div>
            </div>
          </div>

          {/* Current Selection Summary */}
          <div className="mt-6 md:mt-8 p-4 bg-slate-50 rounded-lg relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h4 className="font-semibold text-slate-800">Current Selection</h4>
                <p className="text-slate-600 text-sm">
                  {size.width}×{size.height} {sizeUnit} • {quantity} sign(s) • ${(size.width * size.height * product.price * quantity).toFixed(2)}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="text-slate-600 hover:text-slate-800 text-sm font-medium underline"
              >
                Modify selection
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for 3D effects */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .translate-z-5 {
          transform: translateZ(5px);
        }
        .translate-z-10 {
          transform: translateZ(10px);
        }
        .translate-z-20 {
          transform: translateZ(20px);
        }
        .rotate-y-5 {
          transform: rotateY(5deg);
        }
        .rotate-y-15 {
          transform: rotateY(15deg);
        }
        .rotate-y-45 {
          transform: rotateY(45deg);
        }
      `}</style>
    </div>
  );
};

export default DesignPopup;