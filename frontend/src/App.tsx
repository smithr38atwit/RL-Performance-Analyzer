import React, { useState } from 'react';
import './styles/main.css';
import PlayerBox from './components/PlayerBox';
import Stats from './components/Stats';
import 'react-circular-progressbar/dist/styles.css';
import { PlayerStats } from './scripts/model';


// import PerformanceGraphs from './components/PerformanceGraphs';

function App() {
  const [stats, setStats] = useState<PlayerStats>({ 'offense': 0, 'defense': 0, 'overall': 0 });

  return (
    <>
      <PlayerBox setStats={setStats} />
      <main id='stats'>
        <nav>
          <a href="#player-stats">Player Statistics</a>
        </nav>
        <Stats stats={stats} />
      </main>
    </>
  );
}

export default App;
