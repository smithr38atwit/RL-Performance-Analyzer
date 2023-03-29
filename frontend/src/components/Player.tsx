import React from "react";
import { PlayerModel } from "../scripts/model";

// TODO: (maybe) move player component into PlayerList component to reduce file clutter
function Player({
  player,
  removePlayer,
}: {
  player: PlayerModel;
  removePlayer: (e: string) => void;
}) {
  const warningStyle = {
    display: player.hasReplays ? "none" : "inline",
  };

  return (
    <div className="player-container">
      <div className="player">
        {player.name}
        <span
          style={warningStyle}
          className="material-icons-outlined"
          title="No replays found for this player"
        >
          priority_high
        </span>
      </div>
      <button
        className="material-icons-outlined"
        onClick={() => removePlayer(player.name)}
      >
        remove_circle_outline
      </button>
    </div>
  );
}

export default Player;
