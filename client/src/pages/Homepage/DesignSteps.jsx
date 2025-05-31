// components/DesignProcess.jsx
import React from "react";
import { FaMousePointer, FaPaintBrush, FaShoppingCart } from "react-icons/fa";
import img1 from "../../assets/designSteps/1.svg";
import img2 from "../../assets/designSteps/2.svg";
import img3 from "../../assets/designSteps/3.svg";

const DesignSteps = () => {
  return (
    <section className="bg-blue-00 py-16 px-4 text-black sm:px-6 lg:px-8">
      <div className="max-w-5xl bg-amber-30 mx-auto bg-amber-30">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold  mb-4">
            3-Step Design & Order Process
          </h2>
          <p className="text-sm px-30 max-w-3xl mx-auto ">
            We've made the sign design and ordering process as easy as possible.
            Follow these simple steps to design your very own sign.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative text-center bg-blu p-6 max-w-sm mx-auto">
            {/* Large faded number */}
            <div className="absolute text-[250px] pt-0  text-gray-100 font-bold left-1/2 bottom-0 -translate-x-1/2 select-none pointer-events-none z-0">
              1
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              {/* Replace with your actual image or icon */}
              <div className="flex justify-center mb-4">
                <img src={img1} alt="Icon" className="w-20 h-20" />
              </div>
              <h3 className="font-semibold text-md mb-2">
                Pick Templates or Upload Designs
              </h3>
              <p className=" text-xs text-justify">
                Head over to our templates to select a theme that matches your vision. Modify it or upload an image to make your own sign online. You can also explore templates directly from our design tool.
              </p>
            </div>
          </div>
          <div className="relative text-center bg-blu p-6 max-w-sm mx-auto">
            {/* Large faded number */}
            <div className="absolute text-[250px] pt-0  text-gray-100 font-bold left-1/2 bottom-0 -translate-x-1/2 select-none pointer-events-none z-0">
              2
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              {/* Replace with your actual image or icon */}
              <div className="flex justify-center mb-4">
                <img src={img2} alt="Icon" className="w-20 h-20" />
              </div>
              <h3 className="font-semibold text-md mb-2">
                Fully Customize Your Signs
              </h3>
              <p className=" text-xs text-justify">
                Our online design tool comes with original templates to create a
                unique design for your signs. Select a print medium, size,
                style, texts, icons, accessories as well as sign printing and
                cutting options.
              </p>
            </div>
          </div>
          <div className="relative text-center bg-blu p-6 max-w-sm mx-auto">
            {/* Large faded number */}
            <div className="absolute text-[250px] pt-0  text-gray-100 font-bold left-1/2 bottom-0 -translate-x-1/2 select-none pointer-events-none z-0">
              3
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              {/* Replace with your actual image or icon */}
              <div className="flex justify-center mb-4">
                <img src={img3} alt="Icon" className="w-20 h-20" />
              </div>
              <h3 className="font-semibold text-md mb-2">
                Click to Order Your Product
              </h3>
              <p className=" text-xs text-justify">
                Place your order once done with the design. Click “add to cart” for ordering then provide shipping info and any notes regarding the order. Proceed to checkout and we’ll get your signs printed right away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignSteps;
