import axiosInstance from 'axiosInstance';
//Redux Actions
import { setAlert } from 'actions/appActions';

export const startGame = (gameId) => dispatch => {    
  axiosInstance.put(`/games/${gameId}/start/`)
    .catch(() => {
      dispatch(setAlert('alert', 'Something went wrong'));
    });
}

const timeLimitUpdateSuccess = (gameId, timeLimit) => ({
  type: 'GAME_MENU/TIME_LIMIT_UPDATE/SUCCESS',
  gameId,
  timeLimit,
})

export const updateTimeLimit = (gameId, timeLimit) => dispatch => {
  axiosInstance.patch(`/games/${gameId}/`, { time_limit: timeLimit })
  .then(() => {
    dispatch(timeLimitUpdateSuccess(gameId, timeLimit));
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