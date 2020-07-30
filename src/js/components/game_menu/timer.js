import React from 'react';
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next';
//Custom Components
import Switch from '@material-ui/core/Switch';
//Redux Actions
import { setTimer, setTime } from '../../actions/gameMenuActions';

const timer = (props) => {
    const { t } = useTranslation();
    const inputClass = props.timer ? 'active' : null;
    const defaultTime = `${props.time.hours}:${props.time.minutes}:${props.time.seconds}`;

    const timeChangeHandler = (e) => {
        let val = e.target.value
        let time = {};
        time.hours = val.slice(0, 2);
        time.minutes = val.slice(3, 5);
        time.seconds = val.slice(6, 8);
        if(time.seconds == '') {
            time.seconds= '00';
        }        
        props.setTime(time);
    }

    const toggleTimer = () => {
        props.setTimer(!props.timer)
    }

    return (
        <div>
            <div className="time-option">
                <Switch onClick={toggleTimer} checked={props.timer}></Switch>
                <p>{t("Player's time limit")}</p>
            </div>
            <input type="time" className={inputClass} onChange={timeChangeHandler} defaultValue={defaultTime} step="1"></input>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        timer: state.timeLimit.timer,
        time: state.timeLimit.time
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTimer: (timer) => { dispatch(setTimer(timer)) },
        setTime: (time) => { dispatch(setTime(time)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(timer);