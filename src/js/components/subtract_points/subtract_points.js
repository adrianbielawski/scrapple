import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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
import { every } from 'lodash';

const SubtractPoints = (props) => {
    const { t } = useTranslation();
    const [points, setPoints] = useState({});

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
            props.subPoints(props.gameId, props.players, points);
        } else {
            props.setAlert('alert', 'Points value must be positive integer');
        }
    }

    const validateUserInputs = () => {
        return every(points, point => {
            const p = parseFloat(point);
            return Number.isInteger(p) && p >= 0;
        });
    };

    const getPlayers = () => {
        return props.players.map((player, index) => {
            const onChange = e => setPoints({
                ...points,
                [index]: e.target.value,
            });
            return <PlayerSubPoints playerName={player.playerName} key={index} onChange={onChange} />
        });
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
        subPoints: (gameId, players, points) => { dispatch(subPoints(gameId, players, points)) },
        getGameData: (gameId) => dispatch(getGameData(gameId)),
        setFetchingGameData: (fetching) => { dispatch(setFetchingGameData(fetching)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubtractPoints);