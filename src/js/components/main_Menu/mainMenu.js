import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../../styles/main-menu.scss';
//Custom Components
import Header from 'components/global_components/header';
import Confirmation from './confirmation/confirmation';
import Card from 'components/global_components/card/card';
import AccountInfo from 'components/global_components/accountInfo/accountInfo';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import Button from 'components/global_components/button/button';
import Input from 'components/global_components/input/input';
//Redux Actions
import { setAlert, setScreen, setGameId, updateUser } from 'actions/appActions';
import { joinGame, createNewGame, setShowConfirmation } from 'actions/mainMenuActions';
import { addPlayer } from 'actions/gameMenuActions';

const MainMenu = (props) => {
    sessionStorage.clear();
    const gameIdInput = useRef(null);
    const { t } = useTranslation();

    let unsubscribeGameStart = null;

    useEffect(() => {
        return () => {
            props.setShowConfirmation(false);
            if (unsubscribeGameStart !== null) {
                unsubscribeGameStart();
            }
        }
    }, []);

    const handleJoinGame = () => {
        const gameId = gameIdInput.current.value.trim();
        const isValid = validateUserInput(gameId);

        if(!isValid) {
            return;
        }

        unsubscribeGameStart = props.joinGame(gameId, props.language, props.user);
    }

    const validateUserInput = (gameId) => {
        if (!gameId) {
            props.setAlert('alert', 'Please type in game ID');
            return false;
        };
        return true;
    };

    const createNewGame = () => {
        const user = props.user;
        props.addPlayer(user.displayName, user.uid, true);
        const gameId = createGameId();
        const createNewGamePromise = props.createNewGame(user, gameId, props.language, props.timer, props.time);
        createNewGamePromise.then(() => {
            const updateUserPromise = props.updateUser(user.uid, gameId);
            updateUserPromise.then(() => {
                props.setScreen(`GameMenu`);
            });
        });
    }

    const createGameId = () => {
        const gameId = Math.floor(Math.random() * 1000000).toString();
        props.setGameId(gameId);
        return gameId;
    }

    return (
        
            <div className="main-menu">
                {props.showConfirmation && <Confirmation />}
                <Header />
                {props.user === {} ? <LoadingSpinner background={true} /> : (
                <div className="content">
                    <AccountInfo />
                    <Card>
                        <Button onClick={createNewGame}>{t("Create new game")}</Button>
                    </Card>
                    <Card>
                        <input placeholder={t("Game ID")} ref={gameIdInput}></input>
                        <Button onClick={handleJoinGame}>{t("Join the game")}</Button>
                    </Card>
                </div>
                )}
            </div>
    );
}

const mapStateToProps = (state) => {
    return {
        gameId: state.app.gameId,
        language: state.app.language,
        user: state.app.user,
        timer: state.timeLimit.timer,
        time: state.timeLimit.time,
        showConfirmation: state.mainMenu.showConfirmation,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: (type, messageKey, messageValue, action, props) => dispatch(setAlert(type, messageKey, messageValue, action, props)),
        joinGame: (gameId, language, user) => dispatch(joinGame(gameId, language, user)),
        setScreen: (screen) => dispatch(setScreen(screen)),
        setGameId: (gameId) => dispatch(setGameId(gameId)),
        setShowConfirmation: (showConfirmation) => dispatch(setShowConfirmation(showConfirmation)),
        addPlayer: (playerName, uid, admin) => dispatch(addPlayer(playerName, uid, admin)),
        createNewGame: (user, gameId, language, timer, time) => dispatch(createNewGame(user, gameId, language, timer, time)),
        updateUser: (uid, gameId) => dispatch(updateUser(uid, gameId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);