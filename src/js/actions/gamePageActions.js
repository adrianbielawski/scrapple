import axiosInstance from 'axiosInstance';
import axios from 'axios';
import i18n from 'i18next';
//Serializers
import { gameDeserializer, playerDeserializer } from "serializers";
//Redux Actions
import { setAlert } from 'actions/appActions';
import { changeLanguage } from 'actions/appActions';

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

export const fetchGameData = (gameId) => dispatch => {
    dispatch(fetchGameDataStart());

    axios.all([getGameData(gameId), getPlayersData(gameId)])
        .then(axios.spread((gameResponse, playersResponse) => {
            const gameData = gameDeserializer(gameResponse.data);
            const players = playersResponse.data.results.map(player => {
                return playerDeserializer(player);
            });

            if (i18n.language !== gameData.language) {
                dispatch(changeLanguage(gameData.language));
            }

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