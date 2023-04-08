import React, { useEffect, useState, useRef } from "react";
import { KeyboardEvent } from 'react';
import * as Api from "../scripts/api";
import { PlayerModel } from "../scripts/model";
import PlayerList from "./PlayerList";

function PlayerBox({ setStats }: { setStats: React.Dispatch<React.SetStateAction<any>> }) {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [waiting, setWaiting] = useState(false);
  const playerNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ping();
  }, []);

  async function ping() {
    const success: boolean = Boolean(await Api.getRoot());
    if (!success) {
      document.getElementById("bc-conn")!.style.visibility = "visible";
    }
  }

  async function addPlayer() {
    setWaiting(true);
    const name = playerNameRef.current!.value;
    if (name === '' || players.length === 3 || players.filter(player => player.name === name).length > 0) {
      setWaiting(false);
      return;
    }
    const replay = await Api.getReplays(name);
    const hasReplays: boolean = Boolean(replay);
    if (hasReplays) {
      setStats(replay);
    }

    setPlayers(prevPlayers => {
      const newPlayers: PlayerModel[] = [...prevPlayers, { name: name, hasReplays: hasReplays }];
      return newPlayers;
    })
    playerNameRef.current!.value = '';
    document.getElementById(`placeholder${players.length}`)!.style.display = "none";
    setWaiting(false)
  }

  function removePlayer(name: string) {
    setPlayers(prevPlayers => {
      const newPlayers = prevPlayers.filter(player => player.name !== name)
      return newPlayers;
    })
    document.getElementById(`placeholder${players.length - 1}`)!.style.display = "block";
  }

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") addPlayer();
  };

  function selectPlayer(){

  }
  return (
    <div id="sidebar">
      <div className="add-players">
        <input disabled={waiting} ref={playerNameRef} onKeyDown={handleKeyPress} type="text" name="player-search" placeholder="Search..." />
        <button disabled={waiting} className="material-icons-outlined" onClick={addPlayer}>add_circle_outline</button>
      </div>

      <select id = "selectPlayerDropdown" onChange = {selectPlayer} >  
      <option> ---Choose Player--- </option>  
      <option> Player 1</option>  
      <option> Player 2 </option>   
      <option> Player 3 </option>   
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

