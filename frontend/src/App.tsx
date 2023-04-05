import React, { useState } from 'react';
import './styles/main.css';
import PlayerBox from './components/PlayerBox';
import Stats from './components/Stats';
import 'react-circular-progressbar/dist/styles.css';


// import PerformanceGraphs from './components/PerformanceGraphs';

function App() {
  const [stats, setStats] = useState([]);

  return (
    <>
      <PlayerBox setStats={setStats} />
      <main id='stats'>
        <nav>
          <a href="#player-stats">Player Statistics</a>
          <a href="#team-stats">Team Statistics</a>
        </nav>
        <Stats stats={stats} />
      </main>
    </>
  );
}

export default App;
