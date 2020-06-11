import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import Switch from '@material-ui/core/Switch';

export class Timer extends Component {
    render() {
        const inputClass = this.props.timer ? 'active' : null;

        return (
            <div>
                <div className="time-option">
                    <Switch onClick={this.props.toggleTimer} checked={this.props.timer}></Switch>
                    <p><Trans>Player's time limit</Trans></p>
                </div>
                <input type="time" className={inputClass} onChange={(e) => {this.props.setTime(e.target.value)}} defaultValue="00:05:00" step="1"></input>
            </div>
        );
    }
}