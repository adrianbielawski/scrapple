import React, { useState, useEffect } from 'react';
import { Trans } from 'react-i18next';
import db from '../../../firebase';
import '../../../styles/game-summary.scss';
//Components
import PlayerSummary from './player-summary';
import Header from '../global_components/header';
import ExitOptions from './exit-options';
import WaitingCover from './waiting-cover';
import LoadingSpinner from '../global_components/loadingSpinner';

const GameSummary = (props) => {
    const [showExitOptions, setShowExitOptions] = useState(false);
    const [exitOption, setExitOption] = useState(null);
    const [admin, setAdmin] = useState(false)
    const [gameId, setGameId] = useState(false)
    const [players, setPlayers] = useState(null);
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        const localData = sessionStorage.getItem('admin');
        const isAdmin = localData ? JSON.parse(localData) : false;
        setAdmin(isAdmin);

        const pathArray = window.location.pathname.split('/');
        const id = pathArray[2];
        setGameId(id)

        db.collection('games').doc(id).get()
        .then((response) => {
            const data = response.data();
            setPlayers(data.players);
            setFetching(false)
        })
        .catch(() => {
            this.alert('alert', 'Something went wrong, please check your internet connection and try again');
        });;

        const unsubscribe = db.collection('games').doc(id).onSnapshot(doc => {
            const data = doc.data();
            if(data.exitOption !== exitOption) {
                setExitOption(data.exitOption)
                if(data.exitOption === 'playAgain') {
                    props.playAgain(id);
                };
            }
            if(data.joinedPlayers.length > 0 && data.exitOption === 'playAgainWithSettings') {
                props.playAgainSettings(id)
            }
        })
        return () => {
            unsubscribe();
        };
    }, []);

    const getPlayersPositions = () => {
        let p = [ ...players];
        p.sort((a, b) => {
            return b.currentScore - a.currentScore
        });

        let previousPlayerScore = '';
        let previousPlayerPlaceText = '';
        let previousPlace = '';
        let playersSummary = p.map((player, index) => {
            const placeTexts = ['1st', '2nd', '3rd', '4th'];
            let place = index + 1 ;
            let placeText = placeTexts[index];

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
    };

    const handleExit = () => {
        setShowExitOptions(true)
    };

    return (
        <div>
            {fetching ? <LoadingSpinner /> : (
                <div className="game-summary">
                        {exitOption === 'playAgainWithSettings' || (exitOption === 'playAgain' && props.timer) ? <WaitingCover exitOption={exitOption} /> : null}
                        {showExitOptions ? <ExitOptions 
                            playAgain={props.playAgain}
                            playAgainSettings={props.playAgainSettings}
                            exitGame={props.exitGame}
                            gameId={gameId} /> : null}
                        <Header />
                        <h2><Trans>Game results</Trans></h2>
                        <ul className="results">
                            {getPlayersPositions()}
                        </ul>
                        {admin ? <button onClick={handleExit}><Trans>Exit</Trans></button> : null}
                        {exitOption === 'exitGame' ? <button onClick={props.exitGame}><Trans>Exit</Trans></button> : null}
                    
                </div>
            )}
        </div>
    );
}
export default GameSummary