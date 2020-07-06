import React from 'react';
import { Trans } from 'react-i18next';
//Custom Components
import Dropdown from '../global_components/dropdown';

const ExitOptions = (props) => {
    const handlePlayAgain = () => {
        props.playAgain(props.gameId)
    };

    const handlePlayAgainSettings = () => {
        props.playAgainSettings(props.gameId)
    };

    const handleExitGame = () => {
        props.exitGame(props.gameId)
    }
    return ( 
        <Dropdown className="confirmation">
            <button onClick={handlePlayAgain}><Trans>Play again</Trans></button>
            <button onClick={handlePlayAgainSettings}><Trans>Play again with new settings</Trans></button>
            <button onClick={handleExitGame}><Trans>Exit</Trans></button>
        </Dropdown>
    );
}
 
export default ExitOptions;