import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';
import '../../../styles/game-summary.scss';
//Custom Components
import PlayerSubPoints from '../subtract_points/player-subtract-points';
import Header from '../global_components/header';
import LoadingSpinner from '../global_components/loadingSpinner';
//Redux Actions
import { getGameId, setAlert, getGameData, setFetchingGameData } from '../../actions/appActions';
import { setPlayers } from '../../actions/gameActions';
import { subPoints } from '../../actions/subtractPointsActions';

const SubtractPoints = (props) => {
    const { t } = useTranslation();    

    useEffect(() => {
        const gameId = props.gameId || props.getGameId();

        const promise = props.getGameData(gameId);
        promise.then(data => {
            props.setPlayers(data.players);
            props.setFetchingGameData(false);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateUserInputs();

        if (isValid) {
            props.subPoints(props.gameId, props.players);
        } else {
            props.setAlert('alert', 'Points value must be positive integer');
        }
    }

    const validateUserInputs = () => {
        for (let i = 0; i < props.players.length; i++) {
            const inputVal = document.getElementById(`sub-points${i}`).value;
            inputVal = parseFloat(inputVal);
            if(!inputVal) {
                inputVal = 0
            }
            if (inputVal < 0 || !Number.isInteger(inputVal)) {
                return false
            };
        };
        return true;
    };

    const getPlayers = () => {
        const players = cloneDeep(props.players);
        let playersContent = players.map((player, index) => {
            return <PlayerSubPoints playerName={player.playerName} key={index} index={index}/>
        });
        return playersContent;
    };

    return (
        <div>
            {props.fetchingGameData ? <LoadingSpinner /> : (
                <div className="game-summary">
                    <Header />
                    <h2>{t("Subtract points of unused letters")}</h2>
                    <ul className="results">
                        {getPlayers()}
                    </ul>
                    <button onClick={handleSubmit}>{t("Continue")}</button>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        gameId: state.app.gameId,
        players: state.game.players,
        fetchingGameData: state.app.fetchingGameData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGameId: () => dispatch(getGameId()),
        setPlayers: (players) => { dispatch(setPlayers(players)) },
        setAlert: (type, messageKey, messageValue, action, props) => { dispatch(setAlert(type, messageKey, messageValue, action, props)) },
        subPoints: (gameId, players) => { dispatch(subPoints(gameId, players)) },
        getGameData: (gameId) => dispatch(getGameData(gameId)),
        setFetchingGameData: (fetching) => { dispatch(setFetchingGameData(fetching)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubtractPoints);