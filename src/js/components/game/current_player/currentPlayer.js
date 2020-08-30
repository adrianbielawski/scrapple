import React from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import styles from './currentPlayer.scss';
//Custom Components
import Timer from './timer/timer';
import AddPointsForm from './add_points_form/addPointsForm';

const CurrentPlayer = (props) => {
    const playerName = props.players[props.currentPlayer].playerName;

    return (
        <div className={styles.currentPlayer}>
            <p>
                <Trans i18nKey="ItsTurnNow">
                    It is <span>{{ playerName }}</span>'s turn now
                </Trans>
            </p>
            {props.timer && <Timer />}
            <AddPointsForm />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        timer: state.timeLimit.timer,
        currentPlayer: state.game.currentPlayer,
        players: state.game.players,
    }
}

export default connect(mapStateToProps)(withTranslation()(CurrentPlayer));