import React from 'react';
import Dropdown from '../global_components/dropdown';
import { LoadingSpinner } from '../global_components/loadingSpinner';
import { Trans } from 'react-i18next';

const WaitingCover = (props) => {
    let title = 'Game continues!'
    let message = 'Please wait until settings will be changed';
    if(props.exitOption === 'playAgain') {
        message = 'Please wait until game started';
    }
    return ( 
        <Dropdown className="confirmation">
            <h2><Trans>{title}</Trans></h2>
            <p className="message"><Trans>{message}</Trans></p>
            <LoadingSpinner></LoadingSpinner>          
        </Dropdown>
    );
}
 
export default WaitingCover;