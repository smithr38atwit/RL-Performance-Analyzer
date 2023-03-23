import React from 'react';
import './styles/index.css';
import PlayerList from './components/PlayerList';
import Scores from './components/Scores';
import PerformanceGraphs from './components/PerformanceGraphs';

function App() {
  return (
    <>
      <PlayerList />
      <main>
        <Scores />
        <PerformanceGraphs />
      </main>
    </>
  );
}

export default App;
