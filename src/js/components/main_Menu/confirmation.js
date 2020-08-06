import React from 'react';
import { useTranslation } from 'react-i18next';
//Custom Components
import Dropdown from '../global_components/dropdown';
import LoadingSpinner from '../global_components/loadingSpinner';

const Confirmation = (props) => {
    const { t } = useTranslation();
    
    return ( 
        <Dropdown className="confirmation">
            <h2>{t("You have joined the game")}</h2>
            <p className="game-id">{t("Game ID")}: {props.gameId}</p>
            <p className="message">{t("Please wait until game started")}</p>
            <LoadingSpinner background={false} />            
        </Dropdown>
    );
}
 
export default Confirmation;