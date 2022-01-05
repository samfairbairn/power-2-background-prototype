import { useEffect } from 'react';
import Scene from './components/Scene';
import background from './components/Background';
import Header from './components/Header';
import AppProvider from './context/appContext';

function App() {

  useEffect(() => {
    background.start();
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
