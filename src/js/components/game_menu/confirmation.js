import React from 'react';
import { Trans } from 'react-i18next';
import Dropdown from '../global_components/dropdown';
import { LoadingSpinner } from '../global_components/loadingSpinner';

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
            <h2><Trans>Game created succesfully!</Trans></h2>
            <p className="game-id"><Trans>Game ID</Trans>: {props.gameId}</p>
            <p className="message"><Trans>{message}</Trans></p>
            {!props.allPlayersJoined && <LoadingSpinner></LoadingSpinner>}
            <button disabled={isButtonDisabled} onClick={props.handleGameStart} style={buttonStyle}><Trans>Start game</Trans></button>                
        </Dropdown>
    );
}
 
export default Confirmation;