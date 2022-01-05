import React, { createContext, useState } from "react";

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [lightMode, setLightMode] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  
  return (
    <AppContext.Provider value={{lightMode, setLightMode, scrollPos, setScrollPos}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;