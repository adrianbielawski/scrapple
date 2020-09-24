import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './playerStats.scss';
//Custom Components
import AllPoints from './all_points/allPoints';
import Card from 'components/global_components/card/card';
import Button from 'components/global_components/button/button';
import UserIcon from 'components/global_components/user_icon/userIcon';
//Redux actions
import { getAllPoints, allPointsClosed } from 'actions/gameActions';

const ANIMATION_DURATION = 200;

const PlayerStats = (props) => {
    const { t } = useTranslation();
    const playerStats = useRef(null)
    const [displayPoints, setDisplayPoints] = useState(false);
    const [closingPoints, setClosingPoints] = useState(false);

    useEffect(() => {
        if (props.isCurrent) {
            playerStats.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    })

    const toggleDisplayAllPoints = () => {
        if (displayPoints) {
            setClosingPoints(true);
            setTimeout(() => {
                props.allPointsClosed(props.player.id)
                setDisplayPoints(false);
            }, ANIMATION_DURATION);
        } else {
            setClosingPoints(false);
            setDisplayPoints(true);
        }
    };

    const cx = classNames.bind(styles);
    const playerStatsClass = cx({
        playerStats: true,
        current: props.isCurrent,
    });

    return (
        <Card className={playerStatsClass} ref={playerStats}>
            <div className={styles.wrapper}>
                <div className={styles.profileImage}>
                    {props.player.profileImage
                        ? <img src={props.player.profileImage}/>
                        : <FontAwesomeIcon icon={faUser} />
                    }
                    <UserIcon className={styles.badge} player={props.player} />
                </div>
                <div className={styles.player}>
                    <p className={styles.playerName}>
                        {props.player.user.username}
                    </p>
                    <div className={styles.points}>
                        <p>{t("Current score")} {props.player.score}</p>
                        <Button onClick={toggleDisplayAllPoints}>{t("All points")}</Button>
                    </div>
                </div>
            </div>
            {displayPoints && <AllPoints player={props.player} closing={closingPoints} />}
        </Card>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.app.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPoints: (gameId, playerId) => dispatch(getAllPoints(gameId, playerId)),
        allPointsClosed: (playerId) => dispatch(allPointsClosed(playerId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerStats)