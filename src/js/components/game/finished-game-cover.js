import React from 'react';
import Dropdown from '../global_components/dropdown';
import { LoadingSpinner } from '../global_components/loadingSpinner';
import { Trans } from 'react-i18next';

const FinishedGameCover = () => {
    return ( 
        <Dropdown className="confirmation">
            <h2>Game finished!</h2>
            <p className="message">Please wait until points of unused letters will be substracted</p>
            <LoadingSpinner></LoadingSpinner>                
        </Dropdown>
    );
}
 
export default FinishedGameCover;