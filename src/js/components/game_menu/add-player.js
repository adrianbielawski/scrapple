import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
//Redux Actions
import { addPlayer } from '../../actions/gameMenuActions';

const AddPlayer = (props) => {
    const inputEl = useRef(null);
    const { t } = useTranslation();

    const handleAddPlayer = () => {
        const player = inputEl.current.value.trim();
        validatePlayerName(player);
    };

    const validatePlayerName = (player) => {
        const isPlayerExists = checkPlayers(player);
        
        if(props.playersNames.length >= 4) {
            const messageKey = 'Max 4 players';
            props.alert('alert', messageKey);
            return
        }
        if(isPlayerExists) {
            const messageKey = 'Player exists';
            const messageValue = {'player': player};
            props.alert('alert', messageKey, messageValue, null);
            return
        }
        if(player.length < 1) {
            const messageKey = "Please type in player's name";
            props.alert('alert', messageKey);
            return
        }
        const input = document.getElementById('player-name');
        input.value = '';
        props.addPlayer(player)
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
                <button className="add" onClick={handleAddPlayer}>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);