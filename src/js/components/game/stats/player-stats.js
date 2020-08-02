import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cloneDeep } from 'lodash';
//Custom Components
import RoundPoints from './round-points';
import Card from '../../global_components/card';

const PlayerStats = (props) => {
    const { t } = useTranslation();
    const [displayAllPoints, setDisplayAllPoints] = useState(false);

    const toggleDisplayAllPoints = () => {
        setDisplayAllPoints(!displayAllPoints);
    };

    const getRoundPoints = () => {
        const allPoints = cloneDeep(props.player.allPoints);
        const roundPoints = allPoints.map((points, index) => {
            return (
                <RoundPoints round={index + 1} points={points} key={index}/>
            )
        });
        return roundPoints;
    };
    
    const allPointsStyle = displayAllPoints ? props.player.allPoints.length * 24 + 50 : 0;

    return (
        <Card className={`player-stats ${props.className}`}>
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