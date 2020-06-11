import React, { Component } from 'react';
import { Trans } from 'react-i18next';
//Components
import { RoundPoints } from './round-points';

export class PlayerStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayAllPoints: false,
        }
    }

    toggleDisplayAllPoints = () => {
        this.setState({displayAllPoints: !this.state.displayAllPoints});
    }

    getRoundPoints = () => {
        let roundPoints = this.props.player.allPoints.map((points, index) => {
            return (
                <RoundPoints round={index + 1} points={points} key={index}/>
            )
        });
        return roundPoints
    }

    render() {
        const player = this.props.player;
        const allPointsDisplay = this.state.displayAllPoints ? 'active' : '';

        return (
            <div className={`player-stats ${this.props.className}`}>
                <div className="player-name"><span>{player.playerName}</span></div>
                <div className="wraper">
                    <div>{<Trans>Current score</Trans>} {player.currentScore}</div>
                    <button onClick={this.toggleDisplayAllPoints}>{<Trans>All points</Trans>}</button>
                </div>
                <div className={`all-points ${allPointsDisplay}`}>
                    <p>{<Trans>Best score</Trans>}: {player.bestScore}</p>
                    <ul>
                        {this.getRoundPoints()}
                    </ul>
                </div>
            </div>
        );
    }
}