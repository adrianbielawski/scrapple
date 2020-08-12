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
import Card from '../global_components/card';
import AccountInfo from '../global_components/accountInfo/accountInfo';
import GameId from '../global_components/game-id';
import Button from '../global_components/button/button';
//Redux Actions
import { setGameId, setAlert, getGameData, changeLanguage } from '../../actions/appActions';
import { setPlayers } from '../../actions/gameActions';
import { startAdminGame, updateGameMenuData, setFetchingGameData, subscribeJoinedPlayers, getUserDataFromDatabase, setTimer, setTime } from '../../actions/gameMenuActions';

const GameMenu = (props) => {
    const { t } = useTranslation();
    let unsubscribeJoinedPlayers = null;
  
    useEffect(() => {
        if (props.user.uid) {
            const gameIdPromise = props.getUserDataFromDatabase(props.user.uid);
            gameIdPromise.then((data) => {
                props.setGameId(data.currentGame);
                const gameDataPromise = props.getGameData(data.currentGame);
                gameDataPromise.then((gameData) => {
                    props.changeLanguage(gameData.language);
                    props.setPlayers(gameData.players);
                    props.setTimer(gameData.timer, data.currentGame);
                    props.setTime(gameData.time, data.currentGame);
                    props.setFetchingGameData(false);

                    unsubscribeJoinedPlayers = props.subscribeJoinedPlayers(data.currentGame);
                })
            })
        }
    }, [props.user.uid]);

    useEffect(() => {
        if (!props.fetchingGameData) {
            props.updateGameMenuData(props.gameId, props.language, props.timer, props.time, props.players);
        }
    });
  
    useEffect(() => {
        return () => {
            if(unsubscribeJoinedPlayers !== null) {
                unsubscribeJoinedPlayers();
            }
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateSettings();
        if (isValid) {
            play();
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

    const play = () => {
        props.startAdminGame(props.gameId);
    }

    const buttonText =  props.playedAgainWithSettings ? 'Play again' : 'Play';
    return (
        <div className="game-menu">
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
                <Button onClick={handleSubmit} type="submit">{t(buttonText)}</Button>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateGameMenuData: (gameId, language, timer, time, players) => dispatch(updateGameMenuData(gameId, language, timer, time, players)),
        setFetchingGameData: (fetching) => dispatch(setFetchingGameData(fetching)),
        startAdminGame: (gameId) => dispatch(startAdminGame(gameId)),
        setGameId: (gameId) => dispatch(setGameId(gameId)),
        getGameData: (gameId) => dispatch(getGameData(gameId)),
        setPlayers: (players) => dispatch(setPlayers(players)),
        setTime: (time, gameId) => dispatch(setTime(time, gameId)),
        setTimer: (timer, gameId) => dispatch(setTimer(timer, gameId)),
        changeLanguage: (language) => dispatch(changeLanguage(language)),
        setAlert: (type, messageKey, messageValue, action, props) => dispatch(setAlert(type, messageKey, messageValue, action, props)),
        subscribeJoinedPlayers: (gameId) => dispatch(subscribeJoinedPlayers(gameId)),
        getUserDataFromDatabase: (uid) => dispatch(getUserDataFromDatabase(uid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);