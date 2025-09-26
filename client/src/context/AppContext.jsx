import React, { createContext, useState, useCallback, useMemo } from 'react';
import { navData } from '../components/navbar/data/dropdownData';
import { productsData, templates } from '../assets/allData/productPageData/productsData.js';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); // Initialize as empty array
  const [isSearching, setIsSearching] = useState(false);

  // Memoize the search function to prevent unnecessary re-renders
  const handleSearch = useCallback((query) => {
    if (!query || !query.trim()) {
      setSearchResults([]); // Ensure it's always an array
      setIsSearching(false);
      return;
    }

    // Only show searching state if the query is long enough
    if (query.length >= 2) {
      setIsSearching(true);
      
      // Add a small delay to prevent too frequent updates
      setTimeout(() => {
        const lowerQuery = query.toLowerCase().trim();
        
        // Search through productsData
        const productResults = productsData.filter(product =>
          product.title.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery) ||
          product.category.toLowerCase().includes(lowerQuery) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
        );

        // Search through templates
        const templateResults = (templates || []).filter(template =>
          template.title.toLowerCase().includes(lowerQuery) ||
          (template.category && template.category.toLowerCase().includes(lowerQuery))
        );

        // Combine and format results - always return an array
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

        setSearchResults(results || []); // Ensure it's always an array
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]); // Ensure it's always an array
      setIsSearching(false);
    }
  }, [productsData, templates]); // Add dependencies

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    setUser,
    navData,
    productsData,
    templates,
    searchQuery,
    setSearchQuery,
    searchResults: searchResults || [], // Ensure it's always an array
    isSearching,
    handleSearch
  }), [user, navData, productsData, templates, searchQuery, searchResults, isSearching, handleSearch]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};