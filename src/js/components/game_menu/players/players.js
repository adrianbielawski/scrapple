import React from 'react';
import { connect } from 'react-redux';
//Custom Components
import Player from './player';

const Players = (props) => {
    const getPlayers = () => {
        return props.players.map((player, index) => {
            return <Player key={index} index={index} player={player} />
        });
    }

    return (
        <ul className="players">
            {getPlayers()}
        </ul>
    );
}

const mapStateToProps = (state) => {
    return {
        players: state.game.players,
    }
}

export default connect(mapStateToProps)(Players);