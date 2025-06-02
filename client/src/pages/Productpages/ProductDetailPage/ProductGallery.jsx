import React, { useState } from 'react';

const ProductGallery = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // If no images are provided, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <div className="w-full h-[400px] flex items-center justify-center text-gray-400">
          No images available
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img 
          src={images[selectedImage]} 
          alt={`${title} - Image ${selectedImage + 1}`}
          className="w-full h-[400px] object-contain transition-opacity duration-300"
        />
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 border-2 rounded overflow-hidden ${
                selectedImage === index 
                  ? 'border-cyan-600' 
                  : 'border-gray-200'
              }`}
            >
              <img 
                src={image} 
                alt={`${title} thumbnail ${index + 1}`}
                className="w-16 h-16 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
