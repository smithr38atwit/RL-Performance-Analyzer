import React from 'react';
import Player from './Player';
import { PlayerModel } from '../scripts/model';

function PlayerList({ players, removePlayer }: { players: PlayerModel[], removePlayer: (e: string) => void }) {
    return (
        <div id="todoList">
            {players.map(player => {
                return <Player key={player.name} player={player} removePlayer={removePlayer} />
            })}
        </div>
    );
}

export default PlayerList;