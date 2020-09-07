import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './mainMenu.scss';
//Custom Components
import Header from 'components/global_components/header/header';
import Confirmation from './confirmation/confirmation';
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

    let unsubscribeGameStart = null;

    useEffect(() => {
        props.setPlayers([]);
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

        const gameStartPromise = props.joinGame(gameId, props.language, props.user, props.history);
        gameStartPromise.then((u) => unsubscribeGameStart = u);
        gameIdInput.current.value = '';

    }

    const validateUserInput = (gameId) => {
        if (!gameId) {
            props.setAlert('alert', 'Please type in game ID');
            return false;
        };
        return true;
    };

    const handleCreateNewGame = () => {
        props.createNewGame(props.language, props.timeLimit, props.history);
    }

    return (
        <div className={styles.mainMenu}>
            <Confirmation show={props.showConfirmation} />
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
        timeLimit: state.gameMenu.timeLimit,
        showConfirmation: state.mainMenu.showConfirmation,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: (type, messageKey, messageValue, action, props) => dispatch(
            setAlert(type, messageKey, messageValue, action, props)
        ),
        joinGame: (gameId, user, history) => dispatch(joinGame(gameId, user, history)),
        createNewGame: (language, timeLimit, history) => dispatch(createNewGame(language, timeLimit, history)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);