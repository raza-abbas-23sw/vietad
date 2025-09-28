import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, primary = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        primary
          ? 'bg-cyan-500 text-white hover:bg-cyan-600'
          : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
      }`}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  onClick: PropTypes.func,
};

const ScrollSection = ({ data }) => {
  const sectionRefs = useRef([]);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          const id = entry.target.getAttribute('data-id');
          const imageElements = document.querySelectorAll('[data-image-id]');
          
          imageElements.forEach((img) => {
            img.classList.remove('active');
            if (img.getAttribute('data-image-id') === id) {
              img.classList.add('active');
            }
          });
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [data]);

  return (
    <div className="relative w-full h-full">
      {/* Left side - Fixed images */}
      <div 
        ref={imageContainerRef}
        className="fixed top-0 left-0 w-full md:w-1/2 h-screen"
      >
        {data.map((section, index) => (
          <div
            key={`image-${section.id}`}
            data-image-id={section.id}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 ease-in-out ${
              index === 0 ? 'active opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${section.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
        ))}
      </div>

      {/* Right side - Scrolling content */}
      <div className="md:ml-[50%] w-full md:w-1/2">
        {data.map((section, index) => (
          <div
            ref={(el) => (sectionRefs.current[index] = el)}
            key={section.id}
            data-id={section.id}
            className={`min-h-screen flex items-center justify-center transition-all duration-500 ease-in-out transform translate-y-12 opacity-0 active:translate-y-0 active:opacity-100`}
          >
            <div className="p-8 md:p-16 max-w-2xl w-full">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                {section.title}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {section.description}
              </p>
              <div className="flex flex-wrap gap-4">
                {section.primaryButton && (
                  <Button
                    text={section.primaryButton.text}
                    primary={true}
                    onClick={section.primaryButton.onClick}
                  />
                )}
                {section.secondaryButton && (
                  <Button
                    text={section.secondaryButton.text}
                    onClick={section.secondaryButton.onClick}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ScrollSection.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      primaryButton: PropTypes.shape({
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func,
      }),
      secondaryButton: PropTypes.shape({
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func,
      }),
    })
  ).isRequired,
};

export default ScrollSection;