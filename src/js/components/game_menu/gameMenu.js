import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './gameMenu.scss';
//Custom Components
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
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
import { startAdminGame, fetchGameData } from 'actions/gameMenuActions';
import { useParams } from 'react-router-dom';

const GameMenu = (props) => {
    const { t } = useTranslation();
    const { gameId } = useParams(null);

    useEffect(() => {
        props.fetchGameData(gameId);
    }, []);

    const handleSubmit = () => {
        const { valid, error } = validateSettings();
        if (!valid) {
            props.setAlert('alert', error);
            return;
        }
        props.startAdminGame(props.gameId, props.history);
    }

    const validateSettings = () => {
        let error = null;
        if (props.players.length < 2) {
            error = 'Please add at least 2 players';
        }

        if(props.timePicker && timeLimit < 60) {
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
            {props.fetchingGameData 
                ? <LoadingSpinner background={true} />
                : (
                    <div className={styles.menu}>
                        <div className={styles.topWrapper}>
                            <SideMenu />
                            <AccountInfo />
                        </div>
                        <GameId />
                        <Card className={styles.card}>
                            <Language showName={true} vertical={true} />
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
                )
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        fetchingGameData: state.gameMenu.fetchingGameData,
        players: state.game.players,
        timeLimit: state.gameMenu.timeLimit,
        playedAgainWithSettings: state.app.playedAgainWithSettings,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startAdminGame: (gameId, history) => dispatch(startAdminGame(gameId, history)),
        fetchGameData: (gameId) => dispatch(fetchGameData(gameId)),
        setAlert: (type, messageKey, messageValue, action, props) => dispatch(
            setAlert(type, messageKey, messageValue, action, props)
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);