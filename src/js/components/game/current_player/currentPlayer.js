import React from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import styles from './currentPlayer.scss';
//Custom Components
import Timer from './timer/timer';
import AddPointsForm from './add_points_form/addPointsForm';
//Redux Actions
import { addPoints } from 'actions/gameActions';

const CurrentPlayer = (props) => {
    const playerName = props.players[props.gameData.currentPlayer].user.username;

    const handleTimeOut = () => {
        props.addPoints(0, props.players[props.gameData.currentPlayer].id);
    }

    return (
        <div className={styles.currentPlayer}>
            <p>
                <Trans i18nKey="ItsTurnNow">
                    It is <span>{{ playerName }}</span>'s turn now
                </Trans>
            </p>
            {props.gameData.timeLimit && <Timer onTimeOut={handleTimeOut} />}
            <AddPointsForm />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        gameData: state.gamePage.gameData,
        players: state.gamePage.players,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPoints: (points, playerId) => dispatch(addPoints(points, playerId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CurrentPlayer));