import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Stats() {
    const percentage = 66;
    return (
        <section id="player-stats">
            <div id="main-scores" className="scores">
                <div >
                    <CircularProgressbar
                    value={percentage}
                    text={`${percentage}`}
                    strokeWidth={25}
                    styles={{
                        // Customize the root svg element
                        root: {},
                        // Customize the path, i.e. the "completed progress"
                        path: {
                        // Path color
                        stroke: `rgba(164, 44, 214, ${percentage / 100})`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'round',
                        // Customize transition animation
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        // Rotate the path
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                        },
                        // Customize the circle behind the path, i.e. the "total progress"
                        trail: {
                        // Trail color
                        stroke: '#C179B9',
                        // Rotate the trail
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                        },
                        // Customize the text
                        text: {
                        // Text color
                        fill: '#2F242C',
                        // Text size
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',


                        },
                        // Customize background - only used when the `background` prop is true
                        background: {
                        fill: '#3e98c7',
                        },
                    }}
                    />
                    <p className="score-label">Offense</p>
                </div>
                <div>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}`}
                    strokeWidth={25}
                    styles={{
                        // Customize the root svg element
                        root: {},
                        // Customize the path, i.e. the "completed progress"
                        path: {
                        // Path color
                        stroke: `rgba(164, 44, 214, ${percentage / 100})`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'round',
                        // Customize transition animation
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        // Rotate the path
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                        },
                        // Customize the circle behind the path, i.e. the "total progress"
                        trail: {
                        // Trail color
                        stroke: '#C179B9',
                        // Rotate the trail
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                        },
                        // Customize the text
                        text: {
                        // Text color
                        fill: '#2F242C',
                        // Text size
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',


                        },
                        // Customize background - only used when the `background` prop is true
                        background: {
                        fill: '#3e98c7',
                        },
                    }}
                    />
                    <p className="score-label">Defense</p>
                </div>
                <div>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}`}
                    strokeWidth={25}
                    styles={{
                        // Customize the root svg element
                        root: {},
                        // Customize the path, i.e. the "completed progress"
                        path: {
                        // Path color
                        stroke: `rgba(164, 44, 214, ${percentage / 100})`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'round',
                        // Customize transition animation
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        // Rotate the path
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                        },
                        // Customize the circle behind the path, i.e. the "total progress"
                        trail: {
                        // Trail color
                        stroke: '#C179B9',
                        // Rotate the trail
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                        },
                        // Customize the text
                        text: {
                        // Text color
                        fill: '#2F242C',
                        // Text size
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',


                        },
                        // Customize background - only used when the `background` prop is true
                        background: {
                        fill: '#3e98c7',
                        },
                    }}
                    />
                    <p className="score-label">Overall</p>
                 </div>
            </div>
        </section>
    );
}

export default Stats;
