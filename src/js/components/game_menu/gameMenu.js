import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './gameMenu.scss';
//Custom Components
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import Players from './players/players';
import Language from 'components/global_components/language/changeLanguage';
import TimeLimit from './timeLimit/timeLimit';
import AddPlayer from './addPlayer/addPlayer';
import Header from 'components/global_components/header/header';
import Card from 'components/global_components/card/card';
import AccountInfo from 'components/global_components/accountInfo/accountInfo';
import GameId from 'components/global_components/game_id/gameId';
import Button from 'components/global_components/button/button';
import SideMenu from 'components/global_components/side_menu/sideMenu';
//Redux Actions
import { setGameId, setAlert, getGameData, changeLanguage } from 'actions/appActions';
import { setPlayers } from 'actions/gameActions';
import { startAdminGame, updateGameMenuData, setFetchingGameData, subscribeJoinedPlayers,
    getCurrentGameFromDatabase, setTimer, setTime } from 'actions/gameMenuActions';

const GameMenu = (props) => {
    const { t } = useTranslation();
    let unsubscribeJoinedPlayers = null;

    useEffect(() => {
        if (props.user.uid) {
            const gameIdPromise = props.getCurrentGameFromDatabase(props.user.uid);
            gameIdPromise.then((currentGame) => {
                props.setGameId(currentGame);
                const gameDataPromise = props.getGameData(currentGame);
                gameDataPromise.then((gameData) => {
                    props.changeLanguage(gameData.language);
                    props.setPlayers(gameData.players);
                    props.setTimer(gameData.timer, currentGame);
                    props.setTime(gameData.time, currentGame);
                    props.setFetchingGameData(false);

                    unsubscribeJoinedPlayers = props.subscribeJoinedPlayers(currentGame);
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
            if (unsubscribeJoinedPlayers !== null) {
                unsubscribeJoinedPlayers();
            }
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateSettings();
        if (isValid) {
            props.startAdminGame(props.gameId, props.user, props.history);
        }
    }

    const validateSettings = () => {
        if (props.players.length < 2) {
            const messageKey = 'Please add at least 2 players';
            props.setAlert('alert', messageKey);
            return false;
        }

        if(props.timer) {
            const time = props.time;
            if(time.hours == 0 && time.minutes == 0) {
                const messageKey = "Minimum player's time limit is 1 min";
                props.setAlert('alert', messageKey);
                return false;
            }
        }
        return true;
    }

    const buttonText = props.playedAgainWithSettings ? 'Play again' : 'Play';
    return (
        <div className={styles.gameMenu}>
            <Header />
            {props.fetchingGameData ? <LoadingSpinner background={true} /> : <div className={styles.menu}>
                <div className={styles.topWrapper}>
                    <SideMenu />
                    <AccountInfo />
                </div>
                <GameId />
                <Card className={styles.card}>
                    <Language showName={true} vertical={true} />
                </Card>
                <Card className={styles.card}>
                    <TimeLimit />
                </Card>
                <Card className={styles.card}>
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
        startAdminGame: (gameId, user, history) => dispatch(startAdminGame(gameId, user, history)),
        setGameId: (gameId) => dispatch(setGameId(gameId)),
        getGameData: (gameId) => dispatch(getGameData(gameId)),
        setPlayers: (players) => dispatch(setPlayers(players)),
        setTime: (time, gameId) => dispatch(setTime(time, gameId)),
        setTimer: (timer, gameId) => dispatch(setTimer(timer, gameId)),
        changeLanguage: (language) => dispatch(changeLanguage(language)),
        setAlert: (type, messageKey, messageValue, action, props) => dispatch(setAlert(type, messageKey, messageValue, action, props)),
        subscribeJoinedPlayers: (gameId) => dispatch(subscribeJoinedPlayers(gameId)),
        getCurrentGameFromDatabase: (uid) => dispatch(getCurrentGameFromDatabase(uid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);