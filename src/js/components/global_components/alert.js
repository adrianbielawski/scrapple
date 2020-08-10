import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../../styles/alert.scss';
//Redux Actions
import { setAlert, removeAlert, handleFinishGame, setScreen } from '../../actions/appActions';

const Alert = (props) => {
    const { t } = useTranslation();

    const handleAlertResponse = (e) => {
        const response = e.target.value;
        if(response === 'true') {
            switch(props.alert.action) {
                case 'game-finish-button':
                props.handleFinishGame(props.gameId, props.admin);

                case 'user-registered':
                props.setScreen('login');
            }
        } 
        props.removeAlert(); 
    }   

    let alertButtons = '';
    if(props.alert.type === 'confirm') {
        alertButtons =
            <div className="wraper">
                <button className="yes" value="true" onClick={handleAlertResponse}>{t("Yes")}</button>
                <button className="no" value="false" onClick={handleAlertResponse}>{t("No")}</button>
            </div>
    } else if(props.alert.type === 'alert') {
        alertButtons = <button className="ok" value="true" onClick={handleAlertResponse}>OK</button>
    };

    return (
        <div className="alert-cover">
            <div className="alert">
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
    handleFinishGame: (gameId, admin) => dispatch(handleFinishGame(gameId, admin)),
    setScreen: (screen) => dispatch(setScreen(screen)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);