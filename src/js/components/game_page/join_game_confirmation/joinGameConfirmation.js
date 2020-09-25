import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './joinGameConfirmation.scss';
//Custom Components
import Modal from 'components/global_components/modal/modal';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';

const Confirmation = (props) => {
    const { t } = useTranslation();
    const { gameId } = useParams(null);

    return (
        <Modal show={true} className={styles.confirmation} cardClassName={styles.card}>
            <h2>{t("You have joined the game")}</h2>
            <p className={styles.gameId}>{t("Game ID")}: {gameId}</p>
            <p className={styles.message}>{t("Please wait until game started")}</p>
            <LoadingSpinner background={false} />
        </Modal>
    );
}

export default Confirmation;