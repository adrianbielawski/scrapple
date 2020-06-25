import React from 'react';
import '../../../../styles/stats.scss';
//Custom Components
import CurrentPlayer from './current-player';
import AllPlayers from './all-players';

const Stats = (props) => {    
    const players = props.players;
    const currentPlayer = props.currentPlayer;
    return (
        <div className="stats">
            <CurrentPlayer
                admin={props.admin}
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
export default Stats;