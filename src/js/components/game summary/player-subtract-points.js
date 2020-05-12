import React, { Component } from 'react';

export class PlayerSubPoints extends Component {
    render() { 
        return (
            <li className="sub">
                <div className="player-name">{this.props.playerName}</div>
                <input id={`sub-points${this.props.index}`} type="number" min="0" placeholder="0" ref="points"></input>
            </li>
        );
    }
}