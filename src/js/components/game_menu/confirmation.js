import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
//Custom Components
import Modal from 'components/global_components/modal/modal';
import LoadingSpinner from 'components/global_components/loadingSpinner';
import Button from 'components/global_components/button/button';
//Redux Actions
import { startAdminGame } from 'actions/gameMenuActions';

const Confirmation = (props) => {
    const { t } = useTranslation();

    let title = props.gameId ? 'Game created succesfully' : 'Creating new game';
    let message = 'Please wait';
    if (props.gameId) {
        message = 'Please wait for other players to join the game';
    }
    if (props.allPlayersJoined) {
        message = 'All players have joined the game, press start game to begin';
    }

    const handleStartAdminGame = () => {
        props.startAdminGame(props.gameId)
    }

    return (
        <Modal className="confirmation">
            <h2>{t(title)}</h2>
            {props.gameId ? <p className="game-id">{t("Game ID")}: {props.gameId}</p> : null}
            <p className="message">{t(message)}</p>
            {!props.allPlayersJoined ?
                <div>
                    <LoadingSpinner background={false} />
                    <p className="or">{t("or")}</p>
                    <Button onClick={handleStartAdminGame}>{t("Start anyway")}</Button>
                </div> :
                <Button onClick={handleStartAdminGame}>{t("Start game")}</Button>
            }
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        gameId: state.app.gameId,
        allPlayersJoined: state.gameMenu.allPlayersJoined,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startAdminGame: (gameId) => { dispatch(startAdminGame(gameId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);