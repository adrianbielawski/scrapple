import React, { useRef } from 'react';
import { Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddPlayer = (props) => {
    const inputEl = useRef(null);

    const handleAddPlayer = () => {
        const player = inputEl.current.value.trim();
        props.validatePlayerName(player);
    };

    return (
        <div className="add-player">
            <p><Trans>Add player</Trans></p>                    
            <div className="form">
                <input id="player-name" type="text" autoComplete="false" spellCheck="false" ref={inputEl}></input>
                <button className="add" onClick={handleAddPlayer}>
                    <FontAwesomeIcon icon={faPlus} className="plus"/>
                </button>
            </div>
        </div>
    );
}
export default AddPlayer;