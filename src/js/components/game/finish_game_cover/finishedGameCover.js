import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './finishedGameCover.scss';
//Custom Components
import Dropdown from 'components/global_components/dropdown/dropdown';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';

const FinishedGameCover = () => {
    const { t } = useTranslation();
    return (
        <Dropdown className={styles.confirmation}>
            <h2>{t("Game finished")}!</h2>
            <p className={styles.message}>{t("Please wait until points of unused letters will be substracted")}</p>
            <LoadingSpinner background={false} />
        </Dropdown>
    );
}

export default FinishedGameCover;