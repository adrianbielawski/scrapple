import React from 'react';
import Dropdown from '../global_components/dropdown';
import { LoadingSpinner } from '../global_components/loadingSpinner';
import { Trans } from 'react-i18next';

const Confirmation = (props) => {
    let message = 'Waiting for other players to join the game';
    let buttonStyle = {marginTop: '40px', opacity: .5, cursor: 'no-drop'};
    let isButtonDisabled = true;
    if(props.allPlayersJoined) {
        buttonStyle = null;
        message = 'All players has joined the game, press start game to begin';
        isButtonDisabled = false;
    }
    return ( 
        <Dropdown className="confirmation">
            <h2>Game created succesfully!</h2>
            <p className="game-id">Game ID: {props.gameId}</p>
            <p className="message">{message}</p>
            {!props.allPlayersJoined && <LoadingSpinner></LoadingSpinner>}
            <button disabled={isButtonDisabled} onClick={props.handleGameStart} style={buttonStyle}><Trans>Start game</Trans></button>                
        </Dropdown>
    );
}
 
export default Confirmation;