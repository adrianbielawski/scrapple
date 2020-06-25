import React from 'react';
import i18next from 'i18next';
import { Trans } from 'react-i18next';
import '../../../styles/alert.scss';

const Alert = (props) => {
    const handleAlertResponse = (e) => {
        const response = e.target.value;
        if(props.alert.type === 'confirm') {
            if(response === 'true') {
                switch(props.alert.action) {
                    case 'game-finish-button':
                    props.handleFinishGame();
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
                <button className="yes" value="true" onClick={handleAlertResponse}>{<Trans>Yes</Trans>}</button>
                <button className="no" value="false" onClick={handleAlertResponse}>{<Trans>No</Trans>}</button>
            </div>
    } else if(props.alert.type === 'alert') {
        alertButtons = <button className="ok" value="false" onClick={handleAlertResponse}>OK</button>
    };

    return (
        <div className="alert-cover">
            <div className="alert">
                <p>{i18next.t(props.alert.alertMessage, props.alert.messageValue)}</p>
                {alertButtons}
            </div>
        </div>
    );
}
export default Alert;