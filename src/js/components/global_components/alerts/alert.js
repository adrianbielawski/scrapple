import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import '../../../../css/alert.css';

export class Alert extends Component {
    handleAlertResponse = (e) => {
        const response = e.target.value;
        this.props.alertResponse(response);
    }

    render() {
        let alertButtons = '';
        if(this.props.type === 'confirm') {
            alertButtons =
                <div className="wraper">
                    <button className="yes" value="true" onClick={this.handleAlertResponse}>{<Trans>Yes</Trans>}</button>
                    <button className="no" value="false" onClick={this.handleAlertResponse}>{<Trans>No</Trans>}</button>
                </div>
        } else if(this.props.type === 'alert'){
            alertButtons = <button className="ok" value="false" onClick={this.handleAlertResponse}>OK</button>
        };

        return (
            <div className="alert-cover">
                <div className="alert">
                    <p><Trans>{this.props.alertMessage}</Trans></p>
                    {alertButtons}
                </div>
            </div>
        );
    }
}