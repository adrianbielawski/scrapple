import React, { Component } from 'react';
import '../../../../css/stats.css';
//Components
import { CurrentPlayer } from './current-player';
import { AllPlayers } from './all-players';

export class Stats extends Component {
    render() {
        const players = this.props.players;
        const currentPlayer = this.props.currentPlayer;
        return (
            <div className="stats">
                <CurrentPlayer
                    language={this.props.language}
                    timeOut={this.props.timeOut}
                    timer={this.props.timer}
                    time={this.props.time}
                    addPoints={this.props.addPoints}
                    player={players[currentPlayer]}
                    key={players[currentPlayer].playerId} />
                <AllPlayers 
                    language={this.props.language}
                    players={players}
                    currentPlayer={currentPlayer}/>
            </div>
        );
    }
}