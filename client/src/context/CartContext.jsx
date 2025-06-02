import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  let existingItem;
  
  switch (action.type) {
    case 'ADD_TO_CART':
      existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If item exists, increase quantity if within stock limit
        // Ensure existing quantity and payload quantity are numbers
        const updatedQuantity = Number(existingItem.quantity) + Number(action.payload.quantity) || 0;
        const availableStock = Number(action.payload.availableStock) || Infinity; // Treat missing stock as infinite for safety

        if (updatedQuantity <= availableStock) {
          return {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: updatedQuantity, price: Number(item.price) || 0 }
                : item
            ),
          };
        }
        return state; // If stock limit reached, return unchanged state
      }
      // If item doesn't exist, add it with the specified quantity
      // Ensure price and quantity are numbers
      return {
        ...state,
        items: [...state.items, { ...action.payload, price: Number(action.payload.price) || 0, quantity: Number(action.payload.quantity) || 0 }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                // Ensure updated quantity is a number
                quantity: Math.min(
                  Math.max(1, Number(action.payload.quantity) || 0),
                  Number(item.availableStock) || Infinity // Ensure availableStock is number
                ),
                 // Ensure price remains a number
                 price: Number(item.price) || 0
              }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce(
      (total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
      0
    );
  };

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 