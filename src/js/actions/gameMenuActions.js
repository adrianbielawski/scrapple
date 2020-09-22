import axiosInstance from 'axiosInstance';
import axios from 'axios';
import i18n from 'i18next';
//Serializers
import { gameDeserializer, playerDeserializer } from "serializers";
//Redux Actions
import { setAlert } from 'actions/appActions';
import { changeLanguage } from 'actions/appActions';

export const startAdminGame = (gameId, history) => {
  return dispatch => {    
    axiosInstance.put(`/games/${gameId}/start`)
      .then(() => {
        history.push(`/game/${gameId}`);
      })
      .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong'));
      });
  }
}

const fetchGameDataStart = () => ({
  type: 'GAME_MENU/FETCH_GAME_DATA/START',
})

const fetchGameDataSuccess = (game, players) => ({
  type: 'GAME_MENU/FETCH_GAME_DATA/SUCCESS',
  game,
  players,
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
    const game = gameDeserializer(gameResponse.data);
    const players = playersResponse.data.results.map(player => {
      return playerDeserializer(player);
    });

    dispatch(fetchGameDataSuccess(game, players));
    
    if (i18n.language !== game.language) {
      dispatch(changeLanguage(game.language));
    }
  }))
  .catch(error => {
    dispatch(setAlert('alert', error.response.data));
  });
}

export const timePickerOn = () => ({
  type: 'GAME_MENU/TIME_PICKER_ON',
})

export const timePickerOff = () => ({
  type: 'GAME_MENU/TIME_PICKER_OFF',
})

const timeLimitUpdateSuccess = () => ({
  type: 'GAME_MENU/TIME_LIMIT_UPDATE/SUCCESS',
  timeLimit,
})

export const updateTimeLimit = (gameId, timeLimit) => dispatch => {
  axiosInstance.patch(`/games/${gameId}/`, { time_limit: timeLimit })
  .then(() => {
    dispatch(timeLimitUpdateSuccess(timeLimit));
  })
  .catch(error => {
    console.log(error.response.data)
  });
}

export const addPlayer = (playerName, gameId) => dispatch => {
  axiosInstance.post('/players/', { game_id: gameId, username: playerName })
  .catch(error => {
    console.log(error.response.data);
    dispatch(setAlert('alert', 'Something went wrong'));
  });
}

export const removePlayer = (playerId) => dispatch => {
  axiosInstance.delete(`/players/${playerId}/`)
  .catch(error => {
    console.log(error.response.data);
    dispatch(setAlert('alert', 'Something went wrong'));
  });
}

export const playerGrabbed = (position) => ({
    type: 'GAME_MENU/PLAYER_GRABBED',
    position,
})

export const playerMoved = (placeholder) => ({
  type: 'GAME_MENU/PLAYER_MOVED',
  placeholder,
})

const playesReordered = () => ({
    type: 'GAME_MENU/PLAYERS_REORDERED',
})

export const playerDropped = (position, id) => dispatch => {
  return axiosInstance.patch(`/players/${id}/`, { position })
  .then(() => {
    dispatch(playesReordered());
  })
  .catch(error => {
    console.log(error.response.data);
    dispatch(setAlert('alert', 'Something went wrong'));
  });
}

export const playerTouched = () => ({
    type: 'GAME_MENU/PLAYER_TOUCHED',
})

export const playerUntouched = () => ({
    type: 'GAME_MENU/PLAYER_UNTOUCHED',
})