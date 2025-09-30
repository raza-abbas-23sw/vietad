import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Layers, Image, Tag, Briefcase, Building2, Home, Camera, Heart, ArrowLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Map category titles to icons
const categoryIcons = {
  'Rigid Signs': Layers,
  'Banners & Displays': Tag,
  'Decals & Magnets': Image,
  'Trade Shows & Events': Briefcase,
  'Office Signs': Building2,
  'Outdoor Signs': Home,
  'Photo & Decor': Camera,
  'Wedding & Parties': Heart,
};

const Sidebar = ({ open, onClose }) => {
  const { navData, getProductByName } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleBack = () => {
    if (selectedSubcategory) {
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(null);
    }
  };

  // Function to handle product click and navigate to product detail
  const handleProductClick = (productName) => {
    const product = getProductByName(productName);
    
    if (product && product.slug) {
      // Navigate to product detail page
      window.location.href = `/product/${product.slug}`;
    } else {
      // Fallback to products page with search
      window.location.href = `/products?search=${encodeURIComponent(productName)}`;
    }
    
    onClose(); // Close sidebar after navigation
  };

  // Function to generate category link
  const getCategoryLink = (categoryTitle) => {
    const categorySlug = categoryTitle.toLowerCase().replace(/\s+/g, '-');
    return `/products?category=${categorySlug}`;
  };

  // Filter products to only show those that exist in productsData
  const getFilteredProducts = (products) => {
    if (!products) return [];
    return products.filter(productName => {
      const product = getProductByName(productName);
      return product !== undefined;
    });
  };

  // Filter subcategories to only show those with existing products
  const getFilteredSubcategories = (subcategories) => {
    if (!subcategories) return [];
    return subcategories.map(subcategory => ({
      ...subcategory,
      products: getFilteredProducts(subcategory.products)
    })).filter(subcategory => subcategory.products.length > 0);
  };

  // Filter categories to only show those with existing products
  const getFilteredCategories = (categories) => {
    if (!categories) return [];
    return categories.map(category => ({
      ...category,
      products: getFilteredProducts(category.products)
    })).filter(category => category.products.length > 0);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-transparent bg-backdrop bg-opacity-50 z-50 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Product Categories</h2>
            <button
              className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable container */}
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {/* Hide scrollbar for WebKit browsers */}
            <style dangerouslySetInnerHTML={{ __html: `::-webkit-scrollbar { display: none; }` }} />
            
            <div className="p-4">
              {!selectedCategory ? (
                <nav>
                  <ul className="space-y-2">
                    {/* All Products Link */}
                    {navData.length > 0 && (
                      <li key={navData[0].title}>
                        <Link
                          to="/products"
                          className="flex items-center gap-3 w-full text-left text-base font-semibold text-gray-800 hover:text-cyan-600 py-3 px-3 rounded-lg hover:bg-cyan-50 transition-all duration-200 border border-transparent hover:border-cyan-200"
                          onClick={onClose}
                        >
                          <Layers className="w-5 h-5 text-cyan-500" />
                          {navData[0].title}
                        </Link>
                      </li>
                    )}

                    {/* Other Categories */}
                    {navData.slice(1).map((item) => {
                      const Icon = categoryIcons[item.title] || Layers;
                      const hasNested = (item.categories && item.categories.length > 0) || (item.items && item.items.length > 0);
                      const filteredSubcategories = getFilteredSubcategories(item.categories);
                      const hasValidProducts = filteredSubcategories.length > 0 || getFilteredProducts(item.items).length > 0;
                      
                      if (!hasValidProducts) return null;
                      
                      return (
                        <li key={item.title}>
                          {hasNested ? (
                            <button
                              className="flex items-center gap-3 w-full text-left text-base font-semibold text-gray-800 hover:text-cyan-600 py-3 px-3 rounded-lg hover:bg-cyan-50 transition-all duration-200 border border-transparent hover:border-cyan-200 justify-between group"
                              onClick={() => handleCategoryClick(item)}
                            >
                              <span className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-cyan-500 group-hover:scale-110 transition-transform duration-200" />
                                {item.title}
                              </span>
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all duration-200" />
                            </button>
                          ) : (
                            <Link
                              to={getCategoryLink(item.title)}
                              className="flex items-center gap-3 w-full text-left text-base font-semibold text-gray-800 hover:text-cyan-600 py-3 px-3 rounded-lg hover:bg-cyan-50 transition-all duration-200 border border-transparent hover:border-cyan-200"
                              onClick={onClose}
                            >
                              <Icon className="w-5 h-5 text-cyan-500" />
                              {item.title}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              ) : !selectedSubcategory ? (
                <div>
                  {/* Back Button */}
                  <button
                    className="flex items-center gap-2 mb-4 text-cyan-600 hover:text-cyan-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-cyan-50 transition-colors duration-200 w-full text-left group"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    Back to Categories
                  </button>

                  {/* Category Title */}
                  <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
                    {(() => {
                      const Icon = categoryIcons[selectedCategory.title] || Layers;
                      return <Icon className="w-6 h-6 text-cyan-500" />;
                    })()}
                    <h3 className="text-lg font-bold text-gray-800">{selectedCategory.title}</h3>
                  </div>

                  {/* Subcategories */}
                  <ul className="space-y-1">
                    {getFilteredSubcategories(selectedCategory.categories).map((subcategory) => (
                      <li key={subcategory.title}>
                        <button
                          className="flex items-center justify-between w-full text-left text-gray-700 text-sm py-2.5 px-3 rounded-lg hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 border border-transparent hover:border-cyan-200 group"
                          onClick={() => handleSubcategoryClick(subcategory)}
                        >
                          <span className="font-medium">{subcategory.title}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all duration-200" />
                        </button>
                      </li>
                    ))}
                    
                    {/* Direct items in category */}
                    {getFilteredProducts(selectedCategory.items).map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => handleProductClick(item)}
                          className="block w-full text-left text-gray-700 text-sm py-2.5 px-3 rounded-lg hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 border border-transparent hover:border-cyan-200"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  {/* Back Button */}
                  <button
                    className="flex items-center gap-2 mb-4 text-cyan-600 hover:text-cyan-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-cyan-50 transition-colors duration-200 w-full text-left group"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    Back to {selectedCategory.title}
                  </button>

                  {/* Subcategory Title */}
                  <div className="mb-4 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
                    <h3 className="text-lg font-bold text-gray-800">{selectedSubcategory.title}</h3>
                  </div>

                  {/* Products */}
                  <ul className="space-y-1">
                    {getFilteredProducts(selectedSubcategory.products).map((product, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => handleProductClick(product)}
                          className="block w-full text-left text-gray-700 text-sm py-2.5 px-3 rounded-lg hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 border border-transparent hover:border-cyan-200 hover:translate-x-1"
                        >
                          {product}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-center">
              <p className="text-sm text-gray-600">Need help? Contact us</p>
              <Link 
                to="/contact" 
                className="inline-block mt-2 text-cyan-600 hover:text-cyan-700 text-sm font-medium"
                onClick={onClose}
              >
                Get Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;