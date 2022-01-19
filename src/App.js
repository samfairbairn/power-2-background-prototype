import { useEffect } from 'react';
import Scene from './components/Scene';
import background from './components/Background';
import Header from './components/Header';
import AppProvider from './context/appContext';

function App() {

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (!isMobile) background.start();
  }, [])

  return (
    <div className="App">
      <AppProvider>
        <Header></Header>
        <Scene />
      </AppProvider>
    </div>
  );
}

export default App;
