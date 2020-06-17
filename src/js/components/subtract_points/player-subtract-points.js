import React from 'react';
import Card from '../global_components/card';

export const PlayerSubPoints = (props) => {
    return (
        <li className="sub">
            <Card>
                <div className="player-name">{props.playerName}</div>
                <input id={`sub-points${props.index}`} type="number" min="0" placeholder="0"></input>
            </Card>
        </li>
    );
}