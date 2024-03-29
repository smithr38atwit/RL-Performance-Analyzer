import React, { useState } from 'react';
import './styles/main.css';
import PlayerBox from './components/PlayerBox';
import Stats from './components/Stats';
import 'react-circular-progressbar/dist/styles.css';
import { PlayerStats } from './scripts/model';


function App() {
  const [stats, setStats] = useState<{ [name: string]: PlayerStats }>({
    '': {
      'offense': 0, 'defense': 0, 'overall': 0,
      'replay_details': { 'map_name': 'Map Name', 'result': { 'player_team': 0, 'opp_team': 0 }, 'match_time': 0, 'playlist': '', 'replay_name': '', 'replay_id': '' },
      'stat_vals': { 'off_vals': [], 'def_vals': [] }
    }
  });
  const [selectedPlayer, setSelectedPlayer] = useState('');

  return (
    <>
      <PlayerBox setStats={setStats} setSelectedPlayer={setSelectedPlayer} selectedPlayer={selectedPlayer} />
      <main id='stats'>
        <Stats stats={stats} name={selectedPlayer} />
      </main>
    </>
  );
}

export default App;
