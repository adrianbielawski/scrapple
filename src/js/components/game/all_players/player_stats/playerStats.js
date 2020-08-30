import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faSlash, faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './playerStats.scss';
//Custom Components
import RoundPoints from './round_points/roundPoints';
import Card from 'components/global_components/card/card';
import Button from 'components/global_components/button/button';

const PlayerStats = (props) => {
    const { t } = useTranslation();
    const playerStats = useRef(null)
    const [displayAllPoints, setDisplayAllPoints] = useState(false);

    useEffect(() => {
        if (props.isCurrent) {
            playerStats.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    })

    const toggleDisplayAllPoints = () => {
        setDisplayAllPoints(!displayAllPoints);
    };

    const getRoundPoints = () => {
        return props.player.allPoints.map((points, index) => (
            <RoundPoints round={index + 1} points={points} key={index} />
        ));
    };

    const getUserIcon = () => {
        const player = props.player;
        if (player.admin) {
            return (
                <span className={styles.badge}>
                    <FontAwesomeIcon icon={faCog} />
                </span>
            );
        } else if (!player.admin && !player.uid) {
            return (
                <div className={styles.badge}>
                    <span className="fa-layers fa-fw">
                        <FontAwesomeIcon icon={faMobileAlt} />
                        <FontAwesomeIcon icon={faSlash} />
                    </span>
                </div>
            );
        }
    }

    const allPointsStyle = displayAllPoints ? props.player.allPoints.length * 24 + 50 : 0;
    const currentClass = props.isCurrent ? styles.current : '';

    return (
        <Card className={`${styles.playerStats} ${currentClass}`} ref={playerStats}>
            <div className={styles.wrapper}>
                <div className={styles.profileImage}>
                    {props.player.profileImage ? <img src={props.player.profileImage}/> : <FontAwesomeIcon icon={faUser} />}
                    {getUserIcon()}
                </div>
                <div className={styles.player}>
                    <p className={styles.playerName}>
                        {props.player.playerName}
                    </p>
                    <div className={styles.points}>
                        <p>{t("Current score")} {props.player.currentScore}</p>
                        <Button onClick={toggleDisplayAllPoints}>{t("All points")}</Button>
                    </div>
                </div>
            </div>
            <div className={styles.allPoints} style={{ maxHeight: `${allPointsStyle}px` }}>
                <p>{t("Best score")}: {props.player.bestScore}</p>
                <ul>
                    {getRoundPoints()}
                </ul>
            </div>
        </Card>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.app.user,
    }
}

export default connect(mapStateToProps)(PlayerStats)