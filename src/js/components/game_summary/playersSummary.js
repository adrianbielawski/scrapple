import React from 'react';
import styles from './playersSummary.scss';
//Components
import PlayerSummary from './player_summary/playerSummary';

const PlayersSummary = (props) => {
    const getPlayersSummary = () => {
        let players = [...props.players];
        players.sort((a, b) => {
            return b.currentScore - a.currentScore;
        });

        let previousPlayerScore = '';
        let previousPlayerPlaceText = '';
        let previousPlace = '';
        let playersSummary = players.map((player, index) => {
            const placeTexts = ['1st', '2nd', '3rd', '4th'];
            let place = index + 1;
            let placeText = placeTexts[index];

            if (player.currentScore === previousPlayerScore) {
                placeText = previousPlayerPlaceText
                place = previousPlace
            };

            previousPlayerScore = player.currentScore;
            previousPlayerPlaceText = placeText;
            previousPlace = place;

            return <PlayerSummary player={player} placeText={placeText} place={place} key={index} />
        });
        return playersSummary;
    };

    return (
        <ul className={styles.results}>
            {getPlayersSummary()}
        </ul>
    );
}

export default PlayersSummary;