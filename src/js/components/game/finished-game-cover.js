import React from 'react';
import { Trans } from 'react-i18next';
//Custom Components
import Dropdown from '../global_components/dropdown';
import LoadingSpinner from '../global_components/loadingSpinner';

const FinishedGameCover = () => {
    return ( 
        <Dropdown className="confirmation">
            <h2><Trans>Game finished!</Trans></h2>
            <p className="message"><Trans>Please wait until points of unused letters will be substracted</Trans></p>
            <LoadingSpinner />               
        </Dropdown>
    );
}
 
export default FinishedGameCover;