import React from 'react';
import logos from '../../assets/profesiional/Data';

const TrustedBy = () => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
            Trusted by <span className="text-cyan-600">Industry Professionals</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Partnered with leading organizations and experts worldwide
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-16">
          {logos.map((logo) => (
            <div 
              key={logo.name} 
              className="group relative flex justify-center items-center h-20 px-4"
            >
              <div className="absolute inset-0 bg-gray-50 rounded-xl shadow-sm transform group-hover:scale-105 transition-all duration-300 ease-in-out"></div>
              <img
                src={logo.src}
                alt={logo.alt}
                className="relative h-12 sm:h-14 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default TrustedBy;