import React from "react";
import { commercialSignsData } from "../../assets/commercialSignsSection/commercialSignsData";
const CommercialSignsSection = () => {
  return (
    <section className="py-16  bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl ">
        {commercialSignsData.categories.map((category) => (
          <div key={category.id} className="mb-16 last:mb-0">
            {/* Category Header */}
            <div className="mb-8  border-gray-200 pb-4">
              <h2 className="text-2xl text-center md:text-left font-bold text-gray-800">
                {category.title}
              </h2>
            </div>

            {/* Category Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className=" hover:bg-blue-400 text-gray-800 hover:text-white transition-all rounded-lg shadow-md overflow-hidden hover:shadow-xl  duration-500 cursor-pointer "
                >
                  <div className="">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-40 object-cover mb-4 "
                    />
                    {/* Title */}
                    <div className="px-4">
                    <h3 className="text-md font-bold mb-3 ">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm mb-2">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommercialSignsSection;
