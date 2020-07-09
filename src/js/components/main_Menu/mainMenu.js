import React, { useRef } from 'react';
import { connect } from 'react-redux';
import i18Next from 'i18next';
import { Trans } from 'react-i18next';
import '../../../styles/main-menu.scss';
//Custom Components
import Header from '../global_components/header';
import Confirmation from './confirmation';
import Card from '../global_components/card';
import Language from '../global_components/language/language';

const MainMenu = (props) => {
    sessionStorage.clear();
    const gameIdInput = useRef(null);

    const validateUserInput = () => {
        const gameId = gameIdInput.current.value.trim();

        if (!gameId) {
            const messageKey = 'Please type in game ID';
            props.alert('alert', messageKey);
            return
        };

        props.joinGame(gameId);
    };

    return ( 
        <div className="main-menu">
            {props.gameId ? <Confirmation gameId={props.gameId}/> : null}
            <Header />
            <div className="content">
                <Language changeLanguage={props.changeLanguage} currentLanguage={props.currentLanguage} showName={false} />
                <Card >
                    <button onClick={() => props.renderGameMenu()}><Trans>Create new game</Trans></button>
                </Card>
                <Card className="join-game">
                    <input placeholder={i18Next.t("Game ID")} ref={gameIdInput}></input>
                    <button onClick={validateUserInput}><Trans>Join the game</Trans></button>
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

export default connect(mapStateToProps)(MainMenu);