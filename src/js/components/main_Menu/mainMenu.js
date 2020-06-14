import React, { useRef } from 'react';
import i18Next from 'i18next';
import db from '../../../firebase';
import '../../../styles/main-menu.scss'
import { Trans } from 'react-i18next';
import { Header } from '../global_components/header';

export const MainMenu = (props) => {
    const gameIdInput = useRef(null)
    const handleJoinGame = () => {
        const gameId = gameIdInput.current.value;
        
        db.collection('games').doc(gameId).get().then((response) => {
            if (response.exists) {
                const data = response.data();
                props.joinGame(data, gameId)
            } else {
                console.log("Game doesn't exist")
            }
        }).catch(error => {
            console.log(error)
        });
    }

    return ( 
        <div className="choose-game">
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