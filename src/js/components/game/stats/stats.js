import React, { Component } from 'react';
import '../../../../styles/stats.scss';
//Components
import { CurrentPlayer } from './current-player';
import { AllPlayers } from './all-players';

export class Stats extends Component {
    getTimeLeft = () => {
        const hrs = this.props.time.hours;
        const min = this.props.time.minutes;
        const sec = this.props.time.seconds;
        const timeLeft = hrs == '00' ? `${min}:${sec}` : `${hrs}:${min}:${sec}`;
        return timeLeft
    }
    render() {
        const players = this.props.players;
        const currentPlayer = this.props.currentPlayer;
        const timeLeft = this.getTimeLeft();
        return (
            <div className="stats">
                <CurrentPlayer
                    timeOut={this.props.timeOut}
                    timer={this.props.timer}
                    time={this.props.time}
                    timeLeft={timeLeft}
                    addPoints={this.props.addPoints}
                    player={players[currentPlayer]}
                    key={players[currentPlayer].playerId} />
                <AllPlayers
                    players={players}
                    currentPlayer={currentPlayer}/>
            </div>
        );
    }
}