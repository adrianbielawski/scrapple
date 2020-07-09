import React from 'react';
import { useTranslation } from 'react-i18next';
//Custom Components
import Dropdown from '../global_components/dropdown';

const ExitOptions = (props) => {
    const { t } = useTranslation();
    const handlePlayAgain = () => {
        props.playAgain()
    };

    const handlePlayAgainSettings = () => {
        props.playAgainSettings()
    };

    const handleExitGame = () => {
        props.exitGame()
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