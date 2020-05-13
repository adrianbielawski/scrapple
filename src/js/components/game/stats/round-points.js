import React, { Component } from 'react';
import { Trans } from 'react-i18next';

export class RoundPoints extends Component {
    render() {
        return (
            <li>
                <div className="round">{<Trans>Round</Trans>} {this.props.round}</div>
                <div>{this.props.points} {<Trans>points</Trans>}</div>
            </li>
        )
    }
}