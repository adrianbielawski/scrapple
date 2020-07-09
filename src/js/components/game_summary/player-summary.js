import React from 'react';
import { useTranslation } from 'react-i18next';
//Custom Components
import Card from '../global_components/card';

const PlayerSummary = (props) => {
    const { t } = useTranslation();
    
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
                        <p>{t(props.placeText)} {t("place")}</p>
                        {img}
                    </div>
                    <p>{player.playerName}</p>
                </div>
                <p className="player-result">
                    {t("Total")}: {player.currentScore} {t("Best score")}: {player.bestScore}
                </p>
            </Card>
        </li>
    );
}
export default PlayerSummary;