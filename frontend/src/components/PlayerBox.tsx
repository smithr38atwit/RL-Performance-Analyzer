import React, { useEffect, useState, useRef } from "react";
import { KeyboardEvent } from 'react';
import * as Api from "../scripts/api";
import { PlayerModel } from "../scripts/model";
import PlayerList from "./PlayerList";

function PlayerBox({ setStats }: { setStats: React.Dispatch<React.SetStateAction<any>> }) {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const playerNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ping();
  }, []);

  async function ping() {
    const response = await Api.getRoot();
    const success: boolean = await response.json();

    if (!success) {
      document.getElementById("bc-conn")!.style.visibility = "visible";
    }
  }

  async function addPlayer() {
    const name = playerNameRef.current!.value;
    if (name === '' || players.length === 3 || players.filter(player => player.name === name).length > 0) return;

    const response = await Api.getReplays(name);
    const hasReplays: boolean = await response.json();
    /*let data;
    if (hasReplays) {
      data = await response.json()
      setStats(data);
    }*/


    setPlayers(prevPlayers => {
      const newPlayers: PlayerModel[] = [...prevPlayers, { name: name, hasReplays: hasReplays }];
      return newPlayers;
    })
    playerNameRef.current!.value = '';
    console.log(`Number of players: ${players.length}`);
    document.getElementById(`placeholder${players.length}`)!.style.display = "none";
  }

  function removePlayer(name: string) {
    setPlayers(prevPlayers => {
      const newPlayers = prevPlayers.filter(player => player.name !== name)
      return newPlayers;
    })
    console.log(`Number of players: ${players.length}`);
    document.getElementById(`placeholder${players.length - 1}`)!.style.display = "block";
  }

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") addPlayer();
  };

  return (
    <nav id="player-box">
      <div className="player-add">
        <input ref={playerNameRef} onKeyDown={handleKeyPress} type="text" name="player-search" placeholder="Search..." />
        <button className="material-icons-outlined" onClick={addPlayer}>add_circle_outline</button>
      </div>
      <PlayerList players={players} removePlayer={removePlayer} />
      <div id="placeholder0" className="placeholder"></div>
      <div id="placeholder1" className="placeholder"></div>
      <div id="placeholder2" className="placeholder"></div>
      <span id="bc-conn" className="material-icons bc-conn" title="Cannot connect to Ballchasing API">wifi_off</span>
    </nav>
  );
}

export default PlayerBox;

