import { useEffect } from 'react';
import Scene from './components/Scene';
import background from './components/Background';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import AppProvider from './context/appContext';
import ReactGA from "react-ga";

function App() {

  useEffect(() => {
    ReactGA.initialize('UA-217830386-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!isMobile && !isSafari) background.start();
  }, [])

  return (
    <div className="App">
      <AppProvider>
        <Header />
        <Scene />
        <MobileMenu />
      </AppProvider>
    </div>
  );
}

export default App;
