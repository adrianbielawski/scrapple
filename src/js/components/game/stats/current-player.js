import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../global_components/loadingSpinner';

const audio = {
    beep: new Audio('../../../../src/assets/audio/beep.mp3'),
    longBeep: new Audio('../../../../src/assets/audio/long-beep.mp3')
}

class CurrentPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: null
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.startTimer);
    }
    
    componentDidUpdate(prevProps) {
        if(prevProps.endTime !== this.state.endTime) {
            clearInterval(this.startTimer);
        }

        if(this.props.endTime && this.props.endTime !== this.state.endTime) {
            clearInterval(this.startTimer);
            this.setState(state => ({ ...state, endTime: this.props.endTime}));
            this.updateTimer();
            this.startTimer = this.props.timer ? setInterval(this.updateTimer, 1000) : null;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let points = this.refs.points.value;
        points = parseInt(points, 10);
        this.props.addPoints(points);
        e.target.reset();
    }

    updateTimer = () => {
        const now = moment();
        const diff = moment(this.props.endTime).diff(now);
        const duration = moment.duration(diff);
        let timeLeft = duration > 3590000 ? duration.format('HH:mm:ss') : duration.format('mm:ss',{trim: false});

        const time = moment(timeLeft, 'mm:ss');
        const time0 = moment('00:00', 'mm:ss');
        const shortTime = moment('00:10', 'mm:ss');
        if(time.isSameOrBefore(shortTime) && time.isAfter(time0) && this.props.admin && this.props.isAudioEnabled) {
            audio.beep.play();
        }
        if(time.isSame(time0)){
            if(this.props.admin) {
                this.props.isAudioEnabled && audio.longBeep.play();
                setTimeout(this.props.timeOut, 1000);
            }
            timeLeft = '00:00'
            clearInterval(this.startTimer);
        }
        this.setState(state => ({ ...state, timeLeft}));
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
                    {this.state.timeLeft ? this.state.timeLeft : <LoadingSpinner />}
                </div>
                <form className="add-points" onSubmit={this.handleSubmit}>
                    <input type="number" placeholder={this.props.t("Add points")} ref="points" required min="0" max="999" />
                    <button type="submit" className="confirm">
                        <FontAwesomeIcon icon={faCheck}/>
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      admin: state.app.admin,
    }
}

export default connect(mapStateToProps)(withTranslation()(CurrentPlayer));