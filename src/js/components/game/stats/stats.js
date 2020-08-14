import React from 'react';
import styles from './stats.scss';
//Custom Components
import CurrentPlayer from './current_player/currentPlayer';
import AllPlayers from './all_players/allPlayers';

const Stats = () => {
    return (
        <div className={styles.stats}>
            <CurrentPlayer />
            <AllPlayers />
        </div>
    );
}

export default Stats;