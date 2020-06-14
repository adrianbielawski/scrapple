import React from 'react';
import '../../../../styles/stats.scss';
//Components
import { CurrentPlayer } from './current-player';
import { AllPlayers } from './all-players';

export const Stats = (props) => {    
    const players = props.players;
    const currentPlayer = props.currentPlayer;
    return (
        <div className="stats">
            <CurrentPlayer
                timeOut={props.timeOut}
                timer={props.timer}
                time={props.time}
                endTime={props.endTime}
                addPoints={props.addPoints}
                player={players[currentPlayer]}
                key={players[currentPlayer].playerId} />
            <AllPlayers
                players={players}
                currentPlayer={currentPlayer}/>
        </div>
    );        
}