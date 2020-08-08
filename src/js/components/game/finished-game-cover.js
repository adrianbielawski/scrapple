import React from 'react';
import { useTranslation } from 'react-i18next';
//Custom Components
import Dropdown from '../global_components/dropdown';
import LoadingSpinner from '../global_components/loadingSpinner';

const FinishedGameCover = () => {
    const { t } = useTranslation();
    return ( 
        <Dropdown className="confirmation">
            <h2>{t("Game finished")}!</h2>
            <p className="message">{t("Please wait until points of unused letters will be substracted")}</p>
            <LoadingSpinner background={false} />               
        </Dropdown>
    );
}
 
export default FinishedGameCover;