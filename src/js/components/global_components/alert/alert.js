import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { useTranslation } from 'react-i18next';
import styles from './alert.scss';
//Redux Actions
import { setAlert, removeAlert, handleFinishGame } from 'actions/appActions';
import { changeUserName } from 'actions/authActions';

const Alert = (props) => {
    const { t } = useTranslation();

    const handleAlertResponse = (e) => {
        const response = e.target.value;
        if (response === 'true') {
            switch (props.alert.action) {
                case 'game-finish-button':
                    props.handleFinishGame(props.gameId, props.admin, props.history);
                    break;

                case 'user-registered':
                    props.history.push('/login');
                    break;

                case 'change-name':
                    props.changeUserName(props.alert.alertProps);
                    break;
            }
        }
        props.removeAlert();
    }

    let alertButtons = '';
    if (props.alert.type === 'confirm') {
        alertButtons =
            <div className={styles.wraper}>
                <button className={styles.yes} value="true" onClick={handleAlertResponse}>{t("Yes")}</button>
                <button className={styles.no} value="false" onClick={handleAlertResponse}>{t("No")}</button>
            </div>
    } else if (props.alert.type === 'alert') {
        alertButtons = <button className={styles.ok} value="true" onClick={handleAlertResponse}>OK</button>
    };

    return (
        <div className={styles.alertCover}>
            <div className={styles.alert}>
                <p>{t(props.alert.messageKey, props.alert.messageValue)}</p>
                {alertButtons}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        alert: state.app.alert,
        gameId: state.app.gameId,
        admin: state.app.admin,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: (type, messageKey, messageValue, action, alertProps) => dispatch(setAlert(type, messageKey, messageValue, action, alertProps)),
        removeAlert: () => dispatch(removeAlert()),
        handleFinishGame: (gameId, admin, history) => dispatch(handleFinishGame(gameId, admin, history)),
        setShowChangeNameModal: (showChangeNameModal) => dispatch(setShowChangeNameModal(showChangeNameModal)),
        changeUserName: (newName) => dispatch(changeUserName(newName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Alert));