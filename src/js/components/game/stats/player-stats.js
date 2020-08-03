import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
//Custom Components
import RoundPoints from './round-points';
import Card from '../../global_components/card';

const PlayerStats = (props) => {
    const { t } = useTranslation();
    const playerStats = useRef(null)
    const [displayAllPoints, setDisplayAllPoints] = useState(false);

    useEffect(() => {
        if(props.isCurrent) {   
            playerStats.current.scrollIntoView({behavior: 'smooth'});
        }
    })

    const toggleDisplayAllPoints = () => {
        setDisplayAllPoints(!displayAllPoints);
    };

    const getRoundPoints = () => {
        return props.player.allPoints.map((points, index) =>  (
                <RoundPoints round={index + 1} points={points} key={index}/>
            )
        );
    };
    
    const allPointsStyle = displayAllPoints ? props.player.allPoints.length * 24 + 50 : 0;
    const currentClass = props.isCurrent ? 'current' : '';

    return (
        <Card className={`player-stats ${currentClass}`} ref={playerStats}>
            <div className="player-name"><span>{props.player.playerName}</span></div>
            <div className="wraper">
                <div>{t("Current score")} {props.player.currentScore}</div>
                <button onClick={toggleDisplayAllPoints}>{t("All points")}</button>
            </div>
            <div className="all-points" style={{maxHeight: `${allPointsStyle}px`}}>
                <p>{t("Best score")}: {props.player.bestScore}</p>
                <ul>
                    {getRoundPoints()}
                </ul>
            </div>
        </Card>
    );
}

export default PlayerStats;