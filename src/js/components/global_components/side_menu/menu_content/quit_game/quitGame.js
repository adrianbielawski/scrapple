import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './quitGame.scss'
//Redux actions
import { setAlert } from 'actions/appActions';

const QuitGame = (props) => {
    const { t } = useTranslation();
    let history = useHistory();
    const player = props.players.find(player => {
        return player.user.id === props.user.id
    })

    const handleQuitGame = () => {
        if (props.players.length === 2) {
            props.setAlert('alert', "You can't quit this game, 2 players are required",);
            return;
        }
        props.setAlert('confirm', 'Are you sure you want to quit this game', null, 'quit-game',
            {
                playerId: player.id,
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
        players: state.gamePage.players,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: (alertType, messageKey, messageValue, action, alertProps) => dispatch(setAlert(
            alertType, messageKey, messageValue, action, alertProps)
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuitGame);