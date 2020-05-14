import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import  i18next  from 'i18next';

export class RoundPoints extends Component {
    render() {
        const points = this.props.points;
        return (
            <li>
                <div className="round">{<Trans>Round</Trans>} {this.props.round}</div>
                <div>{points} {i18next.t('points.key', {count: points})}</div>
            </li>
        )
    }
}