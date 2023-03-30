import React from 'react';
import './styles/index.css';
import PlayerBox from './components/PlayerBox';
import Scores from './components/Stats';
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
        <Scores />
      </main>
    </>
  );
}

export default App;
