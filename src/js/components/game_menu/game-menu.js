import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../../styles/game-menu.scss';
//Custom Components
import LoadingSpinner from '../global_components/loadingSpinner';
import Players from './players/players';
import Language from '../global_components/language/changeLanguage';
import TimeLimit from './timeLimit';
import AddPlayer from './add-player';
import Header from '../global_components/header';
import Confirmation from './confirmation';
import Card from '../global_components/card';
import AccountInfo from '../global_components/accountInfo/accountInfo';
import GameId from '../global_components/game-id';
//Redux Actions
import { setGameId, setAlert, getGameData, changeLanguage } from '../../actions/appActions';
import { setPlayers } from '../../actions/gameActions';
import { updateGameMenuData, setFetchingGameData, setAllPlayersJoined, setShowConfirmation, subscribeJoinedPlayers, addPlayer, getUserDataFromDatabase, setTimer, setTime } from '../../actions/gameMenuActions';

const GameMenu = (props) => {
    const { t } = useTranslation();
    let unsubscribeJoinedPlayers = null;
  
    useEffect(() => {
        props.playedAgain && !props.playedAgainWithSettings ? props.setShowConfirmation(true) : null;
        if(props.timer && props.playAgain) {
            unsubscribeJoinedPlayers = props.subscribeJoinedPlayers(gameId, props.players)
        }        
        
        return () => {
            props.setShowConfirmation(false);
            if(unsubscribeJoinedPlayers !== null) {
                unsubscribeJoinedPlayers()
            }
        }
    }, []);
  
    useEffect(() => {
        if (props.user.uid) {
            const gameIdPromise = props.getUserDataFromDatabase(props.user.uid);
            gameIdPromise.then((data) => {
                props.setGameId(data.currentGame);
                const gameDataPromise = props.getGameData(data.currentGame);
                gameDataPromise.then((gameData) => {
                    props.changeLanguage(gameData.language)
                    props.setPlayers(gameData.players);
                    props.setTimer(gameData.timer, data.currentGame);
                    props.setTime(gameData.time, data.currentGame);
                    props.setFetchingGameData(false)
                })
            })
        }
    }, [props.user.uid]);

    useEffect(() => {
        if (!props.fetchingGameData) {
        props.updateGameMenuData(props.gameId, props.language, props.timer, props.time, props.players);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateSettings();
        if (isValid) {
            handleCreateNewGame();
        }
    }

    const validateSettings = () => {
        if(props.players.length < 2) {
            const messageKey = 'Please add at least 2 players';
            props.setAlert('alert', messageKey);
            return false;
        }

        // if(props.timer) {
        //     const time = props.time;
        //     if(time.hours == 0 && time.minutes == 0) {
        //         const messageKey = "Minimum player's time limit is 1 min";
        //         props.setAlert('alert', messageKey);
        //         return false;
        //     }
        // }
        return true;
    }

    const buttonText =  props.playedAgainWithSettings ? 'Play again' : 'Create game';
    return (
        <div className="game-menu">
            {props.showConfirmation && <Confirmation />}
            <Header />
            {props.fetchingGameData ? <LoadingSpinner background={true} /> : <div className="menu">
                <AccountInfo />
                <GameId />
                <Card>
                    <Language showName={true}/>
                </Card>
                <Card>
                    <TimeLimit />
                </Card>
                <Card>
                    <AddPlayer />
                    <Players />
                </Card>
                <button onClick={handleSubmit} type="submit">{t(buttonText)}</button>
            </div>}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        fetchingGameData: state.gameMenu.fetchingGameData,
        user: state.app.user,
        gameId: state.app.gameId,
        language: state.app.language,
        players: state.game.players,
        timer: state.timeLimit.timer,
        time: state.timeLimit.time,
        playedAgain: state.app.playedAgain,
        playedAgainWithSettings: state.app.playedAgainWithSettings,
        showConfirmation: state.gameMenu.showConfirmation,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateGameMenuData: (gameId, language, timer, time, players) => dispatch(updateGameMenuData(gameId, language, timer, time, players)),
        setFetchingGameData: (fetching) => dispatch(setFetchingGameData(fetching)),
        setGameId: (gameId) => dispatch(setGameId(gameId)),
        getGameData: (gameId) => dispatch(getGameData(gameId)),
        setPlayers: (players) => dispatch(setPlayers(players)),
        setTime: (time, gameId) => dispatch(setTime(time, gameId)),
        setTimer: (timer, gameId) => dispatch(setTimer(timer, gameId)),
        changeLanguage: (language) => dispatch(changeLanguage(language)),
        addPlayer: (player, uid) => dispatch(addPlayer(player, uid)),
        setAlert: (type, messageKey, messageValue, action, props) => dispatch(setAlert(type, messageKey, messageValue, action, props)),
        setAllPlayersJoined: (allPlayersJoined) => dispatch(setAllPlayersJoined(allPlayersJoined)),
        subscribeJoinedPlayers: (gameId, players) => dispatch(subscribeJoinedPlayers(gameId, players)),
        setShowConfirmation: (showConfirmation) => dispatch(setShowConfirmation(showConfirmation)),
        getUserDataFromDatabase: (uid) => dispatch(getUserDataFromDatabase(uid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);