import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './gameMenu.scss';
//Custom Components
import Players from './players/players';
import Language from 'components/global_components/language/changeLanguage';
import TimeLimit from './timeLimit/timeLimit';
import AddPlayer from './addPlayer/addPlayer';
import Header from 'components/global_components/header/header';
import Card from 'components/global_components/card/card';
import AccountInfo from 'components/global_components/accountInfo/accountInfo';
import GameId from 'components/global_components/game_id/gameId';
import Button from 'components/global_components/button/button';
import SideMenu from 'components/global_components/side_menu/sideMenu';
//Redux Actions
import { setAlert } from 'actions/appActions';
import { startGame, changeLanguage } from 'actions/gameMenuActions';

const GameMenu = (props) => {
    const { t } = useTranslation();
    const { gameId } = useParams(null);

    const handleLanguageChange = (language) => {
        props.changeLanguage(gameId, language);
    }

    const handleSubmit = () => {
        const { valid, error } = validateSettings();
        if (!valid) {
            props.setAlert('alert', error);
            return;
        }
        props.startGame(gameId);
    }

    const validateSettings = () => {
        let error = null;
        if (props.players.length < 2) {
            error = 'Please add at least 2 players';
        }

        if(props.showTimePicker && props.timeLimit < 60) {
            error = "Minimum player's time limit is 1 min"
        }

        return {
            valid: error === null,
            error,
        };
    }

    return (
        <div className={styles.gameMenu}>
            <Header />
            <div className={styles.menu}>
                <div className={styles.topWrapper}>
                    <SideMenu />
                    <AccountInfo />
                </div>
                <GameId />
                <Card className={styles.card}>
                    <Language showName={true} vertical={true} onChange={handleLanguageChange} />
                </Card>
                <Card className={styles.card}>
                    <TimeLimit />
                </Card>
                <Card className={styles.card}>
                    <AddPlayer />
                    <Players />
                </Card>
                <Button onClick={handleSubmit} type="submit">
                    {t(props.playedAgainWithSettings ? 'Play again' : 'Play')}
                </Button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        players: state.gamePage.players,
        timeLimit: state.gamePage.gameData.timeLimit,
        showTimePicker: state.gameMenu.showTimePicker,
        playedAgainWithSettings: state.app.playedAgainWithSettings,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startGame: (gameId) => dispatch(startGame(gameId)),
        changeLanguage: (gameId, language) => dispatch(changeLanguage(gameId, language)),
        setAlert: (type, messageKey, messageValue, action, props) => dispatch(
            setAlert(type, messageKey, messageValue, action, props)
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);