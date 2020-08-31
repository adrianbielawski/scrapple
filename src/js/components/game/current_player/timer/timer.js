import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import db from 'firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import styles from './timer.scss';
//Custom Components
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import Button from 'components/global_components/button/button';
//Redux Actions
import { timeOut, setTimeLeft, setTimerPaused, setThisUserPaused } from 'actions/gameActions';
//Assets
import beep from 'audio/beep.mp3';
import longBeep from 'audio/long-beep.mp3';

const AUDIO = {
    beep: new Audio(beep),
    longBeep: new Audio(longBeep)
}

const Timer = (props) => {
    const { gameId } = useParams();

    useEffect(() => {
        let startTimer = null;
        if (!props.isTimerPaused) {
            props.setThisUserPaused(false);
            startTimer = setInterval(updateTimer, 100);
        }
        return () => {
            clearInterval(startTimer);
        }
    }, [props.endTime, props.isTimerPaused])

    useEffect(() => {
        if (props.timeLeft % 60 === 0 && props.admin && props.isAudioEnabled) {
            AUDIO.beep.play();
        }

        if (props.timeLeft <= 10 && props.admin && props.isAudioEnabled) {
            AUDIO.beep.play();
        }

        if (props.timeLeft === 0 && props.admin) {
            props.isAudioEnabled && AUDIO.longBeep.play();
            setTimeout(handleTimeOut, 1000);
        }
    }, [props.timeLeft])

    const handleTimeOut = () => {
        props.timeOut(props.players, props.currentPlayer, props.time, gameId)
    }

    const updateTimer = () => {
        if (props.endTime === null) {
            return;
        }

        const now = moment();
        let timeLeft = moment(props.endTime).diff(now, 'seconds', true);
        timeLeft = Math.ceil(timeLeft);

        props.setTimeLeft(timeLeft);
    }

    const getTimeLeft = () => {
        const time = props.timeLeft;
        if (time === null) {
            return <LoadingSpinner background={true} />;
        }
        const duration = moment.duration(Math.max(0, time), 'seconds');
        let timeLeft = time >= 3600 ? duration.format('HH:mm:ss') : duration.format('mm:ss', { trim: false });
        return timeLeft;
    }

    const handleTimePause = () => {
        props.setTimerPaused(!props.isTimerPaused);
        props.setThisUserPaused(!props.thisUserPaused);

        db.collection('games').doc(gameId).update({
            isTimerPaused: !props.isTimerPaused
        });
    }

    const shortTimeClass = props.timeLeft <= 30 ? styles.shortTime : '';

    return (
        <div className={styles.timerWrapper}>
            <div className={`${styles.timer} ${shortTimeClass}`}>{getTimeLeft()}</div>
            {!props.timeLeft <= 30 ?
                <Button className={styles.button}>
                    <FontAwesomeIcon icon={props.isTimerPaused ? faPlay : faPause} onClick={handleTimePause} />
                </Button>
            : null}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        admin: state.app.admin,
        isAudioEnabled: state.game.isAudioEnabled,
        timer: state.timeLimit.timer,
        time: state.timeLimit.time,
        endTime: state.game.endTime,
        timeLeft: state.game.timeLeft,
        currentPlayer: state.game.currentPlayer,
        players: state.game.players,
        isTimerPaused: state.game.isTimerPaused,
        thisUserPaused: state.game.thisUserPaused,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        timeOut: (players, currentPlayer, time, gameId) => dispatch(timeOut(players, currentPlayer, time, gameId)),
        setTimeLeft: (timeLeft) => dispatch(setTimeLeft(timeLeft)),
        setTimerPaused: (isTimerPaused) => dispatch(setTimerPaused(isTimerPaused)),
        setThisUserPaused: (thisUserPaused) => dispatch(setThisUserPaused(thisUserPaused)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Timer));