import React, { createContext, useContext, useState } from 'react';

export const DrawerContext = createContext<any>(null);

export const DrawerProvider = ({ children }: any) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <DrawerContext.Provider value={{ mobileOpen, handleDrawerToggle }}>{children}</DrawerContext.Provider>
  );
};

export const useDrawer: any = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
