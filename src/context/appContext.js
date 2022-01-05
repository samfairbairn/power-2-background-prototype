import React, { createContext, useState } from "react";

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [lightMode, setLightMode] = useState(false);
  
  return (
    <AppContext.Provider value={{lightMode, setLightMode}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;