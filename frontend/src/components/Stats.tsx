import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Stats() {
    const percentage = 66;
    return (
        <section id="player-stats">
            <div id="main-scores" className="scores">
                <div >
                    <CircularProgressbar styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 0.25,
                        // Text size
                        textSize: '16px',
                        // Colors
                        pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                        textColor: '#f88',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',})}
                        className="dial-offense" value={percentage} text={`${percentage}%`} />
                    <p className="score-label">Offense</p>
                </div>
                <div>
                    <CircularProgressbar styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 0.25,
                        // Text size
                        textSize: '16px',
                        // Colors
                        pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                        textColor: '#f88',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',})}
                        className="dial-offense" value={percentage} text={`${percentage}%`} />
                    <p className="score-label">Defense</p>
                </div>
                <div>
                    <CircularProgressbar styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 0.25,
                        // Text size
                        textSize: '16px',
                        // Colors
                        pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                        textColor: '#f88',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',})}
                       className="dial-offense" value={percentage} text={`${percentage}%`} />
                    <p className="score-label">Overall</p>
                 </div>
            </div>
        </section>
    );
}

export default Stats;
