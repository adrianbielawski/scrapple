import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
//Custom Components
import Dropdown from '../global_components/dropdown';
import LoadingSpinner from '../global_components/loadingSpinner';

const Confirmation = (props) => {
    const { t } = useTranslation();

    let title = props.gameId ? 'Game created succesfully' : 'Creating new game';
    let message = 'Please wait';
    if(props.gameId) {
        message = 'Please wait for other players to join the game';
    }
    if(props.allPlayersJoined) {
        message = 'All players has joined the game, press start game to begin';
    }
    return ( 
        <Dropdown className="confirmation">
            <h2>{t(title)}</h2>
            {props.gameId ? <p className="game-id">{t("Game ID")}: {props.gameId}</p> : null}
            <p className="message">{t(message)}</p>
            {!props.allPlayersJoined ? 
                <div>
                    <LoadingSpinner />
                    <p className="or">{t("or")}</p>
                    <button onClick={props.handleStartAdminGame}>{t("Start anyway")}</button>
                </div> :
                <button onClick={props.handleStartAdminGame}>{t("Start game")}</button>
            }
        </Dropdown>
    );
}

const mapStateToProps = (state) => {
    return {
        gameId: state.app.gameId,
    }
}

export default connect(mapStateToProps)(Confirmation);