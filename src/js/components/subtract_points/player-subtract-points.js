import React from 'react';
//Custom Components
import Card from '../global_components/card';

const PlayerSubPoints = (props) => {
    return (
        <li className="sub">
            <Card>
                <div className="player-name">{props.playerName}</div>
                <input id={`sub-points${props.index}`} type="number" placeholder="0"></input>
            </Card>
        </li>
    );
}
export default PlayerSubPoints;