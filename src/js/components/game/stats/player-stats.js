import React, { Component } from 'react';
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
                <RoundPoints language={this.props.language} round={index + 1} points={points} key={index}/>
            )
        });
        return roundPoints
    }

    getTexts = (lang) => {
        const texts = {
            currentScore: lang === 'en' ? 'Current score' : 'Suma punktów',
            showAll: lang === 'en' ? 'Show all points' : 'Punkty',
            best: lang === 'en' ? 'Best score' : 'Najelszy wynik',
        };
        return texts
    }

    render() {
        const player = this.props.player;
        const buttonDisplay = this.state.displayAllPoints ? 'active' : 'inactive';
        const roundPoints = this.getRoundPoints();
        const texts = this.getTexts(this.props.language);

        return (
            <div className={`player-stats ${this.props.className}`}>
                <div className="player-name"><span>{player.playerName}</span></div>
                <div className="wraper">
                    <div>{texts.currentScore} {player.currentScore}</div>
                    <button onClick={this.toggleDisplayAllPoints}>{texts.showAll}</button>
                </div>
                <div className={`all-points ${buttonDisplay}`}>
                    <p>{texts.best}: {player.bestScore}</p>
                    <ul>
                        {roundPoints}
                    </ul>
                </div>
            </div>
        );
    }
}