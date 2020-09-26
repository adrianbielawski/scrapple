import React from 'react';
import { connect } from 'react-redux';
import styles from './gamesTable.scss';
//Redux actions
import { openGameDetails } from 'actions/sideMenuActions';

const DATE_FORMAT = 'DD-MM-YYYY / H:mm';

const GameRow = (props) => {
    const handleGameClick = () => props.openGameDetails(props.game)

    return (
        <tr>
            <td className={styles.gameId} onClick={handleGameClick}>
                {props.game.id}
            </td>
            <td className={styles.date}>
                {props.game.createdAt.format(DATE_FORMAT)}
            </td>
        </tr>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        openGameDetails: (game) => dispatch(openGameDetails(game)),
    }
}

export default connect(null, mapDispatchToProps)(GameRow);