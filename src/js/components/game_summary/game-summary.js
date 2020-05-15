import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import '../../../styles/game-summary.scss';
//Components
import { PlayerSummary } from './player-summary';

export class GameSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    closeGame = () => {
        this.props.closeGame();
    }

    render() {
        const playersContent = this.getPlayersPositions();
        return (
            <div className="game-summary">
                <h1><img src="../src/img/logo.jpg"></img></h1>
                <h2><Trans>Game results</Trans></h2>
                <ul className="results">
                    {playersContent}
                </ul>
                <button onClick={this.closeGame} value="exit"><Trans>Exit</Trans></button>
            </div>
        );
    }
}