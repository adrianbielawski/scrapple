import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './quitGame.scss'
//Redux actions
import { setAlert } from 'actions/appActions';

const QuitGame = (props) => {
    const { t } = useTranslation();
    const { gameId } = useParams();
    let history = useHistory();

    const handleQuitGame = () => {
        if (props.players.length === 2) {
            props.setAlert('alert', "You can't quit this game, 2 players is required",);
            return;
        }
        props.setAlert('confirm', 'Are you sure you want to quit this game', null, 'quit-game',
            {
                uid: props.user.uid,
                gameId,
                players: props.players,
                currentPlayer: props.currentPlayer,
                endTime: props.endTime,
                time: props.time,
                history,
            }
        );
    }

    return (
        <div>
            <p className={styles.title} onClick={handleQuitGame}>{t("Quit this game")}</p>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.app.user,
        players: state.game.players,
        currentPlayer: state.game.currentPlayer,
        endTime: state.game.endTime,
        time: state.timeLimit.time,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: (alertType, messageKey, messageValue, action, alertProps) => dispatch(setAlert(alertType, messageKey, messageValue, action, alertProps)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuitGame);