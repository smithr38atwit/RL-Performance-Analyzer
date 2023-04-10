import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { PlayerStats } from "../scripts/model";

function StatsDial(percentage: number) {
    let r = 0, g = 0, b = 0;
    //if score is above 70, graph is green
    if (percentage >= 70) {
        g = 255;
    }
    //if score is between 70 and 40, graph is yellow
    else if (percentage < 70 && percentage >= 40) {
        r = 255;
        g = 255;
    }
    //if score is below 60, graph is red
    else {
        r = 210;
        g = 4;
        b = 45;
    }
    return (
        <CircularProgressbar
            value={percentage}
            text={`${percentage}`}
            strokeWidth={23}
            counterClockwise={true}
            background={true}
            styles={{
                // Customize the root svg element
                root: {},
                // Customize the path, i.e. the "completed progress"
                path: {
                    // Path color
                    stroke: `rgba(${r}, ${g}, ${b}, 100)`,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                    // Customize transition animation
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    // Rotate the path
                    transformOrigin: 'center center',
                    transitionDuration: '1',
                },
                // Customize the circle behind the path, i.e. the "total progress"
                trail: {
                    // Trail color
                    stroke: '#D3D3D3',
                    // Rotate the trail
                    transformOrigin: 'center center',
                },
                // Customize the text
                text: {
                    // Text color
                    fill: '#2F242C',
                    // Text size
                    fontSize: '23px',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                },
                // Customize background - only used when the `background` prop is true
                background: {
                    fill: '#A9A9A9',
                },
            }}
        />
    );
}

function Stats({ stats, name }: { stats: { [name: string]: PlayerStats }, name: string }) {
    return (
        <section id="player-stats">
            <div id="main-scores" className="scores">
                <div >
                    {StatsDial(stats[name].offense)}
                    <p className="score-label">Offense</p>
                </div>
                <div>
                    {StatsDial(stats[name].defense)}
                    <p className="score-label">Defense</p>
                </div>
                <div>
                    {StatsDial(stats[name].overall)}
                    <p className="score-label">Overall</p>
                </div>
            </div>
        </section>
    );
}

export default Stats;
