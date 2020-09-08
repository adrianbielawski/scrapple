import React from 'react';
import { connect } from 'react-redux';
import styles from './players.scss';
//Custom Components
import Player from './player/player';

const Players = (props) => {
    const getPlayers = () => {
        return props.players.map((player, index) => {
            return <Player key={index} position={player.position} player={player} />
        });
    }

    return (
        <ul className={styles.players}>
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