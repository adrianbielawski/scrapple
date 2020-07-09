import React from 'react';
import { useTranslation } from 'react-i18next';
//Custom Components
import Dropdown from '../global_components/dropdown';

const ExitOptions = (props) => {
    const { t } = useTranslation();
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
            <button onClick={handlePlayAgain}>{t("Play again")}</button>
            <button onClick={handlePlayAgainSettings}>{t("Play again with new settings")}</button>
            <button onClick={handleExitGame}>{t("Exit")}</button>
        </Dropdown>
    );
}
 
export default ExitOptions;