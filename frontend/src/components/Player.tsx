import React from "react";
import { PlayerModel } from "../scripts/model";

function Player({ player, removePlayer, }: { player: PlayerModel; removePlayer: (e: string) => void; }) {
  // const warningStyle = {
  //   display: player.hasReplays ? "none" : "block",
  //   color: "orange"
  // };

  return (
    <div className="player-container">
      <div className="player">
        <div className="player-text">
          {/* <span style={warningStyle} className="material-icons-outlined" title="No replays found for this player">priority_high</span> */}
          {player.name}
        </div>
      </div>
      <button className="material-icons-outlined" onClick={() => removePlayer(player.name)} >remove_circle_outline</button>
    </div>
  );
}

export default Player;
