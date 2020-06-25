import React from 'react';
// Custom Components
import PlayerStats from './player-stats';

const AllPlayers = (props) => {
    const players = [ ...props.players];
    const currentPlayer = props.currentPlayer;

    const playerStats = players.map((player, index) => {
        let className = currentPlayer === index ? 'current' : '';
        return (
            <PlayerStats className={className} player={player} key={index}/>
        );
    });
    return (
        <div className="all-players">
            {playerStats}
        </div>
    );
}
export default AllPlayers;