import React, { Component } from 'react';

export class RoundPoints extends Component {
    render() {
        const round = this.props.language === 'en' ? 'Round' : 'Runda';
        const points = this.props.language === 'en' ? 'points' : 'punktów';
        return (
            <li>
                <div className="round">{round} {this.props.round}</div>
                <div>{this.props.points} {points}</div>
            </li>
        )
    }
}