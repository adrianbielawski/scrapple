import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../../styles/main-menu.scss';
//Custom Components
import Header from '../global_components/header';
import Confirmation from './confirmation';
import Card from '../global_components/card';
import Language from '../global_components/language/changeLanguage';
//Redux Actions
import { setAlert, setScreen } from '../../actions/appActions';
import { joinGame } from '../../actions/mainMenuActions';

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

    const renderGameMenu = () => {
        props.setScreen(`GameMenu`)
    }

    return ( 
        <div className="main-menu">
            {props.gameId ? <Confirmation gameId={props.gameId}/> : null}
            <Header />
            <div className="content">
                <Language showName={false} />
                <Card >
                    <button onClick={renderGameMenu}>{t("Create new game")}</button>
                </Card>
                <Card className="join-game">
                    <input placeholder={t("Game ID")} ref={gameIdInput}></input>
                    <button onClick={validateUserInput}>{t("Join the game")}</button>
                </Card>
            </div>
        </div>
     );
}

const mapStateToProps = (state) => {
    return {
      gameId: state.app.gameId,
      language: state.app.language,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (type, messageKey, messageValue, action, props) => { dispatch(setAlert(type, messageKey, messageValue, action, props)) },
    joinGame: (gameId, language) => dispatch(joinGame(gameId, language)),
    setScreen: (screen) => { dispatch(setScreen(screen)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);