import React, { Component } from 'react';
//Components
import { PlayerStats } from './player-stats';

export class AllPlayers extends Component {
    render() {
        const players = this.props.players;
        const currentPlayer = this.props.currentPlayer

        let playerStats = players.map((player, index) => {
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
}