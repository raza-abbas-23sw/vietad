import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Home, ShoppingBag, AlertCircle } from 'lucide-react';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';
import RelatedProducts from './RelatedProducts';
import ProductReviews from './ProductReviews';
import { productsData, templates } from '../../../assets/allData/productPageData/productsData.js';

const ProductDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Try different possible parameter names
  const productSlug = params.product || params.slug || params.id;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productSlug]);

  // Find the product based on product slug
  const productData = productsData.find(
    (p) => p.slug === productSlug
  );

  // Get related products (products from the same category)
  const relatedProducts = productData ? productsData
    .filter((p) => p.category === productData.category && p.id !== productData.id)
    .slice(0, 4) : [];

  // Handle loading and error states
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      if (!productData && productSlug) {
        setError('Product not found');
        // Redirect after 3 seconds if product not found
        const redirectTimer = setTimeout(() => {
          navigate('/products');
        }, 3000);
        return () => clearTimeout(redirectTimer);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [productData, productSlug, navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-cyan-100 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700">Loading Product</h3>
          <p className="text-gray-500 mt-2">Please wait while we fetch the product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !productData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error || 'The product you are looking for does not exist or has been removed.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Browse Products
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Redirecting to products page in 3 seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-cyan-100 to-red-100 min-h-screen transition-all duration-300 ease-in-out">
      {/* Breadcrumb Navigation */}
      <div className=" sticky top-0 z-50  ">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link 
              to="/" 
              className="flex items-center text-gray-500 hover:text-cyan-600 transition-colors duration-200 font-medium"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link 
              to="/products" 
              className="flex items-center text-gray-500 hover:text-cyan-600 transition-colors duration-200 font-medium"
            >
              <ShoppingBag className="w-4 h-4 mr-1" />
              Products
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-semibold bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
              {productData.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="container mx-auto px-4 max-w-7xl py-8 bg-gradient-to-r from-cyan-100 to-red-100">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Product Gallery - Left Column - Sticky */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-24 lg:self-start transform transition-all duration-300">
              <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <ProductGallery 
                  images={productData.gallery} 
                  title={productData.title}
                  mainImage={productData.img}
                />
              </div>
            </div>
          </div>
          
          {/* Product Info - Right Column */}
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-r from-cyan-100 to-red-100 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <ProductInfo product={productData} />
            </div>

            {/* Quick Features Preview */}
            {productData.features && productData.features.length > 0 && (
              <div className="mt-6 bg-gradient-to-r from-cyan-100 to-red-100 rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {productData.features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="border-t border-gray-200 bg-gradient-to-r from-cyan-100 to-red-100">
        <div className="container mx-auto px-4 max-w-7xl py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <ProductTabs product={productData} relatedProducts={relatedProducts} />
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 bg-gradient-to-r from-cyan-100 to-red-100">
          <div className="container mx-auto px-4 max-w-7xl py-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 relative inline-block">
                Related Products
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-cyan-500 rounded-full"></span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover more products that complement your selection
              </p>
            </div>
            <RelatedProducts products={relatedProducts} />
          </div>
        </div>
      )}

      {/* Templates Section */}
      {templates && templates.length > 0 && (
        <div className="border-t border-gray-200 bg-gradient-to-r from-cyan-100 to-red-100">
          <div className="container mx-auto px-4 max-w-7xl py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 relative inline-block">
                Popular Templates
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-cyan-500 rounded-full"></span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get started quickly with our professionally designed templates
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {templates.slice(0, 4).map((template) => (
                <Link 
                  key={template.id} 
                  to={`/design-tool?template=${template.id}`}
                  className="group block"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <img
                      src={template.img}
                      alt={template.title}
                      className="h-48 w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-700 group-hover:text-cyan-600 transition-colors duration-200 line-clamp-2">
                        {template.title}
                      </h3>
                      <span className="inline-block mt-2 text-xs px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full capitalize">
                        {template.category || 'Template'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link 
                to="/design-tool" 
                className="inline-flex items-center px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors duration-200 font-medium"
              >
                Explore All Templates
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="border-t border-gray-200 bg-gradient-to-r from-cyan-100 to-red-100">
        <div className="container mx-auto px-4 max-w-7xl py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 relative inline-block">
              Customer Reviews
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-cyan-500 rounded-full"></span>
            </h2>
            <p className="text-gray-600">See what our customers are saying about this product</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <ProductReviews 
              reviews={productData.reviews || []} 
              rating={productData.rating} 
              ratingCount={productData.ratingCount}
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="border-t border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="container mx-auto px-4 max-w-7xl py-12 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Create Something Amazing?
          </h3>
          <p className="text-cyan-100 mb-6 max-w-2xl mx-auto">
            Start designing your custom {productData.title} today with our easy-to-use design tool
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/design-tool" 
              className="inline-flex items-center px-8 py-3 bg-white text-cyan-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold"
            >
              Start Designing
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-cyan-600 transition-colors duration-200 font-semibold"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;