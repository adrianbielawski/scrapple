import React, { Component } from 'react';
import '../../../../css/alert.css';

export class Alert extends Component {
    handleAlertResponse = (e) => {
        const response = e.target.value;
        this.props.alertResponse(response);
    }

    render() {
        const lang = this.props.language;
        const yes = lang === 'en' ? 'Yes' : 'Tak';
        const no = lang === 'en' ? 'No' : 'Nie';
        let alertButtons = '';
        if(this.props.type === 'confirm') {
            alertButtons =
                <div className="wraper">
                    <button className="yes" value="true" onClick={this.handleAlertResponse}>{yes}</button>
                    <button className="no" value="false" onClick={this.handleAlertResponse}>{no}</button>
                </div>
        } else if(this.props.type === 'alert'){
            alertButtons = <button className="ok" value="false" onClick={this.handleAlertResponse}>OK</button>
        };

        return (
            <div className="alert-cover">
                <div className="alert">
                    <p>{this.props.alertMessage}</p>
                    {alertButtons}
                </div>
            </div>
        );
    }
}