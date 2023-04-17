import React, { useEffect, useState, useRef } from "react";
import { KeyboardEvent } from 'react';
import * as Api from "../scripts/api";
import { PlayerModel, PlayerStats } from "../scripts/model";
import PlayerList from "./PlayerList";

function PlayerBox(
  { setStats, setSelectedPlayer, selectedPlayer }: {
    setStats: React.Dispatch<React.SetStateAction<{ [name: string]: PlayerStats }>>,
    setSelectedPlayer: React.Dispatch<React.SetStateAction<string>>,
    selectedPlayer: string
  }) {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [waiting, setWaiting] = useState(false);
  const playerNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ping();
  }, []);

  useEffect(() => {

  }, [])


  async function ping() {
    const success: boolean = Boolean(await Api.getRoot());
    if (!success) {
      document.getElementById("bc-conn")!.style.visibility = "visible";
    }
  }

  async function addPlayer() {
    document.getElementById("error")!.style.visibility="hidden";
    setWaiting(true);
    const name = playerNameRef.current!.value;
    if (name === '' || players.length === 3 || players.filter(player => player.name === name).length > 0) {
      setWaiting(false);
      return;
    }
    const stats: PlayerStats = await Api.getReplays(name);
    const hasReplays: boolean = Boolean(stats);
    if (hasReplays) {
      setStats(prevStats => {
        const newStats = prevStats;
        newStats[name] = stats;
        return newStats;
      });
      setPlayers(prevPlayers => {
        const newPlayers: PlayerModel[] = [...prevPlayers, { name: name, hasReplays: hasReplays }];
        return newPlayers;
      });
  
      if (hasReplays) setSelectedPlayer(name);
      document.getElementById(`placeholder${players.length}`)!.style.display = "none";
      
    }
    else {
      document.getElementById("error")!.style.visibility="visible";
    }
    playerNameRef.current!.value = '';
    setWaiting(false)
  }

  function removePlayer(name: string) {
    setPlayers(prevPlayers => {
      const newPlayers = prevPlayers.filter(player => player.name !== name)
      return newPlayers;
    });

    setStats(prevStats => {
      const newStats = prevStats;
      delete newStats[name];
      console.log("New stats: ", newStats);
      return newStats;
    });
    document.getElementById(`placeholder${players.length - 1}`)!.style.display = "block";
  }

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") addPlayer();
  };

  return (
    <div id="sidebar">
      <div className="add-players">
        <input disabled={waiting} ref={playerNameRef} onKeyDown={handleKeyPress} type="text" name="player-search" placeholder="Search..." />
        <button disabled={waiting} className="material-icons-outlined" onClick={addPlayer}>add_circle_outline</button>
      </div>
      <div id="error" className="error">No replays found!</div>
      <select id="selectPlayerDropdown" value={selectedPlayer} onChange={e => setSelectedPlayer(e.target.value)} >
        <option value="" hidden>Select Player</option>
        {players.map(player => {
          return <option key={player.name} value={player.name}>{player.name}</option>
        })}
      </select>

      <PlayerList players={players} removePlayer={removePlayer} />
      <div id="placeholder0" className="placeholder"></div>
      <div id="placeholder1" className="placeholder"></div>
      <div id="placeholder2" className="placeholder"></div>
      <span id="bc-conn" className="material-icons bc-conn" title="Cannot connect to Ballchasing API">wifi_off</span>
    </div>
  );
}

export default PlayerBox;

