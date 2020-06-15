import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import '../../../styles/game-summary.scss';
//Components
import { PlayerSummary } from './player-summary';
import { Header } from '../global_components/header';
import ExitOptions from './exit-options';

export const GameSummary = (props) => {
    const [showExitOptions, setShowExitOptions] = useState(false)
    const getPlayersPositions = () => {
        let players = [ ...props.players];
        players.sort((a, b) => {
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

    const handleExit = () => {
        setShowExitOptions(true)
    }

    return (
        <div className="game-summary">
            {showExitOptions ? <ExitOptions 
                playAgain={props.playAgain}
                playAgainSettings={props.playAgainSettings}
                exitGame={props.exitGame} /> : null}
            <Header />
            <h2><Trans>Game results</Trans></h2>
            <ul className="results">
                {getPlayersPositions()}
            </ul>
            <button onClick={handleExit}><Trans>Exit</Trans></button>
        </div>
    );
}