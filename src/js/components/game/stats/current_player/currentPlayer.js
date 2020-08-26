import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './currentPlayer.scss';
//Custom Components
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import Button from 'components/global_components/button/button';
//Redux Actions
import { addPoints, timeOut, setTimeLeft } from 'actions/gameActions';
//Assets
import beep from 'audio/beep.mp3';
import longBeep from 'audio/long-beep.mp3';

const AUDIO = {
    beep: new Audio(beep),
    longBeep: new Audio(longBeep)
}

const CurrentPlayer = (props) => {
    const pointsInput = useRef(null);

    useEffect(() => {
        const startTimer = setInterval(updateTimer, 100);
        return () => {
            clearInterval(startTimer);
        }
    }, [props.endTime])

    useEffect(() => {
        if (props.timeLeft <= 10 && props.admin && props.isAudioEnabled) {
            AUDIO.beep.play();
        }

        if (props.timeLeft === 0 && props.admin) {
            props.isAudioEnabled && AUDIO.longBeep.play();
            setTimeout(handleTimeOut, 1000);
        }
    }, [props.timeLeft])

    const handleTimeOut = () => {
        props.timeOut(props.players, props.currentPlayer, props.time, props.gameId)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let points = pointsInput.current.value;
        points = parseInt(points, 10);
        e.target.reset();
        props.addPoints(points, props.players, props.currentPlayer, props.timer, props.time, props.gameId);
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

    const playerName = props.players[props.currentPlayer].playerName;
    const shortTimeClass = props.timeLeft <= 30 ? styles.shortTime : '';

    return (
        <div className={styles.currentPlayer}>
            <p>
                <Trans i18nKey="ItsTurnNow">
                    It is <span>{{ playerName }}</span>'s turn now
                </Trans>
            </p>
            {props.timer && <div className={`${styles.timer} ${shortTimeClass}`}>
                {getTimeLeft()}
            </div>}
            <form className={styles.addPoints} onSubmit={handleSubmit}>
                <input type="number" placeholder={props.t("Add points")} ref={pointsInput} required min="0" max="999" />
                <Button type="submit" className={styles.confirm}>
                    <FontAwesomeIcon icon={faCheck} />
                </Button>
            </form>
        </div>
    );
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
        addPoints: (points, players, currentPlayer, timer, time, gameId) => dispatch(addPoints(points, players, currentPlayer, timer, time, gameId)),
        timeOut: (players, currentPlayer, time, gameId) => dispatch(timeOut(players, currentPlayer, time, gameId)),
        setTimeLeft: (timeLeft) => dispatch(setTimeLeft(timeLeft)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CurrentPlayer));