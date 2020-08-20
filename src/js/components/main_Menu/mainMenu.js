import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './mainMenu.scss';
//Custom Components
import Header from 'components/global_components/header/header';
import Confirmation from './confirmation/confirmation';
import Card from 'components/global_components/card/card';
import AccountInfo from 'components/global_components/accountInfo/accountInfo';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import Button from 'components/global_components/button/button';
import Input from 'components/global_components/input/input';
//Redux Actions
import { setAlert, setGameId, updateUserCurrentGame } from 'actions/appActions';
import { joinGame, createNewGame, setShowConfirmation } from 'actions/mainMenuActions';
import { addPlayer } from 'actions/gameMenuActions';

const MainMenu = (props) => {
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

        if (!isValid) {
            return;
        }

        unsubscribeGameStart = props.joinGame(gameId, props.language, props.user, props.history);
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
            const updateUserPromise = props.updateUserCurrentGame(user.uid, gameId);
            updateUserPromise.then(() => {
                props.history.push(`/game_menu`);
            });
        });
    }

    const createGameId = () => {
        const gameId = Math.floor(Math.random() * 1000000).toString();
        props.setGameId(gameId);
        return gameId;
    }

    return (
        <div className={styles.mainMenu}>
            <Confirmation show={props.showConfirmation} />
            <Header />
            {props.user === {} ? <LoadingSpinner background={true} /> : (
                <div className={styles.content}>
                    <AccountInfo />
                    <Card className={styles.card}>
                        <Button onClick={createNewGame}>{t("Create new game")}</Button>
                    </Card>
                    <Card className={styles.card}>
                        <Input type="number" placeholder={t("Game ID")} ref={gameIdInput} />
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
        joinGame: (gameId, language, user, history) => dispatch(joinGame(gameId, language, user, history)),
        setGameId: (gameId) => dispatch(setGameId(gameId)),
        setShowConfirmation: (showConfirmation) => dispatch(setShowConfirmation(showConfirmation)),
        addPlayer: (playerName, uid, admin) => dispatch(addPlayer(playerName, uid, admin)),
        createNewGame: (user, gameId, language, timer, time) => dispatch(createNewGame(user, gameId, language, timer, time)),
        updateUserCurrentGame: (uid, gameId) => dispatch(updateUserCurrentGame(uid, gameId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);