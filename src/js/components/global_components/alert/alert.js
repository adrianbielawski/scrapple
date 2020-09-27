import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { useTranslation } from 'react-i18next';
import styles from './alert.scss';
//Custom components
import Button from 'components/global_components/button/button';
//Redux Actions
import { setAlert, removeAlert } from 'actions/appActions';
import { changeUserName, changeUserPassword } from 'actions/authActions';
import { handleFinishGame } from 'actions/gameActions';
import { quitGame } from 'actions/sideMenuActions';

const Alert = (props) => {
    const { t } = useTranslation();
    const history = useHistory();

    const handleAlertResponse = (e) => {
        const response = e.target.value;
        if (response === 'true') {
            switch (props.alert.action) {
                case 'game-finish-button':
                    props.handleFinishGame({...props.alert.alertProps});
                    break;

                case 'user-registered':
                    history.push('/login');
                    break;

                case 'change-name':
                    props.changeUserName({...props.alert.alertProps});
                    break;

                case 'change-password':
                    props.changeUserPassword({...props.alert.alertProps})
                    break;

                case 'quit-game':
                    props.quitGame({...props.alert.alertProps});
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
        alertButtons = <Button className={styles.ok} value="true" onClick={handleAlertResponse}>OK</Button>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: (type, messageKey, messageValue, action, alertProps) => dispatch(setAlert(type, messageKey, messageValue, action, alertProps)),
        removeAlert: () => dispatch(removeAlert()),
        handleFinishGame: (gameId) => dispatch(handleFinishGame(gameId)),
        changeUserName: (newName) => dispatch(changeUserName(newName)),
        changeUserPassword: (newPassword) => dispatch(changeUserPassword(newPassword)),
        quitGame: (playerId, history) => dispatch(quitGame(playerId, history)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Alert));