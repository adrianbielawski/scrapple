import React from 'react';
import { Trans } from 'react-i18next';
//Custom Components
import Dropdown from '../global_components/dropdown';
import LoadingSpinner from '../global_components/loadingSpinner';

const Confirmation = (props) => {
    let title = props.gameId ? 'Game created succesfully' : 'Creating new game';
    let message = 'Please wait';
    if(props.gameId) {
        message = 'Please wait for other players to join the game';
    }
    if(props.allPlayersJoined) {
        message = 'All players has joined the game, press start game to begin';
    }
    return ( 
        <Dropdown className="confirmation">
            <h2><Trans>{title}</Trans></h2>
            {props.gameId ? <p className="game-id"><Trans>Game ID</Trans>: {props.gameId}</p> : null}
            <p className="message"><Trans>{message}</Trans></p>
            {!props.allPlayersJoined ? 
                <div>
                    <LoadingSpinner />
                    <p className="or"><Trans>or</Trans></p>
                    <button onClick={props.handleStartAdminGame}><Trans>Start anyway</Trans></button>
                </div> :
                <button onClick={props.handleStartAdminGame}><Trans>Start game</Trans></button>
            }
        </Dropdown>
    );
}
 
export default Confirmation;