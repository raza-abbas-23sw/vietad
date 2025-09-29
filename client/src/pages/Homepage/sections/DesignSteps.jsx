// components/DesignProcess.jsx
import React from "react";
import { FaMousePointer, FaPaintBrush, FaShoppingCart } from "react-icons/fa";
import { Lightbulb, LayoutTemplate, Upload } from 'lucide-react';

const DesignSteps = () => {
  const steps = [
    {
      icon: <Lightbulb className="w-8 h-8 text-blue-600" />,
      title: 'Choose Your Sign Type',
      description: 'Select from a variety of sign types for your business needs.',
    },
    {
      icon: <LayoutTemplate className="w-8 h-8 text-red-600" />,
      title: 'Customize or Use Template',
      description: 'Design from scratch or pick a professional template to start.',
    },
    {
      icon: <Upload className="w-8 h-8 text-cyan-600" />,
      title: 'Upload or Design Online',
      description: 'Easily upload your own artwork or use our intuitive online design tool.',
    },
  ];

  return (
    <section className="bg-gradient-to-r from-cyan-100 to-red-100 py-16 px-4 text-black sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Simple Steps to Your Perfect Sign
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8 transition-transform transform hover:scale-105 duration-300">
              <div className="flex justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignSteps;
