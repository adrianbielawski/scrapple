import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './addPointsForm.scss';
//Custom Components
import Button from 'components/global_components/button/button';
import Input from 'components/global_components/input/input';
//Redux Actions
import { addPoints } from 'actions/gameActions';

const AddPointsForm = (props) => {
    const { t } = useTranslation();
    const pointsInput = useRef(null);
    const { gameId } = useParams();

    useEffect(() => {
        if (props.thisUserPaused) {
            pointsInput.current.focus();
        }
    }, [props.thisUserPaused])

    const handleSubmit = (e) => {
        e.preventDefault();
        let points = pointsInput.current.value;
        points = parseInt(points, 10);
        e.target.reset();
        props.addPoints(points, props.players, props.currentPlayer, props.timer, props.time, gameId);
    }

    return (
        <form className={`${styles.addPoints} ${props.thisUserPaused || !props.timer ? styles.active : ''}`} onSubmit={handleSubmit}>
            <Input type="number" placeholder={t("Add points")} ref={pointsInput} required min="0" max="999" />
            <Button type="submit" className={styles.confirm}>
                <FontAwesomeIcon icon={faCheck} />
            </Button>
        </form>
    );
}

const mapStateToProps = (state) => {
    return {
        timer: state.timeLimit.timer,
        time: state.timeLimit.time,
        thisUserPaused: state.game.thisUserPaused,
        currentPlayer: state.game.currentPlayer,
        players: state.game.players,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPoints: (points, players, currentPlayer, timer, time, gameId) => dispatch(addPoints(points, players, currentPlayer, timer, time, gameId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddPointsForm));