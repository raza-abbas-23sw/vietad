import { useRef, useState, useCallback } from 'react';
import { scrollerData } from './data';
import ScrollObserver from './ScrollObserver';
import './ImageTextScroller.css';

const InteractiveImageTextScroller = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  const handleSectionChange = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="image-text-scroller">
      <div className="image-container">
        {scrollerData.map((item, index) => (
          <div 
            key={`image-${item.id}`}
            className={`image-wrapper ${index === activeIndex ? 'active' : ''}`}
          >
            <img src={item.imageUrl} alt={item.imageAlt} />
          </div>
        ))}
      </div>
      
      <div className="content-container">
        {scrollerData.map((item, index) => (
          <div 
            key={`content-${item.id}`}
            ref={el => sectionRefs.current[index] = el}
            className="content-section"
          >
            <div className={`content-wrapper ${index === activeIndex ? 'active' : ''}`}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <a href={item.buttonLink} className="cta-button">
                {item.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <ScrollObserver 
        sections={sectionRefs.current} 
        onSectionChange={handleSectionChange} 
      />
    </div>
  );
};

export default InteractiveImageTextScroller;