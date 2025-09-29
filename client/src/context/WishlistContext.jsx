import React, { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  isLoaded: false // Track if wishlist has loaded from storage
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state;
      }
      const newItems = [...state.items, action.payload];
      return {
        ...state,
        items: newItems,
        totalItems: newItems.length
      };

    case 'REMOVE_FROM_WISHLIST':
      const remainingItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: remainingItems,
        totalItems: remainingItems.length
      };

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
        totalItems: 0
      };

    case 'LOAD_WISHLIST':
      if (!Array.isArray(action.payload)) return state;
      
      return {
        ...state,
        items: action.payload,
        totalItems: action.payload.length,
        isLoaded: true
      };

    case 'SET_LOADED':
      return {
        ...state,
        isLoaded: true
      };

    default:
      return state;
  }
};

export const WishlistProvider = ({ children, storageType = 'sessionStorage' }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Get the appropriate storage based on type
  const storage = storageType === 'localStorage' ? localStorage : sessionStorage;

  // Load wishlist from storage on initial render
  useEffect(() => {
    try {
      const savedWishlist = storage.getItem('wishlist');
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        dispatch({ type: 'LOAD_WISHLIST', payload: parsedWishlist });
      } else {
        dispatch({ type: 'SET_LOADED' });
      }
    } catch (error) {
      console.error('Failed to load wishlist from storage:', error);
      storage.removeItem('wishlist');
      dispatch({ type: 'SET_LOADED' });
    }
  }, [storage]);

  // Save wishlist to storage whenever it changes (only after initial load)
  useEffect(() => {
    if (state.isLoaded) {
      try {
        storage.setItem('wishlist', JSON.stringify(state.items));
      } catch (error) {
        console.error('Failed to save wishlist to storage:', error);
      }
    }
  }, [state.items, state.isLoaded, storage]);

  const addToWishlist = (product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const getWishlistCount = () => {
    return state.totalItems;
  };

  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: state.items,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        getWishlistCount,
        isInWishlist,
        isWishlistLoaded: state.isLoaded
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};