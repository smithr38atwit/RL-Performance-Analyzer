import React from "react";

function Stats() {
    return (
        <section id="player-stats">
            <div id="main-scores" className="scores">
                <span id="offense" className="score">Score</span>
                <span id="defense" className="score">Score</span>
                <span id="overall" className="score">Score</span>
                <span className="score-label">Offense</span>
                <span className="score-label">Defense</span>
                <span className="score-label">Overall</span>
            </div>
        </section>
    );
}

export default Stats;