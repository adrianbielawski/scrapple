import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './confirmation.scss';
//Custom Components
import Dropdown from '../../global_components/dropdown/dropdown';
import LoadingSpinner from '../../global_components/loading_spinner/loadingSpinner';

const Confirmation = (props) => {
    const { t } = useTranslation();

    return (
        <Dropdown className={styles.confirmation}>
            <h2>{t("You have joined the game")}</h2>
            <p className={styles.gameId}>{t("Game ID")}: {props.gameId}</p>
            <p className={styles.message}>{t("Please wait until game started")}</p>
            <LoadingSpinner background={false} />
        </Dropdown>
    );
}

const mapStateToProps = (state) => {
    return {
        gameId: state.app.gameId,
    }
}

export default connect(mapStateToProps)(Confirmation)