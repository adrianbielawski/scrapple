import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../../styles/main-menu.scss';
//Custom Components
import Header from '../global_components/header';
import Confirmation from './confirmation';
import Card from '../global_components/card';
import Language from '../global_components/language/language';
//Redux Actions
import { setAlert } from '../../actions/appActions';

const MainMenu = (props) => {
    sessionStorage.clear();
    const gameIdInput = useRef(null);
    const { t } = useTranslation();

    const validateUserInput = () => {
        const gameId = gameIdInput.current.value.trim();

        if (!gameId) {
            const messageKey = 'Please type in game ID';
            props.setAlert('alert', messageKey);
            return
        };

        props.joinGame(gameId);
    };

    return ( 
        <div className="main-menu">
            {props.gameId ? <Confirmation gameId={props.gameId}/> : null}
            <Header />
            <div className="content">
                <Language showName={false} />
                <Card >
                    <button onClick={() => props.renderGameMenu()}>{t("Create new game")}</button>
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
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (type, messageKey, messageValue, action, props) => { dispatch(setAlert(type, messageKey, messageValue, action, props)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);