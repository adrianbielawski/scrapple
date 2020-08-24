import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styles from './gameSummary.scss';
//Components
import PlayersSummary from './playersSummary';
import Header from 'components/global_components/header/header';
import ExitOptions from './exit_options/exitOptions';
import WaitingCover from './waiting_cover/waitingCover';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
//Redux Actions
import { getGameData, exitGame, setFetchingGameData, setAdmin } from 'actions/appActions';
import { setPlayers } from 'actions/gameActions';
import { subscribeExitOption, setShowExitOptions } from 'actions/gameSummaryActions';

const GameSummary = (props) => {
    const { gameId } = useParams();
    const { t } = useTranslation();
    let unsubscribe = null;

    useEffect(() => {
        const promise = props.getGameData(gameId);
        promise.then(data => {
            props.setPlayers(data.players);
            props.setFetchingGameData(false);
            props.setAdmin(data.admin === props.user.uid);
        });

        unsubscribe = !props.admin ? props.subscribeExitOption(gameId, props.exitOption, props.history) : null;

        return () => {
            if (unsubscribe !== null) {
                unsubscribe();
            }
        };
    }, []);

    const handleExit = () => {
        props.setShowExitOptions(true);
    };

    const exitGame = () => {
        props.exitGame(props.user.uid, gameId, props.admin, props.history);
    };

    return (
        <div className={styles.gameSummary}>
            {props.exitOption === 'playAgainWithSettings' || (props.exitOption === 'playAgain' && props.timer) ?
                <WaitingCover show={true} exitOption={props.exitOption} />
                : null}
            {props.admin && <ExitOptions show={props.showExitOptions} />}
            <Header />
            <h2>{t("Game results")}</h2>
            {props.fetchingGameData ? <LoadingSpinner background={true} /> : (
                <div>
                    <PlayersSummary players={props.players} />
                    {props.admin ? <button onClick={handleExit}>{t("Exit")}</button> : null}
                    {!props.admin && props.exitOption === 'exitGame' ? <button onClick={exitGame}>{t("Exit")}</button> : null}
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.app.user,
        admin: state.app.admin,
        players: state.game.players,
        fetchingGameData: state.app.fetchingGameData,
        showExitOptions: state.gameSummary.showExitOptions,
        exitOption: state.gameSummary.exitOption,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAdmin: (admin) => dispatch(setAdmin(admin)),
        getGameData: (gameId) => dispatch(getGameData(gameId)),
        setPlayers: (players) => { dispatch(setPlayers(players)) },
        exitGame: (uid, gameId, admin, history) => { dispatch(exitGame(uid, gameId, admin, history)) },
        setFetchingGameData: (fetching) => { dispatch(setFetchingGameData(fetching)) },
        subscribeExitOption: (gameId, exitOption, history) => dispatch(subscribeExitOption(gameId, exitOption, history)),
        setShowExitOptions: (show) => dispatch(setShowExitOptions(show)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameSummary);