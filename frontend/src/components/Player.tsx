import React from 'react';
import { PlayerModel } from '../scripts/model';

function Player({ player, removePlayer }: { player: PlayerModel, removePlayer: (e: string) => void }) {
    return (
        <div className='player-container'>
            <div className='player'>{player.name}</div>
            <button onClick={() => removePlayer(player.name)}>Remove</button>
        </div>
    );
}

export default Player;