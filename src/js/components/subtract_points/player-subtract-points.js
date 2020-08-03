import React from 'react';
//Custom Components
import Card from '../global_components/card';

const PlayerSubPoints = (props) => {
    return (
        <li className="sub">
            <Card>
                <div className="player-name">{props.playerName}</div>
                <input type="number" placeholder="0" onChange={props.onChange} />
            </Card>
        </li>
    );
}
export default PlayerSubPoints;