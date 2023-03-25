import React, { useEffect, useState, useRef } from 'react';
import getRoot from '../scripts/api';
import { Ping, PlayerModel } from '../scripts/model';
import PlayerList from './PlayerList';

function PlayerBox() {
    const [players, setPlayers] = useState<PlayerModel[]>([]);
    const playerNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getRoot() //FIXME: Ping data type not needed; rework so that error icon state is based only on reponse status 
            .then(async response => {
                if (!response.ok) {
                    const data: Ping = await response.json();
                    console.log(data.message);
                    throw new Error(data.error ?? '');
                }
                return response.json();
            })
            .then((data: Ping) => {
                console.debug("--- GET: http://127.0.0.1:8000 ---");
                console.log(data.message);
            })
            .catch(error => {
                document.getElementById("bc-conn")!.style.visibility = "visible";
                console.debug(error);
            })
    }, [])


    function addPlayer() {
        const name = playerNameRef.current!.value;
        if (name === '') return;
        setPlayers(prevPlayers => {
            if (prevPlayers.length == 3) return prevPlayers;
            if (prevPlayers.filter(player => player.name === name).length > 0) return prevPlayers;
            const newPlayers: PlayerModel[] = [...prevPlayers, { name: name }];
            return newPlayers;
        })
        playerNameRef.current!.value = '';
    }

    function removePlayer(name: string) {
        setPlayers(prevPlayers => {
            const newPlayers = prevPlayers.filter(player => player.name !== name)
            return newPlayers;
        })
    }

    return (
        <nav>
            <input ref={playerNameRef} type="text" name="player-search" placeholder="Search..." />
            <button onClick={addPlayer}>Add player</button>
            <PlayerList players={players} removePlayer={removePlayer} />
            {/* <div id="player-1" className="player"><span>Player 1</span></div>
            <div id="player-2" className="player"><span>Player 2</span></div>
            <div id="player-3" className="player"><span>Player 3</span></div> */}
            <span id="bc-conn" className="material-icons bc-conn" title="Cannot connect to Ballchasing API">wifi_off</span>
        </nav>
    );
}

export default PlayerBox;