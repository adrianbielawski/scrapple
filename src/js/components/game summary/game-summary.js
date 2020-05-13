import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import '../../../css/game-summary.css';
//Components
import { PlayerSummary } from './player-summary';
import { PlayerSubPoints } from './player-subtract-points';

export class GameSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSummary: false,
            players: this.props.players
        }
    }

    getPlayersPositions = () => {
        let players = this.state.players.sort((a, b) => {
            return b.currentScore - a.currentScore
        });

        let previousPlayerScore = '';
        let previousPlayerPlaceText = '';
        let previousPlace = '';
        let playersSummary = players.map((player, index) => {
            let placeText = '';
            let place = '';
            switch(index) {
                case 0:
                    placeText = "1st";
                    place = 1;
                    break
                case 1:
                    placeText = "2nd";
                    place = 2;
                    break
                case 2:
                    placeText = "3rd";
                    place = 3;
                    break
                case 3:
                    placeText = "4th";
                    place = 4;
                    break
            };
            if(player.currentScore === previousPlayerScore) {
                placeText = previousPlayerPlaceText
                place = previousPlace
            };

            previousPlayerScore = player.currentScore;
            previousPlayerPlaceText = placeText;
            previousPlace = place;

            return <PlayerSummary player={player} placeText={placeText} place={place} key={index}/>
        });
        return playersSummary
    }

    getPlayersSubPoints = () => {
        let playersSubPoints = this.state.players.map((player, index) => {
            return <PlayerSubPoints subPoints={this.subPoints} playerName={player.playerName} key={index} index={index}/>
        });
        return playersSubPoints
    }

    subPoints = (e) => {
        e.preventDefault();
        let players = this.state.players;
        players.map((player, index) => {
            const inputVal = document.getElementById(`sub-points${index}`).value;
            let newPlayer = player.currentScore -= inputVal;
            return newPlayer
        });
        this.setState({players, showSummary: true});
    }

    closeGame = () => {
        this.props.closeGame();
    }

    render() {
        const playersContent = this.state.showSummary ? this.getPlayersPositions() : this.getPlayersSubPoints();
        const title = this.state.showSummary ? <Trans>Game results</Trans> : <Trans>Subtract points of unused letters</Trans>;
        const button = this.state.showSummary ? <Trans>Exit</Trans> : <Trans>Continue</Trans>;
        return (
            <div className="game-summary">
                <h1><img src="../src/img/logo.jpg"></img></h1>
                <h2>{title}</h2>
                <ul className="results">
                    {playersContent}
                </ul>
                <button onClick={this.state.showSummary ? this.closeGame : this.subPoints} value="exit">{button}</button>
            </div>
        );
    }
}