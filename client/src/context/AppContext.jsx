import React, { createContext, useState, useCallback, useMemo } from 'react';
import { navData } from '../components/navbar/data/dropdownData';

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
        // Search through categories and products
        const results = navData.flatMap(category => {
          const categoryMatch = category.name.toLowerCase().includes(query.toLowerCase());
          const productMatches = category.products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
          );

          if (categoryMatch || productMatches.length > 0) {
            return [{
              category: category.name,
              products: productMatches
            }];
          }
          return [];
        });

        setSearchResults(results);
        setIsSearching(false);
      }, 300); // 300ms delay
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    setUser,
    navData,
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    handleSearch
  }), [user, searchQuery, searchResults, isSearching, handleSearch]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}; 