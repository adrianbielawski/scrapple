import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import  i18next  from 'i18next';
import Moment from 'react-moment';//important
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export class CurrentPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: this.props.time,
            timeLeft: this.props.timeLeft
        }
        this.beep = new Audio('../../../../src/assets/audio/beep.mp3');
        this.longBeep = new Audio('../../../../src/assets/audio/long-beep.mp3');
        this.endTime = this.getEndTime();
        this.startTimer = this.props.timer ? setInterval(this.updateTimer, 1000) : '';
    }

    componentWillUnmount = () => {
        clearInterval(this.startTimer);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let points = this.refs.points.value;
        points = parseInt(points, 10);
        this.props.addPoints(points);
        e.target.reset();
    }

    getEndTime = () => {
        const endTime = moment().add({
            'hours': this.state.timer.hours,
            'minutes': this.state.timer.minutes,
            'seconds': this.state.timer.seconds
        });        
        return endTime;
    }

    updateTimer = () => {
        const now = moment();
        const diff = this.endTime.diff(now);
        const duration = moment.duration(diff);
        let timeLeft = duration > 3590000 ? duration.format('HH:mm:ss') : duration.format('mm:ss',{trim: false});

        const time = moment(timeLeft, 'mm:ss');
        const time0 = moment('00:00', 'mm:ss');
        const shortTime = moment('00:10', 'mm:ss');
        if(time.isSameOrBefore(shortTime) && time.isAfter(time0)) {
            this.beep.play();
        }
        if(time.isSame(time0)){
            timeLeft = '00:00'
            this.longBeep.play();
            clearInterval(this.startTimer);
            setTimeout(this.timeOut, 1000);
        }
        this.setState(state => ({ ...state, timeLeft}));
    }

    timeOut = () => {
        this.props.timeOut();
    }

    getTimerClass = () => {
        let time = moment(this.state.timeLeft, 'mm:ss')
        let shortTime = moment('00:30', 'mm:ss');
        let shortTimeClass = time.isSameOrBefore(shortTime) ? 'short-time' : '';
        return shortTimeClass   
    }

    render() {
        const player = this.props.player;
        const playerName = player.playerName;
        const shortTimeClass = this.getTimerClass();
        const timerDisplay = this.props.timer ? 'show-timer' : '';
        
        return (
            <div className="current-player">
                <p>
                    <Trans i18nKey="ItsTurnNow">
                        It is <span>{{playerName}}</span>'s turn now
                    </Trans>!
                </p>
                <div className={`timer ${shortTimeClass} ${timerDisplay}`}>
                    {this.state.timeLeft}
                </div>
                <form className="add-points" onSubmit={this.handleSubmit}>
                    <input type="number" placeholder={i18next.t("add points")} ref="points" required min="0"></input>
                    <button type="submit" className="confirm">
                        <FontAwesomeIcon icon={faCheck}/>
                    </button>
                </form>
            </div>
        );
    }
}