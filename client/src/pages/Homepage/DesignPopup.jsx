import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router

const DesignPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleOptionClick = (optionType) => {
    // Close popup and navigate to product page with the selected option
    onClose();
    navigate('/products', { state: { designOption: optionType } });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      {/* Main container with perspective for 3D children */}
      <div className="perspective-1000">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 relative overflow-hidden transform-style-preserve-3d">
          {/* Floating 3D decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-100 rounded-full opacity-20 transform rotate-45 translate-z-10"></div>
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-purple-100 rounded-full opacity-20 transform rotate-12 translate-z-5"></div>
          
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-1 transform translate-z-10">Create And Customize Your Design</h2>
              <p className="text-slate-500 transform translate-z-10">Choose how you'd like to create your perfect design</p>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 transition-all p-2 rounded-full hover:bg-slate-100 transform hover:rotate-90 duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Option 1: Use a template - Full 3D card */}
            <div 
              onClick={() => handleOptionClick('template')}
              className="group p-6 bg-white border border-slate-200 rounded-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden transform-style-preserve-3d hover:rotate-y-5 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-z-0"></div>
              <div className="relative z-10 transform translate-z-20">
                {/* 3D Icon */}
                <div className="bg-indigo-100 p-3 rounded-full inline-flex transform group-hover:rotate-y-15 group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mt-4 mb-3 group-hover:text-indigo-700">Use a template</h3>
                <p className="text-slate-600 mb-4">Save time with our professionally designed templates.</p>
                <div className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2">
                  Browse Templates
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              {/* 3D Edge effect */}
              <div className="absolute inset-y-0 right-0 w-1 bg-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform rotate-y-45 translate-z-10"></div>
            </div>

            {/* Option 2: Design your own - More pronounced 3D */}
            <div 
              onClick={() => handleOptionClick('design')}
              className="group p-6 bg-white border border-slate-200 rounded-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden transform-style-preserve-3d hover:rotate-y-5 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-z-0"></div>
              <div className="relative z-10 transform translate-z-20">
                {/* 3D Icon with depth */}
                <div className="bg-indigo-100 p-3 rounded-full inline-flex transform group-hover:rotate-y-15 group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mt-4 mb-3 group-hover:text-indigo-700">Design your own</h3>
                <p className="text-slate-600 mb-4">Create something unique with our design tools.</p>
                <div className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2">
                  Open Design Tool
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              {/* 3D Edge effect */}
              <div className="absolute inset-y-0 right-0 w-1 bg-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform rotate-y-45 translate-z-10"></div>
            </div>

            {/* Option 3: Upload your design - 3D with floating effect */}
            <div 
              onClick={() => handleOptionClick('upload')}
              className="group p-6 bg-white border border-slate-200 rounded-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden transform-style-preserve-3d hover:rotate-y-5 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-z-0"></div>
              <div className="relative z-10 transform translate-z-20">
                {/* 3D Icon with depth */}
                <div className="bg-indigo-100 p-3 rounded-full inline-flex transform group-hover:rotate-y-15 group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mt-4 mb-3 group-hover:text-indigo-700">Upload your design</h3>
                <p className="text-slate-600 mb-4">Already have a design? Upload it here.</p>
                <div className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2">
                  Upload Files
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              {/* 3D Edge effect */}
              <div className="absolute inset-y-0 right-0 w-1 bg-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform rotate-y-45 translate-z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add these to your global CSS or as a style tag */}
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