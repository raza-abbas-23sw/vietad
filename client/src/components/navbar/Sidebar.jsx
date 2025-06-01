import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Layers, Image, Tag, Briefcase, Building2, Home, Camera, Heart, ArrowLeft, ChevronRight } from 'lucide-react';

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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
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
        <div className="p-6 pt-14">
          {!selectedCategory ? (
            <nav>
              <h2 className="text-xl font-bold mb-6">Categories</h2>
              <ul className="space-y-4">
                {/* All Products at the top */}
                <li key={navData[0].title}>
                  <a
                    href={navData[0].link}
                    className="flex items-center gap-3 w-full text-left text-lg font-semibold text-gray-800 hover:text-blue-600 py-2 px-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={onClose}
                  >
                    <Layers className="w-6 h-6 text-blue-500" />
                    {navData[0].title}
                  </a>
                </li>
                {navData.slice(1).map((item) => {
                  const Icon = categoryIcons[item.title] || Layers;
                  return (
                    <li key={item.title}>
                      <button
                        className="flex items-center gap-3 w-full text-left text-lg font-semibold text-gray-800 hover:text-blue-600 py-2 px-2 rounded-lg hover:bg-gray-100 transition-colors justify-between"
                        onClick={() => item.items ? handleCategoryClick(item) : null}
                        disabled={!item.items}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="w-6 h-6 text-blue-500" />
                          {item.title}
                        </span>
                        {item.items && <ChevronRight className="w-5 h-5 text-gray-400" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : (
            <div>
              <button
                className="flex items-center gap-2 mb-4 text-gray-600 hover:text-blue-600 text-base font-medium"
                onClick={handleBack}
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
              <h3 className="text-lg font-bold mb-4">{selectedCategory.title}</h3>
              <ul className="space-y-2">
                {selectedCategory.items && selectedCategory.items.map((sub, idx) => (
                  <li key={idx}>
                    <span className="block text-gray-700 text-base py-1 px-2 rounded hover:bg-gray-100 cursor-pointer">
                      {sub}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar; 