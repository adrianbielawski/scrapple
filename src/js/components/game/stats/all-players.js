import React from 'react';
import { connect } from 'react-redux';
// Custom Components
import PlayerStats from './player-stats';

const AllPlayers = (props) => {
    const players = [ ...props.players];
    const currentPlayer = props.currentPlayer;

    const playerStats = players.map((player, index) => {
        const isCurrent = currentPlayer === index;
        return (
            <PlayerStats player={player} key={index} isCurrent={isCurrent}/>
        );
    });

    return (
        <div className="all-players">
            {playerStats}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      currentPlayer: state.game.currentPlayer,
      players: state.game.players,
    }
}

export default connect(mapStateToProps)(AllPlayers);