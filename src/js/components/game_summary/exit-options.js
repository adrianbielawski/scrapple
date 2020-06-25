import React from 'react';
import { Trans } from 'react-i18next';
//Custom Components
import Dropdown from '../global_components/dropdown';

const ExitOptions = (props) => {
    return ( 
        <Dropdown className="confirmation">
            <button onClick={props.playAgain}><Trans>Play again</Trans></button>
            <button onClick={props.playAgainSettings}><Trans>Play again with new settings</Trans></button>
            <button onClick={props.exitGame}><Trans>Exit</Trans></button>
        </Dropdown>
    );
}
 
export default ExitOptions;