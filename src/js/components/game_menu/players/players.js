import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
//Custom Components
import Player from './player';

const Players = (props) => {
    const getPlayers = () => {
        const propsPlayers = cloneDeep(props.playersNames);
        const players = propsPlayers.map((player, index) => {
            return <Player key={index} index={index} player={player} />
        })
        return players
    }

    return (
        <ul className="players">
            {getPlayers()}
        </ul>
    );
}

const mapStateToProps = (state) => {
    return {
        playersNames: state.playersNames,
    }
}

export default connect(mapStateToProps)(Players);