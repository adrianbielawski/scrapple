import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './timer.scss';
//Custom Components
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import Button from 'components/global_components/button/button';
//Redux Actions
import { timerUpdated, timerPaused, timerUnpaused } from 'actions/gameActions';
//Assets
import beep from 'audio/beep.mp3';
import longBeep from 'audio/long-beep.mp3';

const AUDIO = {
    beep: new Audio(beep),
    longBeep: new Audio(longBeep)
}

const Timer = (props) => {
    const { gameId } = useParams();
    const timerInterval = useRef(null);
    const admin = props.user.id === props.gameData.createdBy;

    useEffect(() => {
        updateTimer();
        if (props.gameData.timePausedBy === null) {
            timerInterval.current = setInterval(updateTimer, 1000);
        }
        return () => {
            clearInterval(timerInterval.current);
        }
    }, [props.gameData.timeEnd, props.gameData.timePausedBy])

    useEffect(() => {
        if (props.timeLeft % 60 === 0 && admin && props.isAudioEnabled
            || props.timeLeft <= 10 && admin && props.isAudioEnabled) {
            AUDIO.beep.play();
        }

        if (props.timeLeft <= 0 && props.timeLeft !== null && admin) {
            props.isAudioEnabled && AUDIO.longBeep.play();
            setTimeout(props.onTimeOut, 1000);
        }
    }, [props.timeLeft])

    const updateTimer = () => {
        if (props.gameData.timeEnd === null) {
            return;
        }
        props.timerUpdated(props.gameData.timeEnd)
    }

    const getTimer = () => {
        const time = props.timeLeft;
        if (time === null) {
            return <LoadingSpinner background={true} />;
        }
        const duration = moment.duration(time, 'seconds');
        let timer = time >= 3600 ? duration.format('HH:mm:ss') : duration.format('mm:ss', { trim: false });
        return timer;
    }

    const handleTimePause = () => {
        if (props.gameData.timePausedBy === null) {
            props.timerPaused(gameId);
        } else {
            props.timerUnpaused(gameId);
        }
    }

    const cx = classNames.bind(styles);
    const timerClass = cx({
        timer: true,
        shortTime: props.timeLeft <= 30,
    });

    return (
        <div className={styles.timerWrapper}>
            <div className={timerClass}>{getTimer()}</div>
            {!props.timeLeft <= 30 ?
                <Button className={styles.button}>
                    <FontAwesomeIcon icon={props.gameData.timePausedBy ? faPlay : faPause} onClick={handleTimePause} />
                </Button>
                : null
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.app.user,
        gameData: state.gamePage.gameData,
        players: state.gamePage.players,
        timeLeft: state.game.timeLeft,
        isAudioEnabled: state.game.isAudioEnabled,
        thisUserPaused: state.game.thisUserPaused,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        timerUpdated: (timeLeft) => dispatch(timerUpdated(timeLeft)),
        timerPaused: (gameId) => dispatch(timerPaused(gameId)),
        timerUnpaused: (gameId) => dispatch(timerUnpaused(gameId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Timer));