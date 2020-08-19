import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './confirmation.scss';
//Custom Components
import Modal from '../../global_components/modal/modal';
import LoadingSpinner from '../../global_components/loading_spinner/loadingSpinner';

const Confirmation = (props) => {
    const { t } = useTranslation();

    return (
        <Modal show={props.show} className={styles.confirmation}>
            <h2>{t("You have joined the game")}</h2>
            <p className={styles.gameId}>{t("Game ID")}: {props.gameId}</p>
            <p className={styles.message}>{t("Please wait until game started")}</p>
            <LoadingSpinner background={false} />
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        gameId: state.app.gameId,
    }
}

export default connect(mapStateToProps)(Confirmation)