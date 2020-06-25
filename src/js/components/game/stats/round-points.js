import React from 'react';
import { Trans } from 'react-i18next';
import  i18next  from 'i18next';

const RoundPoints = (props) => {
    const points = props.points;
    return (
        <li>
            <div className="round">{<Trans>Round</Trans>} {props.round}</div>
            <div>{points} {i18next.t('points.key', {count: points})}</div>
        </li>
    );
}
export default RoundPoints;