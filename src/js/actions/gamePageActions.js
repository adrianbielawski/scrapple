import axiosInstance from 'axiosInstance';
import axios from 'axios';
//Serializers
import { gameDeserializer, playerDeserializer } from "serializers";
//Redux Actions
import { setAlert, clearAppStateOnExit } from 'actions/appActions';
import { setIsGameClosed } from 'actions/gameSummaryActions';

export const webSocketAuthenticated = (timestamp) => ({
    type: 'GAME_PAGE/WEB_SOCKET_AUTHENTICATED',
    timestamp,
})

const fetchGameDataStart = () => ({
    type: 'GAME_PAGE/FETCH_GAME_DATA/START',
})

const fetchGameDataSuccess = (gameData, players) => ({
    type: 'GAME_PAGE/FETCH_GAME_DATA/SUCCESS',
    gameData,
    players,
})

const fetchGameDataFailure = () => ({
    type: 'GAME_PAGE/FETCH_GAME_DATA/FAILURE',
})

const getGameData = (gameId) => {
    return axiosInstance.get(`/games/${gameId}/`)
}

const getPlayersData = (gameId) => {
    return axiosInstance.get('/players/', {
        params: {
            game_id: gameId,
        }
    })
}

const fetchGameData = (gameId) => dispatch => {
    dispatch(fetchGameDataStart());

    axios.all([getGameData(gameId), getPlayersData(gameId)])
        .then(axios.spread((gameResponse, playersResponse) => {
            const gameData = gameDeserializer(gameResponse.data);
            const players = playersResponse.data.results.map(player => {
                return playerDeserializer(player);
            });

            dispatch(fetchGameDataSuccess(gameData, players));
        }))
        .catch(() => {
            dispatch(fetchGameDataFailure());
            dispatch(setAlert('alert', 'Something went wrong'));
        });
}

export const playersChanged = (players) => ({
    type: 'GAME_PAGE/PLAYERS_CHANGED',
    players,
})

export const gameChanged = (gameData) => ({
    type: 'GAME_PAGE/GAME_CHANGED',
    gameData,
})

export const joinGame = (gameId, history) => dispatch => {
    axiosInstance.put(`/games/${gameId}/join/`)
    .then(() => {
        dispatch(fetchGameData(gameId))
    })
    .catch((error) => {
        history.push('/main_menu');
    });
}

export const joinNewGame = (data, history) => () => {
    history.push(`/game/${data.id}`);
}

export const gameClosed = (admin, history) => dispatch => {
    if (admin) {
        history.push(`/main_menu`);
        dispatch(clearAppStateOnExit());
    } else {
        dispatch(setIsGameClosed())
    }
}