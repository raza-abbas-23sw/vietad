import React from 'react';

const Designtool = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-100 to-red-200 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated Icon/Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-red-400 rounded-2xl flex items-center justify-center shadow-lg">
              <svg 
                className="w-12 h-12 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2">
              <span className="relative flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-cyan-400 to-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-cyan-500"></span>
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Design Tool
        </h1>
        
        <div className="relative inline-block mb-6">
          <span className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-cyan-400 to-red-400 bg-clip-text text-transparent">
            Coming Soon
          </span>
          <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-red-400 rounded-full"></div>
        </div>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          We're crafting an incredible design experience tailored for you. 
          Our powerful tool is currently in development and will be launched soon.
        </p>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Development Progress</span>
            <span>75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-red-400 h-2 rounded-full transition-all duration-300"
              style={{ width: '75%' }}
            ></div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-cyan-200">
            <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-semibold text-cyan-700">Smart Templates</h3>
            <p className="text-sm text-gray-600 mt-1">Pre-designed templates for quick starts</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-cyan-200">
            <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-cyan-700">Easy Customization</h3>
            <p className="text-sm text-gray-600 mt-1">Drag & drop interface for effortless design</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-cyan-200">
            <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-cyan-700">Instant Export</h3>
            <p className="text-sm text-gray-600 mt-1">High-quality exports in multiple formats</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <p className="text-gray-500 text-sm">
            Want to be the first to know when we launch?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-red-400 text-white rounded-full font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-cyan-300">
              Notify Me
            </button>
            <button className="px-6 py-3 border border-cyan-300 text-cyan-700 rounded-full font-medium hover:bg-cyan-50 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-6 border-t border-cyan-200">
          <p className="text-cyan-600 text-sm flex items-center justify-center gap-2">
            <span>Stay tuned for something amazing!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Designtool;