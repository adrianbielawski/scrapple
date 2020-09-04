import React from 'react';
import { connect } from 'react-redux';
import styles from './gamesTable.scss';
//Redux actions
import { fetchGameDetails, setShowGameDetails } from 'actions/sideMenuActions';

const DATE_FORMAT = 'DD-MM-YYYY / H:mm';

const GameRow = (props) => {

    const handleGameIdClick = (e) => {
        //TO DO

        // const gameDetailsPromise = props.fetchGameDetails(gameId);
        // gameDetailsPromise.then(() => {
        // });
    }
    
    return (
        <tr>
            <td className={styles.gameId} onClick={handleGameIdClick}>{props.game.number}</td>
            <td className={styles.date}>{props.game.createdAt.format(DATE_FORMAT)}</td>
        </tr>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowGameDetails: (showGameDetails) => dispatch(setShowGameDetails(showGameDetails)),
    }
}

export default connect(null, mapDispatchToProps)(GameRow);