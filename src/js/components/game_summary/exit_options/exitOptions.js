import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter } from "react-router";
//Custom Components
import Dropdown from 'components/global_components/dropdown/dropdown';
import Button from 'components/global_components/button/button';
//Redux Actions
import { exitGame, playAgain, playAgainSettings } from 'actions/appActions';

const ExitOptions = (props) => {
    const { t } = useTranslation();
    const handlePlayAgain = () => {
        props.playAgain(props.gameId, props.admin, props.history);
    };

    const handlePlayAgainSettings = () => {
        props.playAgainSettings(props.gameId, props.admin, props.history);
    };

    const handleExitGame = () => {
        props.exitGame(props.gameId, props.admin, props.history);
    }

    return (
        <Dropdown>
            <Button onClick={handlePlayAgain}>{t("Play again")}</Button>
            <Button onClick={handlePlayAgainSettings}>{t("Play again with new settings")}</Button>
            <Button onClick={handleExitGame}>{t("Exit")}</Button>
        </Dropdown>
    );
}

const mapStateToProps = (state) => {
    return {
        gameId: state.app.gameId,
        admin: state.app.admin,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        exitGame: (gameId, admin, history) => { dispatch(exitGame(gameId, admin, history)) },
        playAgain: (gameId, admin, history) => { dispatch(playAgain(gameId, admin, history)) },
        playAgainSettings: (gameId, admin, history) => { dispatch(playAgainSettings(gameId, admin, history)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ExitOptions));