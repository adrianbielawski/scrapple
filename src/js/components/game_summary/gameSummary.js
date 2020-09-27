import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import styles from './gameSummary.scss';
//Components
import PlayersSummary from './playersSummary';
import Header from 'components/global_components/header/header';
import ExitOptions from './exit_options/exitOptions';
import Button from 'components/global_components/button/button';
//Redux Actions
import { openExitOptions, exitGame } from 'actions/gameSummaryActions';

const GameSummary = (props) => {
    const { gameId } = useParams();
    const history = useHistory();
    const { t } = useTranslation();
    const admin = props.user.id === props.gameData.createdBy;

    const handleExit = () => {
        props.openExitOptions()
    };

    const exitGame = () => {
        props.exitGame(admin, gameId, history);
    };

    return (
        <div className={styles.gameSummary}>
            {admin && <ExitOptions show={props.showExitOptions} />}
            <Header />
            <h2>{t("Game results")}</h2>
            <div>
                <PlayersSummary players={props.players} />
                {admin ? <Button onClick={handleExit}>{t("Exit")}</Button> : null}
                {!admin && props.isGameClosed ? <Button onClick={exitGame}>{t("Exit")}</Button> : null}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.app.user,
        players: state.gamePage.players,
        gameData: state.gamePage.gameData,
        showExitOptions: state.gameSummary.showExitOptions,
        exitOption: state.gameSummary.exitOption,
        isGameClosed: state.gameSummary.isGameClosed,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        exitGame: (admin, gameId, history) => { dispatch(exitGame(admin, gameId, history)) },
        openExitOptions: () => { dispatch(openExitOptions()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameSummary);