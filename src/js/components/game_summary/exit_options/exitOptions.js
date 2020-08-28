import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter } from "react-router";
import { useParams } from 'react-router-dom';
import styles from './exitOptions.scss';
//Custom Components
import Modal from 'components/global_components/modal/modal';
import Button from 'components/global_components/button/button';
//Redux Actions
import { exitGame, playAgain, playAgainSettings } from 'actions/appActions';

const ExitOptions = (props) => {
    const { t } = useTranslation();
    const { gameId } = useParams();

    const handlePlayAgain = () => {
        props.playAgain(gameId, props.admin, props.history);
    };

    const handlePlayAgainSettings = () => {
        props.playAgainSettings(gameId, props.admin, props.history);
    };

    const handleExitGame = () => {
        props.exitGame(props.user.uid, gameId, props.admin, props.history);
    }

    return (
        <Modal show={props.show}>
            <div className={styles.exitOptions}>
                <Button onClick={handlePlayAgain}>{t("Play again")}</Button>
                <Button onClick={handlePlayAgainSettings}>{t("Play again with new settings")}</Button>
                <Button onClick={handleExitGame}>{t("Exit")}</Button>
            </div>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.app.user,
        gameId: state.app.gameId,
        admin: state.app.admin,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        exitGame: (uid, gameId, admin, history) => { dispatch(exitGame(uid, gameId, admin, history)) },
        playAgain: (gameId, admin, history) => { dispatch(playAgain(gameId, admin, history)) },
        playAgainSettings: (gameId, admin, history) => { dispatch(playAgainSettings(gameId, admin, history)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ExitOptions));