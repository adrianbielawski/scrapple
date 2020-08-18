import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import styles from './game.scss';
//Custom Components
import WordChecker from './word_checker/word-checker';
import Stats from './stats/stats';
import TwoLetterWords from './two_letter_words/twoLetterWords';
import FinishedGameCover from './finish_game_cover/finishedGameCover';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import AudioController from '../global_components/audioController/audioController';
import SideMenu from './side_menu/sideMenu';
import Button from 'components/global_components/button/button';
//Redux Actions
import { setGameId, setAlert } from 'actions/appActions';
import { setEndTime, checkEndTime, fetchGameData, setShowFinishedGameCover } from 'actions/gameActions';

class Game extends React.Component {
    componentDidMount() {
        const pathArray = window.location.pathname.split('/');
        const gameId = pathArray[2];
        this.props.setGameId(gameId);

        const promise = this.props.fetchGameData(gameId, this.props.user, this.props.history);
        promise.then((unsubscribe) => this.unsubscribe = unsubscribe);
    }

    componentWillUnmount() {
        this.props.setShowFinishedGameCover(false);
        this.unsubscribe();
    }

    handleGameFinish = (e) => {
        e.preventDefault();
        this.props.setAlert('confirm', 'Are you sure you want to finish this game?', null, 'game-finish-button');
    }

    render() {
        const gameClass = this.props.showWords ? styles['show-words'] : '';

        return (
            this.props.fetchingGameData ? <LoadingSpinner background={true} /> : (
                <div className={`${styles.game} ${gameClass}`}>
                    {this.props.showFinishedGameCover ? <FinishedGameCover /> : null}
                    <div className={styles.topWrapper}>
                        <SideMenu />
                        <WordChecker />
                        {this.props.admin ? <AudioController /> : null}
                    </div>
                    <TwoLetterWords />
                    <Stats />
                    {this.props.admin && <Button className={styles.gameFinishButton} onClick={this.handleGameFinish}>
                        {this.props.t("Finish the game")}
                    </Button>}
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => {
    return {
        gameId: state.app.gameId,
        user: state.app.user,
        admin: state.app.admin,
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Game));