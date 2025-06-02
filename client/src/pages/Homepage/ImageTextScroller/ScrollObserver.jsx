import { useEffect, useState, useRef } from 'react';

const ScrollObserver = ({ sections, onSectionChange }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const observerRef = useRef(null);

  useEffect(() => {
    // Create IntersectionObserver
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Find the index of the intersecting section
          const index = sections.findIndex(section => section === entry.target);
          if (index !== -1 && index !== currentSection) {
            setCurrentSection(index);
            onSectionChange(index);
          }
        }
      });
    }, {
      threshold: 0.5, // Trigger when 50% of the element is visible
      rootMargin: '-10% 0px -10% 0px' // Adjust the trigger area
    });

    // Observe all sections
    sections.forEach(section => {
      if (section) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections, currentSection, onSectionChange]);

  return null; // This component doesn't render anything
};

export default ScrollObserver;