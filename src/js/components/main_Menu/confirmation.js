import React from 'react';
import Dropdown from '../global_components/dropdown';
import { LoadingSpinner } from '../global_components/loadingSpinner';

const Confirmation = (props) => {
    let message = 'Please wait until game started';
    return ( 
        <Dropdown className="confirmation">
            <h2>You has joined the game!</h2>
            <p className="game-id">Game ID: {props.gameId}</p>
            <p className="message">{message}</p>
            <LoadingSpinner></LoadingSpinner>               
        </Dropdown>
    );
}
 
export default Confirmation;