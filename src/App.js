import { useEffect } from 'react';
import Scene from './components/Scene';
import background from './components/Background';

function App() {

  useEffect(() => {
    background.start();
  }, [])

  return (
    <div className="App">
      <Scene />
    </div>
  );
}

export default App;
