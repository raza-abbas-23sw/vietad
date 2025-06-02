import React from 'react';

const RelatedProducts = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div 
          key={product.id}
          className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
        >
          <div className="p-2">
            <div className="relative">
              {product.tag && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.tag}
                </span>
              )}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
            </div>
            <div className="px-2">
              <h3 className="text-md font-bold mb-2 group-hover:text-cyan-600 transition duration-300">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedProducts;
