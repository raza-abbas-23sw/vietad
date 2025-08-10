import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  isLoaded: false // Track if cart has loaded from localStorage
};

const cartReducer = (state, action) => {
  let existingItem;
  
  switch (action.type) {
    case 'ADD_TO_CART':
      existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        const updatedQuantity = existingItem.quantity + action.payload.quantity;
        if (updatedQuantity <= existingItem.availableStock) {
          const updatedItems = state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: updatedQuantity }
              : item
          );
          return {
            ...state,
            items: updatedItems,
            totalItems: state.totalItems + action.payload.quantity
          };
        }
        return state;
      }
      return {
        ...state,
        items: [
          ...state.items,
          { 
            ...action.payload,
            quantity: action.payload.quantity
          }
        ],
        totalItems: state.totalItems + action.payload.quantity
      };

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (!itemToRemove) return state;
      
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        totalItems: state.totalItems - itemToRemove.quantity
      };

    case 'LOAD_CART':
      if (!Array.isArray(action.payload)) return state;
      
      const loadedItems = action.payload.map(item => ({
        ...item,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 0,
        availableStock: Number(item.availableStock) || 0
      }));
      
      const total = loadedItems.reduce((sum, item) => sum + item.quantity, 0);
      return {
        ...state,
        items: loadedItems,
        totalItems: total,
        isLoaded: true
      };

    case 'UPDATE_QUANTITY':
      existingItem = state.items.find(item => item.id === action.payload.id);
      if (!existingItem) return state;
      
      const newQuantity = Math.max(
        1, 
        Math.min(
          Number(action.payload.quantity) || 1,
          existingItem.availableStock
        )
      );
      
      if (newQuantity === existingItem.quantity) return state;
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: newQuantity }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - existingItem.quantity + newQuantity
      };

    case 'CLEAR_CART':
      return {
        ...initialState,
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

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsed });
      } else {
        dispatch({ type: 'SET_LOADED' });
      }
    } catch (e) {
      console.error("Failed to load cart", e);
      localStorage.removeItem('cart');
      dispatch({ type: 'SET_LOADED' });
    }
  }, []);

  // Save to localStorage only after initial load
  useEffect(() => {
    if (state.isLoaded) {
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  }, [state.items, state.isLoaded]);

  const addToCart = (product) => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: {
        ...product,
        price: Number(product.price) || 0,
        quantity: Number(product.quantity) || 1,
        availableStock: Number(product.availableStock) || 0
      }
    });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id: productId, quantity: Number(quantity) || 1 } 
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        getCartCount: () => state.totalItems,
        isCartLoaded: state.isLoaded,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);