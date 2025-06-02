import React from "react";
import { Link } from "react-router-dom";
import { productsData } from "../../assets/Products/productsData";

const Products = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Custom Sign Printing
          </h1>
          <p className="text-lg text-gray-600">
            Select from our versatile range of signs and customize them to suit your needs.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsData.map((item) => (
            <Link 
              to={`/products/${item.slug}`}
              key={item.id}
              className="group bg-white hover:bg-cyan-600 text-gray-800 hover:text-white transition-all rounded-lg shadow-md overflow-hidden hover:shadow-xl duration-500 cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex gap-2 mb-3">
                  {item.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-cyan-100 text-cyan-800 group-hover:bg-cyan-800 group-hover:text-white rounded-full transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-xl">${item.price}</span>
                    <span className="ml-2 text-sm line-through text-gray-500 group-hover:text-gray-200">
                      ${item.originalPrice}
                    </span>
                  </div>
                  <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;