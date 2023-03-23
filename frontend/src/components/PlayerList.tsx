import React, { useEffect } from 'react';
import getRoot from '../scripts/api';
import { Ping } from '../scripts/model';

function PlayerList() {

    useEffect(() => {
        getRoot()
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

    return (
        <nav>
            <input type="text" name="player-search" placeholder="Search..." />
            <div id="player-1" className="player"><span>Player 1</span></div>
            <div id="player-2" className="player"><span>Player 2</span></div>
            <div id="player-3" className="player"><span>Player 3</span></div>
            <span id="bc-conn" className="material-icons bc-conn" title="Cannot connect to Ballchasing API">wifi_off</span>
        </nav>
    );
}

export default PlayerList;