import React from 'react';
import './styles/index.css';
import PlayerBox from './components/PlayerBox';
import Scores from './components/Scores';
import PerformanceGraphs from './components/PerformanceGraphs';

function App() {
  return (
    <>
      <PlayerBox />
      <main>
        <Scores />
        <PerformanceGraphs />
      </main>
    </>
  );
}

export default App;
