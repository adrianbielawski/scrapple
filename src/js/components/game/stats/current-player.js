import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
//Custom Components
import LoadingSpinner from '../../global_components/loadingSpinner';
//Redux Actions
import { setEndTime, addPoints, timeOut, setTimeLeft } from '../../../actions/gameActions';

const audio = {
    beep: new Audio('../../../../src/assets/audio/beep.mp3'),
    longBeep: new Audio('../../../../src/assets/audio/long-beep.mp3')
}

class CurrentPlayer extends Component {
    componentDidMount = () => {
        this.updateTimer(this.props.endTime);
        this.startTimer = setInterval(this.updateTimer, 100);
    }

    componentWillUnmount = () => {
        clearInterval(this.startTimer);
    }

    componentDidUpdate = (prevProps)  => {
        if (prevProps.timeLeft == this.props.timeLeft) {
            return;
        }

        const timeLeft = this.props.timeLeft;
        if(timeLeft <= 10 && this.props.admin && this.props.isAudioEnabled) {
            audio.beep.play();
        }

        if(timeLeft === 0 && this.props.admin){
            this.props.isAudioEnabled && audio.longBeep.play();
            setTimeout(this.handleTimeOut, 1000);
        }
    }
    
    // componentDidUpdate(prevProps) {
    //     console.log(prevProps.endTime, this.props.endTime)
    //     if(prevProps.endTime !== this.props.endTime) {
    //         clearInterval(this.startTimer);
    //     }

    //     if(this.props.endTime && (prevProps.endTime !== this.props.endTime || this.state.timeLeft === null)) {
    //         clearInterval(this.startTimer);
    //         this.props.setEndTime(this.props.endTime);
    //         this.updateTimer();
    //         this.startTimer = this.props.timer ? setInterval(this.updateTimer, 1000) : null;
    //     }
    // }

    handleTimeOut = () => {
        this.props.timeOut(this.props.players, this.props.currentPlayer, this.props.time, this.props.gameId)
    }


    handleSubmit = (e) => {
        e.preventDefault();
        let points = this.refs.points.value;
        points = parseInt(points, 10);
        e.target.reset();
        this.props.addPoints(points, this.props.players, this.props.currentPlayer, this.props.timer, this.props.time, this.props.gameId);
    }

    updateTimer = () => {
        if (this.props.endTime === null) {
            return;
        }

        const now = moment();
        let timeLeft = moment(this.props.endTime).diff(now, 'seconds', true);
        timeLeft = Math.ceil(timeLeft);

        this.props.setTimeLeft(timeLeft);
    }

    getTimeLeft = () => {
        const time = this.props.timeLeft;
        if (time === null) {
            return <LoadingSpinner />;
        }
        const duration = moment.duration(Math.max(0, time), 'seconds');
        let timeLeft = time >= 3600 ? duration.format('HH:mm:ss') : duration.format('mm:ss', {trim: false});
        return timeLeft;
    }

    render() {
        const playerName = this.props.players[this.props.currentPlayer].playerName;
        const shortTimeClass = this.props.timeLeft <= 30 ? 'short-time' : '';
        
        return (
            <div className="current-player">
                <p>
                    <Trans i18nKey="ItsTurnNow">
                        It is <span>{{playerName}}</span>'s turn now
                    </Trans>!
                </p>
                { this.props.timer && <div className={`timer ${shortTimeClass}`}>
                    {this.getTimeLeft()}
                </div> }
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
      gameId: state.app.gameId,
      isAudioEnabled: state.game.isAudioEnabled,
      timer: state.timeLimit.timer,
      time: state.timeLimit.time,
      endTime: state.game.endTime,
      timeLeft: state.game.timeLeft,
      currentPlayer: state.game.currentPlayer,
      players: state.game.players,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEndTime: (endTime) => { dispatch(setEndTime(endTime)) },
    addPoints: (points, players, currentPlayer, timer, time, gameId) => { dispatch(addPoints(points, players, currentPlayer, timer, time, gameId)) },
    timeOut: (players, currentPlayer, time, gameId) => { dispatch(timeOut(players, currentPlayer, time, gameId)) },
    setTimeLeft: (timeLeft) => { dispatch(setTimeLeft(timeLeft)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CurrentPlayer));