import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './roundPoints.scss';

const RoundPoints = (props) => {
    const { t } = useTranslation();
    const points = props.points;
    return (
        <li className={styles.roundPoints}>
            <p className={styles.round}>{t("Round")} {props.round}</p>
            <p>{points} {t('points.key', { count: points })}</p>
        </li>
    );
}

export default RoundPoints;