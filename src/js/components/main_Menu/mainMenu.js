import React, { useRef } from 'react';
import i18Next from 'i18next';
import '../../../styles/main-menu.scss'
import { Trans } from 'react-i18next';
import { Header } from '../global_components/header';
import Confirmation from './confirmation';

export const MainMenu = (props) => {
    const gameIdInput = useRef(null)
    const handleJoinGame = () => {
        const gameId = gameIdInput.current.value;
        props.joinGame(gameId);
    }

    return ( 
        <div className="choose-game">
            {props.gameId ? <Confirmation gameId={props.gameId}/> : null}
            <Header />
            <div className="menu">
                <button onClick={() => props.showGameMenu()}><Trans>Create new game</Trans></button>
                <div className="join-game">
                    <input placeholder={i18Next.t("Game ID")} ref={gameIdInput}></input>
                    <button onClick={handleJoinGame}><Trans>Join the game</Trans></button>
                </div>
            </div>
        </div>
     );
}