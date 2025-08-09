import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0
};

const cartReducer = (state, action) => {
  let existingItem;
  let updatedItems;
  let newItems;
  let remainingItems;
  let newTotalAmount;
  
  switch (action.type) {
    case 'ADD_TO_CART':
      existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        const updatedQuantity = Number(existingItem.quantity) + Number(action.payload.quantity) || 0;
        const availableStock = Number(action.payload.availableStock) || Infinity;

        if (updatedQuantity <= availableStock) {
          updatedItems = state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: updatedQuantity, price: Math.round(Number(item.price) * 100) || 0 }
              : item
          );
          newTotalAmount = updatedItems.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
          return {
            ...state,
            items: updatedItems,
            totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
            totalAmount: newTotalAmount
          };
        }
        return state;
      }
      newItems = [...state.items, { 
        ...action.payload, 
        price: Math.round(Number(action.payload.price) * 100) || 0, 
        quantity: Number(action.payload.quantity) || 0 
      }];
      newTotalAmount = newItems.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((total, item) => total + item.quantity, 0),
        totalAmount: newTotalAmount
      };

    case 'REMOVE_FROM_CART':
      remainingItems = state.items.filter(item => item.id !== action.payload);
      newTotalAmount = remainingItems.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
      return {
        ...state,
        items: remainingItems,
        totalItems: remainingItems.reduce((total, item) => total + item.quantity, 0),
        totalAmount: newTotalAmount
      };

    case 'UPDATE_QUANTITY':
      updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: Math.min(
                Math.max(1, Number(action.payload.quantity) || 0),
                Number(item.availableStock) || Infinity
              ),
              price: Math.round(Number(item.price) * 100) || 0
            }
          : item
      );
      newTotalAmount = updatedItems.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalAmount: newTotalAmount
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalAmount: 0
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      dispatch({ type: 'LOAD_CART', payload: parsedCart });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

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

  return (
    <CartContext.Provider
      value={{
        cartState: state, // This provides the entire cart state as a single object
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
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