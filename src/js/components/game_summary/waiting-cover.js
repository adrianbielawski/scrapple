import React from 'react';
import Dropdown from '../global_components/dropdown';
import { LoadingSpinner } from '../global_components/loadingSpinner';
import { Trans } from 'react-i18next';

const WaitingCover = (props) => {
    let title = 'Game continues!'
    let message = 'Please wait until settings will be changed';
    let buttonStyle = {opacity: .5, cursor: 'no-drop'};
    let isButtonDisabled = true;
    if(props.gameCreated) {
        title = 'Waiting for players'
        buttonStyle = null;
        message = 'Settings changed, press play again to begin';
        isButtonDisabled = false;
    }
    return ( 
        <Dropdown className="confirmation">
            <h2>{title}</h2>
            <p className="message">{message}</p>
            <LoadingSpinner></LoadingSpinner>          
        </Dropdown>
    );
}
 
export default WaitingCover;