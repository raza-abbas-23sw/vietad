import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import img1 from './pexels-photo-102693.jpeg'
import img2 from './pexels-photo-6476776.jpeg'
import img3 from './pexels-photo-3153204.jpeg'
import img4 from './pexels-photo-7598019.jpeg'

const ProductHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-blue-600 to-cyan-500 overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 top-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-2 relative">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm mb-8">
          <Link 
            to="/" 
            className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
          >
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-white/60" />
          <span className="text-white font-semibold bg-white/10 px-3 py-1 rounded-full">
            Products
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Transform Your Space
              <span className="block mt-2 text-cyan-300">With Custom Signs</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Elevate your brand with eye-catching displays that leave a lasting impression.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-cyan-100 transition-colors">
                Get Started
                <ArrowRight size={18} />
              </button>
             
            </div>
          </div>
          
          {/* Image Grid with Hover Effects */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <img 
                src={img1} 
                alt="Banner Display"
                className="w-full h-64 object-cover rounded-2xl shadow-lg transform hover:scale-105 hover:-rotate-2 transition-all duration-300"
              />
              <img 
                src={img2} 
                alt="Company Signage"
                className="w-full h-40 object-cover rounded-2xl shadow-lg transform hover:scale-105 hover:rotate-2 transition-all duration-300"
              />
            </div>
            <div className="space-y-6 pt-10">
              <img 
                src={img3} 
                alt="Promotional Display"
                className="w-full h-40 object-cover object-center rounded-2xl shadow-lg transform hover:scale-105 hover:-rotate-2 transition-all duration-300"
              />
              <img 
                src={img4} 
                alt="Modern Display"
                className="w-full h-64 object-cover rounded-2xl shadow-lg transform hover:scale-105 hover:rotate-2 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </section>
  );
};

export default ProductHero;
