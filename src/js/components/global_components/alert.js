import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../../styles/alert.scss';
//Redux Actions
import { setAlert, removeAlert } from '../../actions/appActions';

const Alert = (props) => {
    const { t } = useTranslation();

    const handleAlertResponse = (e) => {
        const response = e.target.value;
        if(props.alert.type === 'confirm') {
            if(response === 'true') {
                switch(props.alert.action) {
                    case 'game-finish-button':
                    props.handleFinishGame(props.alert.props);
                }
            } else {
                props.removeAlert(); 
            }
        } else if(props.alert.type === 'alert') {
            props.removeAlert();
        }
    };
    

    let alertButtons = '';
    if(props.alert.type === 'confirm') {
        alertButtons =
            <div className="wraper">
                <button className="yes" value="true" onClick={handleAlertResponse}>{t("Yes")}</button>
                <button className="no" value="false" onClick={handleAlertResponse}>{t("No")}</button>
            </div>
    } else if(props.alert.type === 'alert') {
        alertButtons = <button className="ok" value="false" onClick={handleAlertResponse}>OK</button>
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
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (type, messageKey, messageValue, action, props) => { dispatch(setAlert(type, messageKey, messageValue, action, props)) },
    removeAlert: () => { dispatch(removeAlert()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);