import React from 'react';
import { Trans } from 'react-i18next';
//Custom Components
import Dropdown from '../global_components/dropdown';
import LoadingSpinner from '../global_components/loadingSpinner';

const Confirmation = (props) => {
    let message = 'Please wait until game started';
    return ( 
        <Dropdown className="confirmation">
            <h2><Trans>You have joined the game</Trans>!</h2>
            <p className="game-id"><Trans>Game ID</Trans>: {props.gameId}</p>
            <p className="message"><Trans>{message}</Trans></p>
            <LoadingSpinner />            
        </Dropdown>
    );
}
 
export default Confirmation;