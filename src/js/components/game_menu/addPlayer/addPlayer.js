import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './addPlayer.scss';
//Custom components
import Button from 'components/global_components/button/button';
import Input from 'components/global_components/input/input';
//Redux Actions
import { addPlayer } from 'actions/gameMenuActions';
import { setAlert } from 'actions/appActions';

const AddPlayer = (props) => {
    const inputEl = useRef(null);
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const player = inputEl.current.value.trim();
        const isValid = validatePlayerName(player);

        if (isValid) {
            inputEl.current.value = '';
            props.addPlayer(player, null, false)
        }
    };

    const validatePlayerName = (player) => {
        const isPlayerExists = checkPlayers(player);

        if (props.players.length >= 4) {
            props.setAlert('alert', 'Max 4 players');
            return
        }
        if (isPlayerExists) {
            props.setAlert('alert', 'Player exists', { 'player': player }, null);
            return
        }
        if (player.length < 1) {
            props.setAlert('alert', "Please type in player's name");
            return
        }
        return true;
    }

    const checkPlayers = (player) => {
        const lowNewPlayer = player.toLowerCase();
        const players = [...props.players];
        const lowPlayers = players.map((player) => {
            const lowPlayer = player.playerName.toLowerCase();
            return lowPlayer
        });
        return lowPlayers.includes(lowNewPlayer);
    }

    return (
        <div className={styles.addPlayer}>
            <p>{t("Add player")}</p>
            <div className={styles.form}>
                <Input type="text" autoComplete="false" spellCheck="false" maxLength="30" ref={inputEl} />
                <Button className={styles.add} onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faPlus} className="plus" />
                </Button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        gameId: state.app.gameId,
        players: state.game.players,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPlayer: (playerName, uid, admin) => dispatch(addPlayer(playerName, uid, admin)),
        setAlert: (type, messageKey, messageValue, action, props) => dispatch(setAlert(type, messageKey, messageValue, action, props)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);