import React from 'react';
import { connect } from 'react-redux';
import styles from './gamesTable.scss';
//Redux actions
import { fetchGameDetails, setShowGameDetails } from 'actions/sideMenuActions';

const SingleGame = (props) => {

    const handleGameIdClick = (e) => {
        const gameId = e.target.id;
        const gameDetailsPromise = props.fetchGameDetails(gameId);
        gameDetailsPromise.then(() => {
            props.setShowGameDetails(true);
        });
    }

    return (
        <tr>
            <td className={styles.gameId} onClick={handleGameIdClick} id={props.game.gameId}>{props.game.gameId}</td>
            <td className={styles.date}>{props.game.date}</td>
        </tr>
    );
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGameDetails: (gameId) => dispatch(fetchGameDetails(gameId)),
        setShowGameDetails: (showGameDetails) => dispatch(setShowGameDetails(showGameDetails)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleGame);