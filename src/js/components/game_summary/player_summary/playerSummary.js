import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './playerSummary.scss';
//Custom Components
import Card from 'components/global_components/card/card';

const PlayerSummary = (props) => {
    const { t } = useTranslation();

    const getImg = () => {
        let place = '';
        switch (props.place) {
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

        return <img src={`../../src/assets/img/${place}-place.png`}></img>;
    };

    const player = props.player;
    return (
        <li className={styles.playerSummary}>
            <Card className={styles.card}>
                <div className={styles.place}>
                    <p>{t("place", { 'place': t(props.placeText) })}</p>
                    {getImg()}
                </div>
                <p className={styles.playerName}>{player.playerName}</p>
                <p>
                    {t("Player results", { 'total': player.currentScore, 'best': player.bestScore })}
                </p>
            </Card>
        </li>
    );
}

export default PlayerSummary;