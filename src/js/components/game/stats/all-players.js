import React from 'react';
//Components
import { PlayerStats } from './player-stats';

export const AllPlayers = (props) => {
    const players = [ ...props.players];
    const currentPlayer = props.currentPlayer

    const playerStats = players.map((player, index) => {
        let className = currentPlayer === index ? 'current' : '';
        return (
            <PlayerStats className={className} player={player} key={index}/>
        )
    });
    return (
        <div className="all-players">
            {playerStats}
        </div>
    );
}