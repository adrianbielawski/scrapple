import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../../styles/main-menu.scss';
//Custom Components
import Header from '../global_components/header';
import Confirmation from './confirmation';
import Card from '../global_components/card';
import AccountInfo from '../global_components/accountInfo/accountInfo';
import LoadingSpinner from '../global_components/loadingSpinner';
//Redux Actions
import { setAlert, setScreen, setGameId, updateUser } from '../../actions/appActions';
import { joinGame, createNewGame } from '../../actions/mainMenuActions';
import { addPlayer } from '../../actions/gameMenuActions';

const MainMenu = (props) => {
    sessionStorage.clear();
    const gameIdInput = useRef(null);
    const { t } = useTranslation();

    let unsubscribeGameStart = null;

    useEffect(() => {
        return () => {
            if (unsubscribeGameStart !== null) {
                unsubscribeGameStart()
            }
        }
    }, []);

    const validateUserInput = () => {
        const gameId = gameIdInput.current.value.trim();

        if (!gameId) {
            props.setAlert('alert', 'Please type in game ID');
            return
        };

        unsubscribeGameStart = props.joinGame(gameId, props.language);
    };

    const createNewGame = () => {
        const user = props.user;
        props.addPlayer(user.displayName, user.uid);
        const gameId = createGameId();
        props.createNewGame(user, gameId, props.language, props.timer, props.time);
        props.updateUser(user.uid, gameId);

        props.setScreen(`GameMenu`)
    }

    const createGameId = () => {
        const gameId = Math.floor(Math.random() * 1000000).toString();
        props.setGameId(gameId);
        return gameId
    }

    return (
        props.user === {} ? <LoadingSpinner background={true} /> : (
            <div className="main-menu">
                {props.gameId && <Confirmation gameId={props.gameId}/>}
                <Header />
                <div className="content">
                    <AccountInfo />
                    <Card>
                        <button onClick={createNewGame}>{t("Create new game")}</button>
                    </Card>
                    <Card>
                        <input placeholder={t("Game ID")} ref={gameIdInput}></input>
                        <button onClick={validateUserInput}>{t("Join the game")}</button>
                    </Card>
                </div>
            </div>
        )
     );
}

const mapStateToProps = (state) => {
    return {
      gameId: state.app.gameId,
      language: state.app.language,
      user: state.app.user,
      players: state.players,
      timer: state.timeLimit.timer,
      time: state.timeLimit.time,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (type, messageKey, messageValue, action, props) => dispatch(setAlert(type, messageKey, messageValue, action, props)),
    joinGame: (gameId, language) => dispatch(joinGame(gameId, language)),
    setScreen: (screen) => dispatch(setScreen(screen)),
    setGameId: (gameId) => dispatch(setGameId(gameId)),
    addPlayer: (playerName, uid) => dispatch(addPlayer(playerName, uid)),
    createNewGame: (uid, players, gameId, language, playedAgainWithSettings, timer, time) => dispatch(createNewGame(uid, players, gameId, language, playedAgainWithSettings, timer, time)),
    updateUser: (uid, gameId) => dispatch(updateUser(uid, gameId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);