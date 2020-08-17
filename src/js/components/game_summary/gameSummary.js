import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './gameSummary.scss';
//Components
import PlayerSummary from './player_summary/playerSummary';
import Header from 'components/global_components/header/header';
import ExitOptions from './exit_options/exitOptions';
import WaitingCover from './waiting_cover/waitingCover';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
//Redux Actions
import { getGameId, getGameData, exitGame, setFetchingGameData, setAdmin } from 'actions/appActions';
import { setPlayers } from 'actions/gameActions';
import { subscribeExitOption, setShowExitOptions } from 'actions/gameSummaryActions';

const GameSummary = (props) => {
    const { t } = useTranslation();
    let unsubscribe = null;

    useEffect(() => {
        const gameId = props.gameId || props.getGameId();

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

    const getPlayersPositions = () => {
        let players = [...props.players];
        players.sort((a, b) => {
            return b.currentScore - a.currentScore;
        });

        let previousPlayerScore = '';
        let previousPlayerPlaceText = '';
        let previousPlace = '';
        let playersSummary = players.map((player, index) => {
            const placeTexts = ['1st', '2nd', '3rd', '4th'];
            let place = index + 1;
            let placeText = placeTexts[index];

            if (player.currentScore === previousPlayerScore) {
                placeText = previousPlayerPlaceText
                place = previousPlace
            };

            previousPlayerScore = player.currentScore;
            previousPlayerPlaceText = placeText;
            previousPlace = place;

            return <PlayerSummary player={player} placeText={placeText} place={place} key={index} />
        });
        return playersSummary;
    };

    const handleExit = () => {
        props.setShowExitOptions(true);
    };

    const exitGame = () => {
        props.exitGame(props.gameId, props.admin, props.history);
    };

    return (
        <div className={styles.gameSummary}>
            {props.exitOption === 'playAgainWithSettings' || (props.exitOption === 'playAgain' && props.timer) ?
                <WaitingCover exitOption={props.exitOption} />
                : null}
            {props.showExitOptions && props.admin && <ExitOptions />}
            <Header />
            <h2>{t("Game results")}</h2>
            {props.fetchingGameData ? <LoadingSpinner background={true} /> : (
                <div>
                    <ul className={styles.results}>
                        {getPlayersPositions()}
                    </ul>
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
        gameId: state.app.gameId,
        players: state.game.players,
        fetchingGameData: state.app.fetchingGameData,
        showExitOptions: state.gameSummary.showExitOptions,
        exitOption: state.gameSummary.exitOption,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGameId: () => dispatch(getGameId()),
        setAdmin: (admin) => dispatch(setAdmin(admin)),
        getGameData: (gameId) => dispatch(getGameData(gameId)),
        setPlayers: (players) => { dispatch(setPlayers(players)) },
        exitGame: (gameId, admin, history) => { dispatch(exitGame(gameId, admin, history)) },
        setFetchingGameData: (fetching) => { dispatch(setFetchingGameData(fetching)) },
        subscribeExitOption: (gameId, exitOption, history) => dispatch(subscribeExitOption(gameId, exitOption, history)),
        setShowExitOptions: (show) => dispatch(setShowExitOptions(show)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameSummary);