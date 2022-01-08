import React, { createContext, useState } from "react";

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [lightMode, setLightMode] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [scroll, setScroll] = useState(undefined);

  
  return (
    <AppContext.Provider value={{lightMode, setLightMode, scrollPos, setScrollPos, setScroll, scroll}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;