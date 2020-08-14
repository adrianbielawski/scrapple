import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './roundPoints.scss';

const RoundPoints = (props) => {
    const { t } = useTranslation();
    const points = props.points;
    return (
        <li className={styles.roundPoints}>
            <div className={styles.round}>{t("Round")} {props.round}</div>
            <div>{points} {t('points.key', {count: points})}</div>
        </li>
    );
}
export default RoundPoints;