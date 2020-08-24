import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import styles from './game.scss';
//Custom Components
import WordChecker from './word_checker/word-checker';
import Stats from './stats/stats';
import TwoLetterWords from './two_letter_words/twoLetterWords';
import FinishedGameCover from './finish_game_cover/finishedGameCover';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import AudioController from 'components/global_components/audioController/audioController';
import SideMenu from 'components/global_components/side_menu/sideMenu';
import Button from 'components/global_components/button/button';
//Redux Actions
import { setGameId, setAlert } from 'actions/appActions';
import { setEndTime, checkEndTime, fetchGameData, setShowFinishedGameCover } from 'actions/gameActions';
import { clearSideMenuState } from 'actions/sideMenuActions';

const Game = (props) => {
    const { gameId } = useParams();
    let unsubscribe = null;

    useEffect(() => {
        props.setGameId(gameId);

        const promise = props.fetchGameData(gameId, props.user, props.history);
        promise.then((unsubscribe) => unsubscribe = unsubscribe);

        return () => {
            props.clearSideMenuState();
            props.setShowFinishedGameCover(false);
            if (unsubscribe !== null) {
                unsubscribe();
            }
        }
    }, [])

    const handleGameFinish = (e) => {
        e.preventDefault();
        props.setAlert('confirm', 'Are you sure you want to finish this game?', null, 'game-finish-button');
    }

    const gameClass = props.showWords ? styles['show-words'] : '';

    return (
        props.fetchingGameData ? <LoadingSpinner background={true} /> : (
            <div className={`${styles.game} ${gameClass}`}>
                <FinishedGameCover show={props.showFinishedGameCover} />
                <div className={styles.topWrapper}>
                    <SideMenu className={styles.sideMenu} />
                    <WordChecker />
                    {props.admin && props.timer ? <AudioController /> : null}
                </div>
                <TwoLetterWords />
                <Stats />
                {props.admin && <Button className={styles.gameFinishButton} onClick={handleGameFinish}>
                    {props.t("Finish the game")}
                </Button>}
            </div>
        )
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.app.user,
        admin: state.app.admin,
        timer: state.timeLimit.timer,
        showFinishedGameCover: state.game.showFinishedGameCover,
        showWords: state.game.showWords,
        fetchingGameData: state.game.fetchingGameData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setGameId: (gameId) => { dispatch(setGameId(gameId)) },
        setAlert: (type, messageKey, messageValue, action, props) => { dispatch(setAlert(type, messageKey, messageValue, action, props)) },
        checkEndTime: (data, gameId) => dispatch(checkEndTime(data, gameId)),
        setEndTime: (endTime) => { dispatch(setEndTime(endTime)) },
        fetchGameData: (gameId, user, history) => dispatch(fetchGameData(gameId, user, history)),
        setShowFinishedGameCover: (showFinishedGameCover) => dispatch(setShowFinishedGameCover(showFinishedGameCover)),
        clearSideMenuState: () => dispatch(clearSideMenuState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Game));