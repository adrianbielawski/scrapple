import React from 'react';
import '../../../../styles/stats.scss';
//Components
import { CurrentPlayer } from './current-player';
import { AllPlayers } from './all-players';

export const Stats = (props) => {
    const getTimeLeft = () => {
        const hrs = props.time.hours;
        const min = props.time.minutes;
        const sec = props.time.seconds;
        const timeLeft = hrs == '00' ? `${min}:${sec}` : `${hrs}:${min}:${sec}`;
        return timeLeft
    }
    
    const players = props.players;
    const currentPlayer = props.currentPlayer;
    const timeLeft = getTimeLeft();
    return (
        <div className="stats">
            <CurrentPlayer
                timeOut={props.timeOut}
                timer={props.timer}
                time={props.time}
                timeLeft={timeLeft}
                addPoints={props.addPoints}
                player={players[currentPlayer]}
                key={players[currentPlayer].playerId} />
            <AllPlayers
                players={players}
                currentPlayer={currentPlayer}/>
        </div>
    );        
}