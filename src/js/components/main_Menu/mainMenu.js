import React, { useRef } from 'react';
import i18Next from 'i18next';
import '../../../styles/main-menu.scss'
import { Trans } from 'react-i18next';
import { Header } from '../global_components/header';
import Confirmation from './confirmation';
import Card from '../global_components/card';
import { Language } from '../global_components/language/language';

export const MainMenu = (props) => {
    const gameIdInput = useRef(null)

    const validateUserInput = () => {
        const gameId = gameIdInput.current.value;

        if (!gameId) {
            const alertMessage = 'Please type in game ID';
            props.alert('alert', alertMessage);
            return
        };

        props.joinGame(gameId, 'Something went wrong, please check game ID');
    }

    return ( 
        <div className="main-menu">
            {props.gameId ? <Confirmation gameId={props.gameId}/> : null}
            <Header />
            <div className="content">
                <Language changeLanguage={props.changeLanguage} currentLanguage={props.currentLanguage} showName={false} />
                <Card >
                    <button onClick={() => props.showGameMenu()}><Trans>Create new game</Trans></button>
                </Card>
                <Card className="join-game">
                    <input placeholder={i18Next.t("Game ID")} ref={gameIdInput}></input>
                    <button onClick={validateUserInput}><Trans>Join the game</Trans></button>
                </Card>
            </div>
        </div>
     );
}