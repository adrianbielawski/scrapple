import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './game.scss';
//Custom Components
import WordChecker from './word_checker/wordChecker';
import CurrentPlayer from './current_player/currentPlayer';
import AllPlayers from './all_players/allPlayers';
import TwoLetterWords from './two_letter_words/twoLetterWords';
import FinishedGameCover from './finish_game_cover/finishedGameCover';
import AudioController from 'components/global_components/audioController/audioController';
import SideMenu from 'components/global_components/side_menu/sideMenu';
import Button from 'components/global_components/button/button';
//Redux Actions
import { setAlert } from 'actions/appActions';

const Game = (props) => {
    const { gameId } = useParams();
    const { t } = useTranslation();
    const admin = props.user.id === props.gameData.createdBy;

    const handleGameFinish = (e) => {
        e.preventDefault();
        props.setAlert('confirm', 'Are you sure you want to finish this game?', null, 'game-finish-button',
            {
                gameId: gameId,
                admin,
            }
        );
    }

    return (
        <div className={styles.game} style={{ height: props.screenHeight }}>
            <FinishedGameCover show={props.gameData.finishedAt} />
            <div className={styles.topWrapper}>
                <SideMenu />
                <WordChecker />
                {admin && props.gameData.timeLimit
                    ? <AudioController />
                    : null
                }
            </div>
            <TwoLetterWords />
            <CurrentPlayer />
            <AllPlayers />
            {admin &&
                <Button className={styles.gameFinishButton} onClick={handleGameFinish}>
                    {t("Finish the game")}
                </Button>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        screenHeight: state.app.screenHeight,
        user: state.app.user,
        gameData: state.gamePage.gameData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: (type, messageKey, messageValue, action, props) => dispatch(setAlert(
            type, messageKey, messageValue, action, props)
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);