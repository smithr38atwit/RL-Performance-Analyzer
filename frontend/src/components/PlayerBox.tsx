import React, { useEffect, useState, useRef } from 'react';
import { KeyboardEvent } from 'react';
import * as Api from '../scripts/api';
import { PlayerModel } from '../scripts/model';
import PlayerList from './PlayerList';

function PlayerBox() {
    const [players, setPlayers] = useState<PlayerModel[]>([]);
    const playerNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        ping();
    }, [])

    async function ping() {
        const response = await Api.getRoot();
        const success: boolean = await response.json();

        if (!success) {
            document.getElementById("bc-conn")!.style.visibility = "visible";
        }
    }

    async function addPlayer() {
        const name = playerNameRef.current!.value;
        if (name === '') return;
        if (players.length === 3) return;
        if (players.filter(player => player.name === name).length > 0) return;

        document.getElementById("placeholder"+players.length)!.style.display = "none";
        const response = await Api.hasReplays(name)
        const hasReplays: boolean = await response.json()


        setPlayers(prevPlayers => {
            const newPlayers: PlayerModel[] = [...prevPlayers, { name: name, hasReplays: hasReplays }];
            return newPlayers;
        })
        playerNameRef.current!.value = '';
    }

    function removePlayer(name: string) {
        setPlayers(prevPlayers => {
            const newPlayers = prevPlayers.filter(player => player.name !== name)
            return newPlayers;
        })
        document.getElementById("placeholder"+players.length)!.style.display = "block";
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key == "Enter"){
            addPlayer();
        }
     };
    return (
        // TODO: Change to form (?)
        <nav id='player-box'>
            <input ref={playerNameRef} onKeyDown={handleKeyPress} type="text" name="player-search" placeholder="Search..." />
            <button 
                onClick={addPlayer}>Add player</button>
            <PlayerList players={players} removePlayer={removePlayer} />
            <div id = "placeholder0" className = "placeholder"> </div>
            <div id = "placeholder1" className = "placeholder"> </div>
            <div id = "palceholder2" className = "placeholder"> </div>  
            {/* <div id="filters">
                <h3>Filters</h3>
                <input type="checkbox" name="filters[]" id="filter1" value={1} />
                <label htmlFor="filter1">Filter 1</label><br />
                <input type="checkbox" name="filters[]" id="filter2" value={2} />
                <label htmlFor="filter2">Filter 2</label><br />
                <input type="checkbox" name="filters[]" id="filter3" value={3} />
                <label htmlFor="filter3">Filter 3</label><br />
            </div> */}
            <span id="bc-conn" className="material-icons bc-conn" title="Cannot connect to Ballchasing API">wifi_off</span>
        </nav>
    );
}

export default PlayerBox;