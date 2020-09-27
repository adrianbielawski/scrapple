import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './mainMenu.scss';
//Custom Components
import Header from 'components/global_components/header/header';
import Card from 'components/global_components/card/card';
import AccountInfo from 'components/global_components/accountInfo/accountInfo';
import Button from 'components/global_components/button/button';
import Input from 'components/global_components/input/input';
import SideMenu from 'components/global_components/side_menu/sideMenu';
//Redux Actions
import { setAlert } from 'actions/appActions';
import { joinGame, createNewGame } from 'actions/mainMenuActions';

const MainMenu = (props) => {
    const gameIdInput = useRef(null);
    const { t } = useTranslation();

    const handleJoinGame = () => {
        const gameId = gameIdInput.current.value.trim();
        const { valid, error } = validateUserInput(gameId);

        if (!valid) {
            setAlert('alert', error)
            return;
        }

        props.joinGame(gameId, props.history);
        gameIdInput.current.value = '';
    }

    const validateUserInput = (gameId) => {
        let error = null;

        if (!gameId) {
            error = 'Please type in game ID';
        };

        return {
            valid: error === null,
            error,
        };
    };

    const handleCreateNewGame = () => {
        props.createNewGame(props.language, props.timeLimit, props.history);
    }

    return (
        <div className={styles.mainMenu}>
            <Header />
            <div className={styles.content}>
                <div className={styles.topWrapper}>
                    <SideMenu />
                    <AccountInfo />
                </div>
                <Card className={styles.card}>
                    <Button onClick={handleCreateNewGame}>{t("Create new game")}</Button>
                </Card>
                <Card className={styles.card}>
                    <Input type="number" placeholder={t("Game ID")} ref={gameIdInput} />
                    <Button onClick={handleJoinGame}>{t("Join the game")}</Button>
                </Card>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        timeLimit: state.gamePage.gameData.timeLimit,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: (type, messageKey, messageValue, action, props) => dispatch(
            setAlert(type, messageKey, messageValue, action, props)
        ),
        joinGame: (gameId, history) => dispatch(joinGame(gameId, history)),
        createNewGame: (language, timeLimit, history) => dispatch(createNewGame(language, timeLimit, history)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);