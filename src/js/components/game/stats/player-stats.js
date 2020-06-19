import React, { useState } from 'react';
import { Trans } from 'react-i18next';
//Components
import { RoundPoints } from './round-points';
import Card from '../../global_components/card';

export const PlayerStats = (props) => {
    const [displayAllPoints, setDisplayAllPoints] = useState(false)

    const toggleDisplayAllPoints = () => {
        setDisplayAllPoints(!displayAllPoints);
    }

    const getRoundPoints = () => {
        const allPoints = [ ...props.player.allPoints ]
        const roundPoints = allPoints.map((points, index) => {
            return (
                <RoundPoints round={index + 1} points={points} key={index}/>
            )
        });
        return roundPoints
    }
    
    const allPointsStyle = displayAllPoints ? props.player.allPoints.length * 24 + 50 : 0;

    return (
        <Card className={`player-stats ${props.className}`}>
            <div className="player-name"><span>{props.player.playerName}</span></div>
            <div className="wraper">
                <div>{<Trans>Current score</Trans>} {props.player.currentScore}</div>
                <button onClick={toggleDisplayAllPoints}>{<Trans>All points</Trans>}</button>
            </div>
            <div className="all-points" style={{maxHeight: `${allPointsStyle}px`}}>
                <p>{<Trans>Best score</Trans>}: {props.player.bestScore}</p>
                <ul>
                    {getRoundPoints()}
                </ul>
            </div>
        </Card>
    );
}