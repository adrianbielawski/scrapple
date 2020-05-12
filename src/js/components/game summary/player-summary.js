import React, { Component } from 'react';

export class PlayerSummary extends Component {
    getImg = () => {
        let place = '';
        switch(this.props.place) {
            case (1):
                place = '1st';
                break
            case (2):
                place = '2nd';
                break
            case (3):
                place = '3rd';
                break
            default:
                return
        }
        let img = <img src={`../src/img/${place}-place.png`}></img>;
        return img
    }

    getText = () => {
        const lang = this.props.language;
        const text = {
            place: lang === 'en' ? 'place' : 'miejsce',
            total: lang === 'en' ? 'Total' : 'Wynik',
            best: lang === 'en' ? 'Best score' : 'Najlepszy wynik',
        }
        return text
    }

    render() {
        const img = this.getImg()
        const text = this.getText();
        const player = this.props.player;
        return (
            <li>
                <div className="player-name">
                    <div className="place">
                        <p>{this.props.placeText} {text.place}</p>
                        {img}
                    </div>
                    <p>{player.playerName}</p>
                </div>
                <div className="player-result">
                    <div className="result">
                        <p>{text.total}: {player.currentScore}</p>
                        <p>{text.best}: {player.bestScore}</p>
                    </div>
                </div>
            </li>
        );
    }
}