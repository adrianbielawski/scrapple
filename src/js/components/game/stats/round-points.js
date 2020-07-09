import React from 'react';
import { useTranslation } from 'react-i18next';

const RoundPoints = (props) => {
    const { t } = useTranslation();
    const points = props.points;
    return (
        <li>
            <div className="round">{t("Round")} {props.round}</div>
            <div>{points} {t('points.key', {count: points})}</div>
        </li>
    );
}
export default RoundPoints;