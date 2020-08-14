import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
//Custom Components
import Dropdown from 'components/global_components/dropdown/dropdown';
import Button from 'components/global_components/button/button';
//Redux Actions
import { exitGame, playAgain, playAgainSettings } from 'actions/appActions';

const ExitOptions = (props) => {
    const { t } = useTranslation();
    const handlePlayAgain = () => {
        props.playAgain(props.gameId, props.admin);
    };

    const handlePlayAgainSettings = () => {
        props.playAgainSettings(props.gameId, props.admin);
    };

    const handleExitGame = () => {
        props.exitGame(props.gameId, props.admin);
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
    exitGame: (gameId, admin) => { dispatch(exitGame(gameId, admin)) },
    playAgain: (gameId, admin) => { dispatch(playAgain(gameId, admin)) },
    playAgainSettings: (gameId, admin) => { dispatch(playAgainSettings(gameId, admin)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExitOptions);