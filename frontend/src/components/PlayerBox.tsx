import React, { useEffect, useState, useRef } from "react";
import * as Api from "../scripts/api";
import { PlayerModel } from "../scripts/model";
import PlayerList from "./PlayerList";

function PlayerBox() {
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
    if (name === "") return;
    if (players.length === 3) return;
    if (players.filter((player) => player.name === name).length > 0) return;

    const response = await Api.hasReplays(name);
    const hasReplays: boolean = await response.json();

    setPlayers((prevPlayers) => {
      const newPlayers: PlayerModel[] = [
        ...prevPlayers,
        { name: name, hasReplays: hasReplays },
      ];
      return newPlayers;
    });
    playerNameRef.current!.value = "";
  }

  function removePlayer(name: string) {
    setPlayers((prevPlayers) => {
      const newPlayers = prevPlayers.filter((player) => player.name !== name);
      return newPlayers;
    });
  }

  return (
    // TODO: Change to form (?)
    <nav id="player-box">
      <input
        ref={playerNameRef}
        type="text"
        name="player-search"
        placeholder="Search..."
      />
      <button className="material-icons-outlined" onClick={addPlayer}>
        add_circle_outline
      </button>
      <PlayerList players={players} removePlayer={removePlayer} />
      <span
        id="bc-conn"
        className="material-icons bc-conn"
        title="Cannot connect to Ballchasing API"
      >
        wifi_off
      </span>
    </nav>
  );
}

export default PlayerBox;
