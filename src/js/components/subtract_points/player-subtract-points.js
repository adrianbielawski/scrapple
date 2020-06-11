import React from 'react';

export const PlayerSubPoints = (props) => {
    return (
        <li className="sub">
            <div className="player-name">{props.playerName}</div>
            <input id={`sub-points${props.index}`} type="number" min="0" placeholder="0"></input>
        </li>
    );
}