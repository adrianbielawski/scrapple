import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import '../../../css/game-summary.css';
//Components
import { PlayerSubPoints } from '../subtract_points/player-subtract-points';

export class SubtractPoints extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.props.players
        }
    }
    subPoints = (e) => {
        e.preventDefault();
        let players = this.state.players;
        players.map((player, index) => {
            const inputVal = document.getElementById(`sub-points${index}`).value;
            let newPlayer = player.currentScore -= inputVal;
            return newPlayer
        });
        this.setState({players});
        this.renderGameSummary()
    }

    renderGameSummary = () => {
        this.props.renderGameSummary(this.state.players);
    }

    getPlayersSubPoints = () => {
        let playersContent = this.state.players.map((player, index) => {
            return <PlayerSubPoints subPoints={this.subPoints} playerName={player.playerName} key={index} index={index}/>
        });
        return playersContent
    }

    render() {
        const playersContent = this.getPlayersSubPoints();
        return (
            <div className="game-summary">
                <h1><img src="../src/img/logo.jpg"></img></h1>
                <h2><Trans>Subtract points of unused letters</Trans></h2>
                <ul className="results">
                    {playersContent}
                </ul>
                <button onClick={this.subPoints} value="exit"><Trans>Continue</Trans></button>
            </div>
        );
    }
}