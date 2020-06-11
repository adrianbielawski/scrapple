import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export class AddPlayer extends Component {

    handleAddPlayer = () => {
        const player = this.refs.playerName.value;
        this.props.validatePlayerName(player);
    }

    render() {
        return (
            <div className="add-player">
                <p><Trans>Add player</Trans></p>                    
                <div className="form">
                    <input id="player-name" type="text" autoComplete="false" spellCheck="false" ref="playerName"></input>
                    <button className="add" onClick={this.handleAddPlayer}>
                        <FontAwesomeIcon icon={faPlus} className="plus"/>
                    </button>
                </div>
            </div>
        );
    }
}