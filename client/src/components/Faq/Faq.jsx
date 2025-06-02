// components/FAQSection.jsx
import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';


const Faq = ({faqs}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Find answers to common questions about our custom signs</p>
        </div>

        <div className="space-y-4 ">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className="border border-gray-200 rounded-lg overflow-hidden bg-white "
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none cursor-pointer"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-${faq.id}`}
              >
                <h2 className="text-xl font-semibold text-gray-800">{faq.question}</h2>
                {activeIndex === index ? (
                  <FiChevronUp className="w-5 h-5 text-cyan-600" />
                ) : (
                  <FiChevronDown className="w-5 h-5 text-cyan-600" />
                )}
              </button>
              
              <div
                id={`faq-${faq.id}`}
                className={`px-6 pb-6 pt-0 transition-all duration-300 ${activeIndex === index ? 'block' : 'hidden'}`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default Faq;