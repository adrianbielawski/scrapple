import React from 'react';
import { Trans } from 'react-i18next';
import '../../../styles/game-summary.scss';
//Components
import { PlayerSubPoints } from '../subtract_points/player-subtract-points';
import { Header } from '../global_components/header';

export const SubtractPoints = (props) => {
    const subPoints = (e) => {
        e.preventDefault();
        const players = [ ...props.players ];
        players.map((player, index) => {
            const inputVal = document.getElementById(`sub-points${index}`).value;
            let newPlayer = player.currentScore -= inputVal;
            return newPlayer
        });
        props.renderGameSummary(players)
    }

    const getPlayers = () => {
        let players = [ ...props.players ]
        let playersContent = players.map((player, index) => {
            return <PlayerSubPoints playerName={player.playerName} key={index} index={index}/>
        });
        return playersContent
    }

    return (
        <div className="game-summary">
            <Header />
            <h2><Trans>Subtract points of unused letters</Trans></h2>
            <ul className="results">
                {getPlayers()}
            </ul>
            <button onClick={subPoints} value="exit"><Trans>Continue</Trans></button>
        </div>
    );
}