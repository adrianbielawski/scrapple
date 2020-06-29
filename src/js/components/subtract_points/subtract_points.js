import React from 'react';
import { Trans } from 'react-i18next';
import db from '../../../firebase';
import '../../../styles/game-summary.scss';
//Custom Components
import PlayerSubPoints from '../subtract_points/player-subtract-points';
import Header from '../global_components/header';

const SubtractPoints = (props) => {
    const validateUserInputs = (e) => {
        for (let i = 0; i < props.players.length; i++) {
            const inputVal = document.getElementById(`sub-points${i}`).value;
            inputVal = parseFloat(inputVal);
            if(!inputVal) {
                inputVal = 0
            }
            if (inputVal < 0 || !Number.isInteger(inputVal)) {
                const messageKey = 'Points value must be positive integer';
                props.alert('alert', messageKey);
                return
            };
        };
        subPoints(e);
    };

    const subPoints = (e) => {
        e.preventDefault();
        const players = [ ...props.players ];
        players.map((player, index) => {
            const inputVal = document.getElementById(`sub-points${index}`).value;
            let newPlayer = player.currentScore -= inputVal;
            return newPlayer;
        });
        db.collection('games').doc(props.gameId).update({
          players: players,
          pointsSubtracted: true
        });
        props.renderGameSummary(players);
    };

    const getPlayers = () => {
        let players = [ ...props.players ];
        let playersContent = players.map((player, index) => {
            return <PlayerSubPoints playerName={player.playerName} key={index} index={index}/>
        });
        return playersContent;
    };

    return (
        <div className="game-summary">
            <Header />
            <h2><Trans>Subtract points of unused letters</Trans></h2>
            <ul className="results">
                {getPlayers()}
            </ul>
            <button onClick={validateUserInputs}><Trans>Continue</Trans></button>
        </div>
    );
}
export default SubtractPoints