import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './subtractPoints.scss';
//Custom Components
import PlayerSubPoints from './player_subtract_points/playerSubtractPoints';
import Header from 'components/global_components/header/header';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import Button from 'components/global_components/button/button';
//Redux Actions
import { getGameId, setAlert, getGameData, setFetchingGameData } from 'actions/appActions';
import { setPlayers } from 'actions/gameActions';
import { subPoints } from 'actions/subtractPointsActions';
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
            
            if (data.pointsSubtracted && data.gameFinished) {
                props.history.push(`/game/${gameId}/game_summary`);
            }
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validateUserInputs();

        if (isValid) {
            props.subPoints(props.gameId, props.players, points, props.history);
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
        <div className={styles.subtractPoints}>
            <Header />
            <h2>{t("Subtract points of unused letters")}</h2>
            {props.fetchingGameData ? <LoadingSpinner background={true} /> : (
                <div>
                    <ul className={styles.players}>
                        {getPlayers()}
                    </ul>
                    <Button onClick={handleSubmit}>{t("Continue")}</Button>
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
        subPoints: (gameId, players, points, history) => { dispatch(subPoints(gameId, players, points, history)) },
        getGameData: (gameId) => dispatch(getGameData(gameId)),
        setFetchingGameData: (fetching) => { dispatch(setFetchingGameData(fetching)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubtractPoints);