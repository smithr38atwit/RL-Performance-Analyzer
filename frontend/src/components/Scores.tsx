import React from "react";

function Scores() {
    return (
        <section id="player-scores">
            <span id="offense" className="score">90</span>
            <span id="defense" className="score">90</span>
            <span id="overall" className="score">90</span>
            <div id="score-labels">
                <span>Offense</span>
                <span>Defense</span>
                <span>Overall</span>
            </div>
        </section>
    );
}

export default Scores;