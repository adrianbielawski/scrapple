import React, { useState, useEffect } from 'react';
import { Trans } from 'react-i18next';
import db from '../../../firebase';
import '../../../styles/game-summary.scss';
//Components
import { PlayerSummary } from './player-summary';
import { Header } from '../global_components/header';
import ExitOptions from './exit-options';
import WaitingCover from './waiting-cover';

export const GameSummary = (props) => {
    const [showExitOptions, setShowExitOptions] = useState(false);
    const [exitOption, setExitOption] = useState(null);
    const [gameCreated, setGameCreated] = useState(false);

    useEffect(() => {
        const unsubscribe = db.collection('games').doc(props.gameId).onSnapshot(doc => {
            const data = doc.data();
            if(data.exitOption !== exitOption) {
                setExitOption(data.exitOption)
                if(data.exitOption === 'playAgain') {
                    props.playAgain();
                };
            }
            if(data.joinedPlayers.length > 0 && data.exitOption === 'playAgainWithSettings') {
                setGameCreated(true);
                props.playAgainSettings()
            }
        })
        return () => {
            unsubscribe();
        };
    }, []);

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
            {exitOption === 'playAgainWithSettings' || (exitOption === 'playAgain' && props.timer) ? <WaitingCover gameCreated={gameCreated} exitOption={exitOption} /> : null}
            {showExitOptions ? <ExitOptions 
                playAgain={props.playAgain}
                playAgainSettings={props.playAgainSettings}
                exitGame={props.exitGame} /> : null}
            <Header />
            <h2><Trans>Game results</Trans></h2>
            <ul className="results">
                {getPlayersPositions()}
            </ul>
            {props.admin ? <button onClick={handleExit}><Trans>Exit</Trans></button> : null}
            {exitOption === 'exitGame' ? <button onClick={props.exitGame}><Trans>Exit</Trans></button> : null}
        </div>
    );
}