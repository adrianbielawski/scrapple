import React from 'react';
import { Trans } from 'react-i18next';
import Switch from '@material-ui/core/Switch';

export const Timer = (props) => {
    const inputClass = props.timer ? 'active' : null;

    return (
        <div>
            <div className="time-option">
                <Switch onClick={props.toggleTimer} checked={props.timer}></Switch>
                <p><Trans>Player's time limit</Trans></p>
            </div>
            <input type="time" className={inputClass} onChange={(e) => {props.setTime(e.target.value)}} defaultValue="00:05:00" step="1"></input>
        </div>
    );
}