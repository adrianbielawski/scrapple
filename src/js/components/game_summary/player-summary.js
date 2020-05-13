import React, { Component } from 'react';
import { Trans } from 'react-i18next';

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

    render() {
        const img = this.getImg()
        const player = this.props.player;
        return (
            <li>
                <div className="player-name">
                    <div className="place">
                        <p>{<Trans>{this.props.placeText}</Trans>} {<Trans>place</Trans>}</p>
                        {img}
                    </div>
                    <p>{player.playerName}</p>
                </div>
                <div className="player-result">
                    <div className="result">
                        <p>{<Trans>Total</Trans>}: {player.currentScore}</p>
                        <p>{<Trans>Best score</Trans>}: {player.bestScore}</p>
                    </div>
                </div>
            </li>
        );
    }
}