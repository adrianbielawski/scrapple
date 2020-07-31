import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
//Redux Actions
import { addPlayer } from '../../actions/gameMenuActions';
import { setAlert } from '../../actions/appActions';

const AddPlayer = (props) => {
    const inputEl = useRef(null);
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const player = inputEl.current.value.trim();
        const isValid = validatePlayerName(player);

        if (isValid) {
            const input = document.getElementById('player-name');
            input.value = '';
            props.addPlayer(player)
        }
    };

    const validatePlayerName = (player) => {
        const isPlayerExists = checkPlayers(player);
        
        if(props.playersNames.length >= 4) {
            props.setAlert('alert', 'Max 4 players');
            return
        }
        if(isPlayerExists) {
            props.setAlert('alert', 'Player exists', {'player': player}, null);
            return
        }
        if(player.length < 1) {
            props.setAlert('alert', "Please type in player's name");
            return
        }
        return true;
    }
    
    const checkPlayers = (player) => {
        const lowNewPlayer = player.toLowerCase();
        const players = [ ...props.playersNames ]
        const lowPlayers = players.map((player) => {
            const lowPlayer = player.toLowerCase();
            return lowPlayer
        })
        return lowPlayers.includes(lowNewPlayer);
    }

    return (
        <div className="add-player">
            <p>{t("Add player")}</p>                    
            <div className="form">
                <input id="player-name" type="text" autoComplete="false" spellCheck="false" ref={inputEl}></input>
                <button className="add" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faPlus} className="plus"/>
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        playersNames: state.playersNames,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPlayer: (playerName) => { dispatch(addPlayer(playerName)) },
        setAlert: (type, messageKey, messageValue, action, props) => { dispatch(setAlert(type, messageKey, messageValue, action, props)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);