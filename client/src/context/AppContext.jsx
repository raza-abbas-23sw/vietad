import React, { createContext, useState, useCallback, useMemo } from 'react';
import { navData } from '../components/navbar/data/dropdownData';
import { productsData } from '../assets/allData/productPageData/productsData.js';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Memoize the search function to prevent unnecessary re-renders
  const handleSearch = useCallback((query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Only show searching state if the query is long enough
    if (query.length >= 2) {
      setIsSearching(true);
      
      // Add a small delay to prevent too frequent updates
      setTimeout(() => {
        // Search through productsData directly
        const results = productsData.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        // Group results by category (optional, but might be useful)
        const groupedResults = results.reduce((acc, product) => {
          const categoryName = product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          const existingCategory = acc.find(item => item.category === categoryName);

          if (existingCategory) {
            existingCategory.products.push(product);
          } else {
            acc.push({ category: categoryName, products: [product] });
          }
          return acc;
        }, []);

        setSearchResults(groupedResults);
        setIsSearching(false);
      }, 300); // 300ms delay
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, []); // Add productsData to the dependency array if it can change

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    setUser,
    navData,
    productsData, // Add productsData here
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    handleSearch
  }), [user, navData, productsData, searchQuery, searchResults, isSearching, handleSearch]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}; 