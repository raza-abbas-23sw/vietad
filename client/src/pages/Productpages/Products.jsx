import React from "react";
import { productsData } from "../../assets/Products/productsData";

const Products = () => {
  return (
    <section className="py-16 bg-white">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsData.map((item) => (
            <div
              key={item.id}
              className="hover:bg-cyan-600 text-gray-800 hover:text-white transition-all rounded-lg shadow-md overflow-hidden hover:shadow-xl duration-500 cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-40 object-cover mb-4"
              />
              <div className="px-4">
                <h3 className="text-md font-bold mb-3">{item.title}</h3>
                <p className="text-sm mb-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
