import React from 'react';
import { Trans } from 'react-i18next';
//Custom Components
import Card from '../global_components/card';

const PlayerSummary = (props) => {
    const getImg = () => {
        let place = '';
        switch(props.place) {
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
        let img = <img src={`../../src/assets/img/${place}-place.png`}></img>;
        return img
    };

    const img = getImg()
    const player = props.player;
    return (
        <li>
            <Card>
                <div className="player-name">
                    <div className="place">
                        <p>{<Trans>{props.placeText}</Trans>} {<Trans>place</Trans>}</p>
                        {img}
                    </div>
                    <p>{player.playerName}</p>
                </div>
                <p className="player-result">
                    {<Trans>Total</Trans>}: {player.currentScore} {<Trans>Best score</Trans>}: {player.bestScore}
                </p>
            </Card>
        </li>
    );
}
export default PlayerSummary;