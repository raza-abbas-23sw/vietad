import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';
import RelatedProducts from './RelatedProducts';
import ProductReviews from './ProductReviews';
import { productsData, templates } from '../../../assets/Products/productsData';

const ProductDetailPage = () => {
  const { product } = useParams();
  const navigate = useNavigate();

  // Find the product based on product slug
  const productData = productsData.find(
    (p) => p.slug === product
  );

  // Get related products (products from the same category)
  const relatedProducts = productData ? productsData
    .filter((p) => p.category === productData.category && p.id !== productData.id)
    .slice(0, 3) : [];

  // If product not found, redirect to products page
  if (!productData) {
    navigate('/products');
    return null;
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen transition-all duration-300 ease-in-out">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link 
              to="/products" 
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Products
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-semibold bg-gray-100 px-3 py-1 rounded-full">
              {productData.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Gallery - Left Column - Sticky */}
          <div className="lg:w-1/2 lg:sticky lg:top-24 lg:self-start transform transition-all duration-300 hover:scale-[1.02]">
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <ProductGallery images={productData.gallery} title={productData.title} />
            </div>
          </div>
          
          {/* Product Info - Right Column */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <ProductInfo product={productData} />
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 max-w-7xl py-12">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <ProductTabs product={productData} relatedProducts={relatedProducts} />
          </div>
        </div>
      </div>

      {/* Templates Section */}
      {
        templates.length > 0 && (
          <div className="container mx-auto px-4 max-w-7xl py-16 bg-gradient-to-b from-white to-gray-50">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center relative">
              <span className="relative z-10">Top Templates</span>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-cyan-500 rounded-full"></span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {templates.slice(0, 4).map((template) => (
                <div key={template.id} className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={template.img}
                      alt={template.title}
                      className="h-full w-full object-cover object-center transition-all duration-300 group-hover:opacity-80 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-4 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{template.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )
      }

      {/* Reviews Section */}
      <div className="container mx-auto px-4 max-w-7xl py-16 border-t border-gray-200 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center relative">
          <span className="relative z-10">Customer Reviews</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-cyan-500 rounded-full"></span>
        </h2>
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <ProductReviews reviews={productData.reviews || []} rating={productData.rating} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;