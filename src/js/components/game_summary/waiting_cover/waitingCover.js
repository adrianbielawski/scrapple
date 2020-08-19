import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './waitingCover.scss';
//Custom Components
import Modal from '../../global_components/modal/modal';
import LoadingSpinner from '../../global_components/loading_spinner/loadingSpinner';

const WaitingCover = (props) => {
    const { t } = useTranslation();

    let title = 'Game continues!';
    let message = 'Please wait until settings will be changed';
    if (props.exitOption === 'playAgain') {
        message = 'Please wait until game started';
    }
    return (
        <Modal className={styles.confirmation}>
            <h2>{t(title)}</h2>
            <p className={styles.message}>{t(message)}</p>
            <LoadingSpinner background={false} />
        </Modal>
    );
}

export default WaitingCover;