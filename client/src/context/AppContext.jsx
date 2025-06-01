import React, { createContext, useState } from 'react';
import { navData } from '../components/navbar/data/dropdownData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser, navData }}>
      {children}
    </AppContext.Provider>
  );
}; 