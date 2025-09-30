import React, { createContext, useState, useCallback, useMemo } from 'react';
import { navData } from '../components/navbar/data/dropdownData';
import { productsData, templates } from '../assets/allData/productPageData/productsData.js';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Create a product mapping to connect dropdown names to actual products
  const productMapping = useMemo(() => {
    const mapping = {};
    
    // Map common product names to actual product slugs
    productsData.forEach(product => {
      // Add the main title
      mapping[product.title.toLowerCase()] = product.slug;
      
      // Add variations that might appear in dropdown
      if (product.title.includes('Signs')) {
        mapping[product.title.replace('Signs', 'Sign').toLowerCase()] = product.slug;
      }
      if (product.title.includes('Decals')) {
        mapping[product.title.replace('Decals', 'Decal').toLowerCase()] = product.slug;
      }
      if (product.title.includes('Banners')) {
        mapping[product.title.replace('Banners', 'Banner').toLowerCase()] = product.slug;
      }
      if (product.title.includes('Prints')) {
        mapping[product.title.replace('Prints', 'Print').toLowerCase()] = product.slug;
      }
    });

    // Add specific mappings for common dropdown items
    mapping['aluminum signs'] = 'aluminum-signs';
    mapping['aluminum sign'] = 'aluminum-signs';
    mapping['yard signs'] = 'yard-signs';
    mapping['yard sign'] = 'yard-signs';
    mapping['foam board signs'] = 'foam-board-signs';
    mapping['foam board sign'] = 'foam-board-signs';
    mapping['truck decals'] = 'track-decals'; // Note: your data has 'track-decals' not 'truck-decals'
    mapping['truck decal'] = 'track-decals';
    mapping['tabletop retractable banners'] = 'tabletop-retractable-banners';
    mapping['tabletop banner'] = 'tabletop-retractable-banners';
    mapping['acrylic signs'] = 'acrylic-signs';
    mapping['acrylic sign'] = 'acrylic-signs';
    mapping['vinyl banners'] = 'vinyl-banners';
    mapping['vinyl banner'] = 'vinyl-banners';
    mapping['retractable banners'] = 'retractable-banners';
    mapping['retractable banner'] = 'retractable-banners';
    mapping['metal photo prints'] = 'metal-photo-prints';
    mapping['metal photo print'] = 'metal-photo-prints';
    mapping['acrylic photo prints'] = 'acrylic-photo-prints';
    mapping['acrylic photo print'] = 'acrylic-photo-prints';
    mapping['pvc signs'] = 'pvc-signs';
    mapping['pvc sign'] = 'pvc-signs';
    mapping['wall decals'] = 'wall-decals';
    mapping['wall decal'] = 'wall-decals';

    return mapping;
  }, []);

  // Enhanced function to get product by name
  const getProductByName = useCallback((productName) => {
    const normalizedProductName = productName.toLowerCase().trim();
    
    // First try the mapping
    const mappedSlug = productMapping[normalizedProductName];
    if (mappedSlug) {
      const product = productsData.find(p => p.slug === mappedSlug);
      if (product) return product;
    }
    
    // Try exact match
    let product = productsData.find(product => 
      product.title.toLowerCase() === normalizedProductName
    );
    
    // If no exact match, try partial match
    if (!product) {
      product = productsData.find(product => 
        product.title.toLowerCase().includes(normalizedProductName) ||
        normalizedProductName.includes(product.title.toLowerCase())
      );
    }
    
    // Try matching by removing common suffixes
    if (!product) {
      const simplifiedName = normalizedProductName
        .replace(/signs?/gi, '')
        .replace(/decals?/gi, '')
        .replace(/banners?/gi, '')
        .replace(/prints?/gi, '')
        .trim();
      
      product = productsData.find(p => 
        p.title.toLowerCase().includes(simplifiedName) ||
        simplifiedName.includes(p.title.toLowerCase().replace(/signs?|decals?|banners?|prints?/gi, '').trim())
      );
    }
    
    return product;
  }, [productMapping]);

  // Function to get product by slug
  const getProductBySlug = useCallback((slug) => {
    return productsData.find(product => 
      product.slug.toLowerCase() === slug.toLowerCase()
    );
  }, []);

  // Function to get all products for a category
  const getProductsByCategory = useCallback((categoryName) => {
    const normalizedCategory = categoryName.toLowerCase().trim();
    return productsData.filter(product => 
      product.category.toLowerCase().includes(normalizedCategory) ||
      normalizedCategory.includes(product.category.toLowerCase())
    );
  }, []);

  // Memoize the search function
  const handleSearch = useCallback((query) => {
    if (!query || !query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    if (query.length >= 2) {
      setIsSearching(true);
      
      setTimeout(() => {
        const lowerQuery = query.toLowerCase().trim();
        
        const productResults = productsData.filter(product =>
          product.title.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery) ||
          product.category.toLowerCase().includes(lowerQuery) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
        );

        const templateResults = (templates || []).filter(template =>
          template.title.toLowerCase().includes(lowerQuery) ||
          (template.category && template.category.toLowerCase().includes(lowerQuery))
        );

        const results = [];
        
        if (productResults.length > 0) {
          results.push({
            type: 'products',
            title: 'Products',
            items: productResults.map(product => ({
              id: product.id,
              name: product.title,
              category: product.category,
              slug: product.slug,
              price: product.price,
              img: product.img,
              description: product.description
            }))
          });
        }

        if (templateResults.length > 0) {
          results.push({
            type: 'templates',
            title: 'Templates',
            items: templateResults.map(template => ({
              id: template.id,
              name: template.title,
              category: template.category,
              img: template.img
            }))
          });
        }

        setSearchResults(results || []);
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [productsData, templates]);

  // Memoize the context value
  const contextValue = useMemo(() => ({
    user,
    setUser,
    navData,
    productsData,
    templates,
    searchQuery,
    setSearchQuery,
    searchResults: searchResults || [],
    isSearching,
    handleSearch,
    getProductByName,
    getProductBySlug,
    getProductsByCategory,
    productMapping
  }), [
    user, 
    navData, 
    productsData, 
    templates, 
    searchQuery, 
    searchResults, 
    isSearching, 
    handleSearch, 
    getProductByName, 
    getProductBySlug,
    getProductsByCategory,
    productMapping
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};