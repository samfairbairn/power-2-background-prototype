import React, { createContext, useState, useEffect, useRef } from "react";

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [lightMode, setLightMode] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [scroll, setScroll] = useState(undefined);
  const [screenRatio, setScreenRatio] = useState(undefined);
  const [isMobile, setIsMobile] = useState(undefined);

  let resizeTimer = useRef()

  const onResize = (e) => {
    if (resizeTimer.current) {
      clearTimeout(resizeTimer.current)
      resizeTimer.current = undefined
    }
    resizeTimer.current = setTimeout(() => {
      clearTimeout(resizeTimer.current)
      resizeTimer.current = undefined
      setScreenRatio(window.innerWidth / window.innerHeight)
    }, 500)
  }

  useEffect(() => {
    setScreenRatio(window.innerWidth / window.innerHeight)
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    window.addEventListener('resize', onResize)
  }, [])
  
  return (
    <AppContext.Provider value={{lightMode, setLightMode, scrollPos, setScrollPos, setScroll, scroll}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;