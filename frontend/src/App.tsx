import React from 'react';
import './styles/index.css';
import PlayerBox from './components/PlayerBox';
import Stats from './components/Stats';
import 'react-circular-progressbar/dist/styles.css';


// import PerformanceGraphs from './components/PerformanceGraphs';

function App() {
  return (
    <>
      <PlayerBox />
      <main>
        <nav>
          <a href="#player-stats">Player Statistics</a>
          <a href="#team-stats">Team Statistics</a>
        </nav>
        <Stats />
      </main>
    </>
  );
}

export default App;
