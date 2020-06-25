import React from 'react';
import { Trans } from 'react-i18next';
//Custom Components
import Switch from '@material-ui/core/Switch';

const Timer = ({ setTime, toggleTimer, timer, time }) => {
    const inputClass = timer ? 'active' : null;
    const defaultTime = `${time.hours}:${time.minutes}:${time.seconds}`;

    return (
        <div>
            <div className="time-option">
                <Switch onClick={toggleTimer} checked={timer}></Switch>
                <p><Trans>Player's time limit</Trans></p>
            </div>
            <input type="time" className={inputClass} onChange={(e) => {setTime(e.target.value)}} defaultValue={defaultTime} step="1"></input>
        </div>
    );
}
export default Timer;