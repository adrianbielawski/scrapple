import React from 'react';
import '../../../../styles/stats.scss';
//Custom Components
import CurrentPlayer from './current-player';
import AllPlayers from './all-players';

const Stats = () => {
    return (
        <div className="stats">
            <CurrentPlayer />
            <AllPlayers />
        </div>
    );        
}

export default Stats;