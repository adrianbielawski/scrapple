import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './finishedGameCover.scss';
//Custom Components
import Modal from 'components/global_components/modal/modal';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';

const FinishedGameCover = (props) => {
    const { t } = useTranslation();
    return (
        <Modal show={props.show} className={styles.confirmation}>
            <h2>{t("Game finished")}!</h2>
            <p className={styles.message}>{t("Please wait until points of unused letters will be substracted")}</p>
            <LoadingSpinner background={false} />
        </Modal>
    );
}

export default FinishedGameCover;