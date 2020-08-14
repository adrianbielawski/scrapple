import React from 'react';
import '../../../../styles/stats.scss';
//Custom Components
import CurrentPlayer from './current_player/currentPlayer';
import AllPlayers from './all_players/allPlayers';

const Stats = () => {
    return (
        <div className="stats">
            <CurrentPlayer />
            <AllPlayers />
        </div>
    );        
}

export default Stats;