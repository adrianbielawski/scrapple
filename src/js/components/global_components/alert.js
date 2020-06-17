import React from 'react';
import { Trans } from 'react-i18next';
import i18next from 'i18next';
import '../../../styles/alert.scss';

export const Alert = (props) => {
    const handleAlertResponse = (e) => {
        const response = e.target.value;
        props.alertResponse(response);
    }

    let alertButtons = '';
    if(props.type === 'confirm') {
        alertButtons =
            <div className="wraper">
                <button className="yes" value="true" onClick={handleAlertResponse}>{<Trans>Yes</Trans>}</button>
                <button className="no" value="false" onClick={handleAlertResponse}>{<Trans>No</Trans>}</button>
            </div>
    } else if(props.type === 'alert') {
        alertButtons = <button className="ok" value="false" onClick={handleAlertResponse}>OK</button>
    };

    return (
        <div className="alert-cover">
            <div className="alert">
                <p>{i18next.t(props.alertMessage, props.messageValue)}</p>
                {alertButtons}
            </div>
        </div>
    );
}