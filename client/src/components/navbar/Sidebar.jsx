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
  const { navData } = useContext(AppContext);
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

  // Function to generate product category link
  const getCategoryLink = (categoryTitle) => {
    return `/products/${categoryTitle.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button
          className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-red-500 focus:outline-none"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          &times;
        </button>
        {/* Scrollable container */}
        <div className="h-full flex flex-col">
          <div className="p-6 pt-14 flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {/* Hide scrollbar for WebKit browsers */}
            <style dangerouslySetInnerHTML={{ __html: `::-webkit-scrollbar { display: none; }` }} />
            
            {!selectedCategory ? (
              <nav>
                <h2 className="text-xl font-bold mb-6">Product Categories</h2>
                <ul className="space-y-4">
                  {/* Explicitly handle the first item as a direct link to products page */}
                  {navData.length > 0 && (
                    <li key={navData[0].title}>
                      <Link
                        to="/products"
                        className="flex items-center gap-3 w-full text-left text-lg font-semibold text-gray-800 hover:text-cyan-600 py-2 px-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={onClose} // Close sidebar on click
                      >
                        {/* You might want to use a specific icon for All Products if available, otherwise Layers is fine */}
                        <Layers className="w-6 h-6 text-cyan-500" />
                        {navData[0].title} {/* Use the actual title from navData */}
                      </Link>
                    </li>
                  )}

                  {/* Iterate over the rest of navData items for other categories */}
                  {navData.slice(1).map((item) => {
                    const Icon = categoryIcons[item.title] || Layers;
                    const hasNested = (item.categories && item.categories.length > 0) || (item.items && item.items.length > 0);
                    
                    return (
                      <li key={item.title}>
                        {hasNested ? (
                          <button
                            className="flex items-center gap-3 w-full text-left text-lg font-semibold text-gray-800 hover:text-cyan-600 py-2 px-2 rounded-lg hover:bg-gray-100 transition-colors justify-between"
                            onClick={() => handleCategoryClick(item)}
                          >
                            <span className="flex items-center gap-3">
                              <Icon className="w-6 h-6 text-cyan-500" />
                              {item.title}
                            </span>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </button>
                        ) : (
                          <Link
                            to={getCategoryLink(item.title)}
                            className="flex items-center gap-3 w-full text-left text-lg font-semibold text-gray-800 hover:text-cyan-600 py-2 px-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={onClose}
                          >
                            <Icon className="w-6 h-6 text-cyan-500" />
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
                <button
                  className="flex items-center gap-2 mb-4 text-gray-600 hover:text-cyan-600 text-base font-medium"
                  onClick={handleBack}
                >
                  <ArrowLeft className="w-5 h-5" /> Back
                </button>
                <h3 className="text-lg font-bold mb-4">{selectedCategory.title}</h3>
                <ul className="space-y-2">
                  {selectedCategory.categories?.map((subcategory) => (
                    <li key={subcategory.title}>
                      <button
                        className="flex items-center justify-between w-full text-left text-gray-700 text-base py-2 px-2 rounded hover:bg-gray-100"
                        onClick={() => handleSubcategoryClick(subcategory)}
                      >
                        <span>{subcategory.title}</span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                    </li>
                  ))}
                  {selectedCategory.items?.map((item, idx) => (
                    <li key={idx}>
                      <Link // Changed from a to Link
                        to={`/products/${selectedCategory.title.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block text-gray-700 text-base py-2 px-2 rounded hover:bg-gray-100"
                        onClick={onClose}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <button
                  className="flex items-center gap-2 mb-4 text-gray-600 hover:text-cyan-600 text-base font-medium"
                  onClick={handleBack}
                >
                  <ArrowLeft className="w-5 h-5" /> Back
                </button>
                <h3 className="text-lg font-bold mb-2">{selectedSubcategory.title}</h3>
                <ul className="space-y-1">
                  {selectedSubcategory.products?.map((product, idx) => (
                    <li key={idx}>
                      <Link // Changed from a to Link
                        to={`/products/${selectedCategory.title.toLowerCase().replace(/\s+/g, '-')}/${product.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block text-gray-700 text-sm py-1.5 px-2 rounded hover:bg-gray-100"
                        onClick={onClose}
                      >
                        {product}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;