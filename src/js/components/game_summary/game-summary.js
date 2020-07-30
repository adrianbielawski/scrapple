import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import db from '../../../firebase';
import '../../../styles/game-summary.scss';
//Components
import PlayerSummary from './player-summary';
import Header from '../global_components/header';
import ExitOptions from './exit-options';
import WaitingCover from './waiting-cover';
import LoadingSpinner from '../global_components/loadingSpinner';
//Redux Actions
import { setAdmin, setGameId, exitGame, playAgain, playAgainSettings } from '../../actions/appActions';
import { setPlayers } from '../../actions/gameActions';

const GameSummary = (props) => {
    const { t } = useTranslation();
    const [showExitOptions, setShowExitOptions] = useState(false);
    const [exitOption, setExitOption] = useState(null);
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        const localData = sessionStorage.getItem('admin');
        const isAdmin = localData ? JSON.parse(localData) : false;
        props.setAdmin(isAdmin);

        const gameId =  props.gameId || getGameId();

        db.collection('games').doc(gameId).get()
        .then((response) => {
            const data = response.data();
            props.setPlayers(data.players);
            setFetching(false)
        })
        .catch(() => {
            this.alert('alert', 'Something went wrong, please check your internet connection and try again');
        });;

        const unsubscribe = db.collection('games').doc(gameId).onSnapshot(doc => {
            const data = doc.data();
            if(data.exitOption !== exitOption) {
                setExitOption(data.exitOption)
                if(data.exitOption === 'playAgain') {
                    props.playAgain(props.gameId);
                };
            }
            if(data.joinedPlayers.length > 0 && data.exitOption === 'playAgainWithSettings') {
                props.playAgainSettings(props.gameId)
            }
        })
        return () => {
            unsubscribe();
        };
    }, []);

    const getGameId = () => {
        const pathArray = window.location.pathname.split('/');
        const gameId = pathArray[2];
        props.setGameId(gameId);
        return gameId;
    }

    const getPlayersPositions = () => {
        let players = [ ...props.players];
        players.sort((a, b) => {
            return b.currentScore - a.currentScore
        });

        let previousPlayerScore = '';
        let previousPlayerPlaceText = '';
        let previousPlace = '';
        let playersSummary = players.map((player, index) => {
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
                    {exitOption === 'playAgainWithSettings' || (exitOption === 'playAgain' && props.timer) ?
                        <WaitingCover exitOption={exitOption} />
                    : null}
                    {showExitOptions && <ExitOptions />}
                    <Header />
                    <h2>{t("Game results")}</h2>
                    <ul className="results">
                        {getPlayersPositions()}
                    </ul>
                    {props.admin ? <button onClick={handleExit}>{t("Exit")}</button> : null}
                    {exitOption === 'exitGame' ? <button onClick={props.exitGame}>{t("Exit")}</button> : null}                    
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      admin: state.app.admin,
      gameId: state.app.gameId,
      players: state.game.players,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAdmin: (admin) => { dispatch(setAdmin(admin)) },
    setGameId: (gameId) => { dispatch(setGameId(gameId)) },
    setPlayers: (players) => { dispatch(setPlayers(players)) },
    exitGame: (gameId, admin) => { dispatch(exitGame(gameId, admin)) },
    playAgain: (gameId) => { dispatch(playAgain(gameId)) },
    playAgainSettings: (gameId) => { dispatch(playAgainSettings(gameId)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameSummary);