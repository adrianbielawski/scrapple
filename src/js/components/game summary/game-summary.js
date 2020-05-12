import React, { Component } from 'react';
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
            let language = this.props.language;
            switch(index) {
                case 0:
                    placeText = language === 'en' ? '1st' : 'Pierwsze';
                    place = 1;
                    break
                case 1:
                    placeText = language === 'en' ? '2nd' : 'Drugie';
                    place = 2;
                    break
                case 2:
                    placeText = language === 'en' ? '3rd' : 'Trzecie';
                    place = 3;
                    break
                default:
                    placeText = language === 'en' ? `${index + 1}th` : 'Czwarte'
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

            return <PlayerSummary language={this.props.language} player={player} placeText={placeText} place={place} key={index}/>
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

    getText = () => {
        let text = {
            title: '',
            button: ''
        };
        const showSummary = this.state.showSummary;
        if(this.props.language === 'en') {
            text.title = showSummary ? 'Game results' : 'Subtract points of unused letters';
            text.button = showSummary ? 'Exit' : 'Continue';
        } else {
            text.title = showSummary ? 'Wyniki Gry' : 'Odejmij wartość pozostałych liter';
            text.button = showSummary ? 'Wyjdź' : 'Kontynuuj';
        };
        return text
    }

    render() {
        const text = this.getText();
        const playersContent = this.state.showSummary ? this.getPlayersPositions() : this.getPlayersSubPoints();
        return (
            <div className="game-summary">
                <h1><img src="../src/img/logo.jpg"></img></h1>
                <h2>{text.title}</h2>
                <ul className="results">
                    {playersContent}
                </ul>
                <button onClick={this.state.showSummary ? this.closeGame : this.subPoints} value="exit">{text.button}</button>
            </div>
        );
    }
}