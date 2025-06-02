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
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl py-3">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <Link to="/products" className="text-gray-500 hover:text-gray-700">
              Products
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium">{productData.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="container mx-auto px-4 max-w-7xl py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Gallery - Left Column - Sticky */}
          <div className="lg:w-1/2 lg:sticky lg:top-8 lg:self-start">
            <ProductGallery images={productData.gallery} title={productData.title} />
          </div>
          
          {/* Product Info - Right Column */}
          <div className="lg:w-1/2">
            <ProductInfo product={productData} />
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <ProductTabs product={productData} relatedProducts={relatedProducts} />
        </div>
      </div>

      {/* Templates Section */}
      {
        templates.length > 0 && (
          <div className="container mx-auto px-4 max-w-7xl py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Top Templates</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {templates.slice(0, 4).map((template) => (
                <div key={template.id} className="group cursor-pointer">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={template.img}
                      alt={template.title}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{template.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )
      }

      {/* Reviews Section */}
      <div className="container mx-auto px-4 max-w-7xl py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Customer Reviews</h2>
        <ProductReviews reviews={productData.reviews || []} rating={productData.rating} />
      </div>
    </div>
  );
};

export default ProductDetailPage;