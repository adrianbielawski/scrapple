import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../../styles/game-summary.scss';
//Components
import PlayerSummary from './player-summary';
import Header from '../global_components/header';
import ExitOptions from './exit-options';
import WaitingCover from './waiting-cover';
import LoadingSpinner from '../global_components/loadingSpinner';
//Redux Actions
import { getGameId, getGameData, exitGame, playAgain, playAgainSettings, setFetchingGameData, setAdmin } from '../../actions/appActions';
import { setPlayers } from '../../actions/gameActions';
import { subscribeExitOption, setShowExitOptions } from '../../actions/gameSummaryActions';

const GameSummary = (props) => {
    const { t } = useTranslation();
  
    useEffect(() => {
        if (props.user.uid) {
            const gameDataPromise = props.getGameData(props.gameId);
            gameDataPromise.then((data) => {
                const isAdmin = data.admin === props.user.uid;
                props.setAdmin(isAdmin);
            })
        }
    }, [props.user.uid]);

    useEffect(() => {
        const gameId =  props.gameId || props.getGameId();

        const promise = props.getGameData(gameId);
        promise.then(data => {
            props.setPlayers(data.players);
            props.setFetchingGameData(false);
        });

        const unsubscribe = props.subscribeExitOption(gameId, props.exitOption);

        return unsubscribe;
    }, []);

    const getPlayersPositions = () => {
        let players = [ ...props.players];
        players.sort((a, b) => {
            return b.currentScore - a.currentScore
        });

        let previousPlayerScore = '';
        let previousPlayerPlaceText = '';
        let previousPlace = '';
        let playersSummary = players.map((player, index) => {
            const placeTexts = ['1st', '2nd', '3rd', '4th'];
            let place = index + 1 ;
            let placeText = placeTexts[index];

            if(player.currentScore === previousPlayerScore) {
                placeText = previousPlayerPlaceText
                place = previousPlace
            };

            previousPlayerScore = player.currentScore;
            previousPlayerPlaceText = placeText;
            previousPlace = place;

            return <PlayerSummary player={player} placeText={placeText} place={place} key={index}/>
        });
        return playersSummary
    };

    const handleExit = () => {
        props.setShowExitOptions(true)
    };

    const exitGame = () => {
        props.exitGame(props.gameId, props.admin)
    };

    return (
        <div className="game-summary">
            {props.exitOption === 'playAgainWithSettings' || (props.exitOption === 'playAgain' && props.timer) ?
                <WaitingCover exitOption={props.exitOption} />
            : null}
            {props.showExitOptions && <ExitOptions />}
            <Header />
            <h2>{t("Game results")}</h2>
            {props.fetchingGameData ? <LoadingSpinner background={true} /> : (
                <div>
                    <ul className="results">
                        {getPlayersPositions()}
                    </ul>
                    {props.admin ? <button onClick={handleExit}>{t("Exit")}</button> : null}
                    {props.exitOption === 'exitGame' ? <button onClick={exitGame}>{t("Exit")}</button> : null}                    
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
        exitGame: (gameId, admin) => { dispatch(exitGame(gameId, admin)) },
        playAgain: (gameId) => { dispatch(playAgain(gameId)) },
        playAgainSettings: (gameId) => { dispatch(playAgainSettings(gameId)) },
        setFetchingGameData: (fetching) => { dispatch(setFetchingGameData(fetching)) },
        subscribeExitOption: (gameId, exitOption) => dispatch(subscribeExitOption(gameId, exitOption)),
        setShowExitOptions: (show) => dispatch(setShowExitOptions(show)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameSummary);