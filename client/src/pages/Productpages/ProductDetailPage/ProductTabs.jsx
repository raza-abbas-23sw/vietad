import React, { useState } from 'react';
import RelatedProducts from './RelatedProducts';

const ProductTabs = ({ product, relatedProducts }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button
          className={`py-4 px-6 font-medium whitespace-nowrap ${
            activeTab === 'overview'
              ? 'text-cyan-600 border-b-2 border-cyan-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`py-4 px-6 font-medium whitespace-nowrap ${
            activeTab === 'specs'
              ? 'text-cyan-600 border-b-2 border-cyan-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('specs')}
        >
          Specifications
        </button>
        <button
          className={`py-4 px-6 font-medium whitespace-nowrap ${
            activeTab === 'installation'
              ? 'text-cyan-600 border-b-2 border-cyan-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('installation')}
        >
          Installation
        </button>
        <button
          className={`py-4 px-6 font-medium whitespace-nowrap ${
            activeTab === 'faq'
              ? 'text-cyan-600 border-b-2 border-cyan-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('faq')}
        >
          FAQ
        </button>
      </div>

      <div className="py-8">
        {activeTab === 'overview' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">{product.title} Overview</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            {product.longDescription && (
               <p className="text-gray-600 mb-4">{product.longDescription}</p>
            )}
            {product.features && product.features.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">Features:</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {relatedProducts && relatedProducts.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Similar Products</h3>
                <RelatedProducts products={relatedProducts} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'specs' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Product Specifications</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <tbody>
                  {product.sizes && (
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-200 font-medium">Size</td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        {product.sizes.map(size => `${size.width}" × ${size.height}"`).join(', ')}
                      </td>
                    </tr>
                  )}
                  {product.materials && (
                    <tr>
                      <td className="py-3 px-4 border-b border-gray-200 font-medium">Material</td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        {product.materials.map(material => material.name).join(', ')}
                      </td>
                    </tr>
                  )}
                  {product.frameOptions && (
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-200 font-medium">Frame</td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        {product.frameOptions.join(', ')}
                      </td>
                    </tr>
                  )}
                  {product.printTechnology && (
                    <tr>
                      <td className="py-3 px-4 border-b border-gray-200 font-medium">Print Technology</td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        {product.printTechnology}
                      </td>
                    </tr>
                  )}
                  {product.lifespan && (
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-200 font-medium">Lifespan</td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        {product.lifespan}
                      </td>
                    </tr>
                  )}
                  {product.weight && (
                    <tr>
                      <td className="py-3 px-4 border-b border-gray-200 font-medium">Weight</td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        {product.weight}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'installation' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Installation Instructions</h3>
            <p className="text-gray-600 mb-4">
              Setting up your {product.title.toLowerCase()} is quick and easy:
            </p>
            <ol className="list-decimal pl-5 space-y-3 text-gray-600 mb-6">
              <li>Remove the frame from the carrying case and place it on the floor.</li>
              <li>Gently pull the frame outward to begin expanding it.</li>
              <li>Continue expanding the frame until it's fully extended and locked in place.</li>
              <li>Attach the fabric graphic panel to the frame, starting from the top corners.</li>
              <li>Work your way around the frame, ensuring the graphic is properly aligned and secured.</li>
              <li>Adjust as needed to remove any wrinkles or creases in the graphic.</li>
            </ol>
            <p className="text-gray-600">
              For detailed instructions, please refer to the installation guide included with your purchase.
            </p>
          </div>
        )}

        {activeTab === 'faq' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">{product.title} FAQ</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">What are {product.title.toLowerCase()}?</h4>
                <p className="text-gray-600">
                  {product.title} are large promotional units with a fabric face on which you can feature text or graphics you can imagine. Easy to transport, {product.title.toLowerCase()} are available in a variety of different sizes making them truly versatile.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">How do I care for my {product.title.toLowerCase()}?</h4>
                <p className="text-gray-600">
                  The fabric portion of the {product.title.toLowerCase()} is attached to the frame with Velcro, making it easy to fold and bring it back with a soft, damp cloth before storage. After cleaning, allow the fabric to dry completely before folding. The fabric is machine washable with cold water.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">How much does a {product.title.toLowerCase()} weigh and is it difficult to move around?</h4>
                <p className="text-gray-600">
                  On average, a {product.title.toLowerCase()} weighs between 20-30 lbs. The 8' x 8' {product.title.toLowerCase()} only weigh 27 lbs while the 10x8' frame weighs 37 lbs, with the print spans more included. {product.title} can be moved around with ease when packed into the carrying cases they come in.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
