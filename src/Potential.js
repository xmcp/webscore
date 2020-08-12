import React, {Component, PureComponent} from 'react';

import './Potential.css';

function PotentialSVG(props) {
    return (
        <svg viewBox="0 15 240 165" className={'potential-svg potential-svg-'+props.type}>
            <defs>
                <linearGradient id="border-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#fafafa" />
                    <stop offset="1" id="potential-svg-border-gradient-stop" />
                </linearGradient>
                <filter id="as-drop-shadow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
                </filter>
            </defs>
            {/* shadow */}
            <path
                d="m55.941667,4.725c0,0 -41.5,42.25 -41.5,42.25c0,0 104,105 104,105c0,0 106.75,-105.25 106.75,-105.25c0,0 -42.5,-42.25 -42.525,-42.225l-126.725,0.225z"
                stroke="url(#border-gradient)" strokeWidth="4" fillOpacity="0" filter="url(#as-drop-shadow)"
            />
            {/* background up */}
            <path
                d="m55.491667,4.975c0,0 127.25,0 127.175,0.025c-0.075,0.025 42.075,41.475 42.075,41.475c0,0 -19.25,20 -19.25,20c0,0 -172.002907,0 -172.075,-0.225c-0.072093,-0.225 -18.925,-19.525 -19,-19.75l41.075,-41.525z"
                fill="#1e162b"
            />
            {/* background down */}
            <path
                d="m24.491667,57.725c0,0 189,0.5 189,0.5c0,0 -94.5,93.5 -94.5,93.5l-94.5,-94z"
                id="potential-svg-background-down"
            />
            {/* border */}
            <path
                d="m55.941667,4.725c0,0 -41.5,42.25 -41.5,42.25c0,0 104,105 104,105c0,0 106.75,-105.25 106.75,-105.25c0,0 -42.5,-42.25 -42.525,-42.225l-126.725,0.225z"
                stroke="url(#border-gradient)" strokeWidth="4" fillOpacity="0"
            />
            {/* text up */}
            <text
                x="119.241667"  y="48.225" fill="#ffffff" fontFamily="Sans-serif" fontSize="32"
                opacity="0.95" textAnchor="middle" xmlSpace="preserve" letterSpacing="-1"
            >
                GPA
            </text>
            {/* text down */}
            <text
                x="119.241667" y="109.725" fill="#ffffff" fontFamily="Sans-serif"
                opacity="0.95" textAnchor="middle" xmlSpace="preserve" fontWeight="bold" letterSpacing="-2" strokeWidth="1.5"
                id="potential-svg-text-down"
            >
                {props.textDown}
            </text>
        </svg>
    );
}

function smartfix(x) {
    if(Math.abs(x)>=1)
        return x.toFixed(2); // -1.23
    else
        return x.toFixed(3).replace('0.','.'); // -.234
}

export function PotentialWidget(props) {

    let type=(props.delta>=.0005 ? 'up' : props.delta<=-.0005 ? 'down' : 'keep');
    let text=(type==='up' ? ('+'+smartfix(props.delta)) : type==='down' ? smartfix(props.delta) : '-KEEP-');
    return (
        <div title={'△GPA = '+props.delta.toFixed(4)} className="potential-span">
            <PotentialSVG type={type} textDown={text} />
        </div>
    );
}