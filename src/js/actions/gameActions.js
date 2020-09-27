import axiosInstance from 'axiosInstance';
//Redux Actions
import { setAlert } from 'actions/appActions';

const fetchAllPointsSuccess = (playerId, data) => ({
    type: 'GAME/FETCH_ALL_POINTS/SUCCESS',
    playerId,
    data,
})

export const getAllPoints = (page, {playerId}) => dispatch => {
    axiosInstance.get('/points/', {
        params: {
            player_id: playerId,
            page_size: 5,
            page,
        }
    })
    .then(response => {
        dispatch(fetchAllPointsSuccess(playerId, response.data));
    })
    .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong'));
    })
}

export const allPointsClosed = (playerId) => ({
    type: 'GAME/ALL_POINTS_CLOSED',
    playerId,
})

export const addPoints = (points, playerId) => () => {
    axiosInstance.post('/points/', {
        player_id: playerId,
        value: points,
    })
}

export const timerUpdated = (timeEnd, timeDiff) => ({
    type: 'GAME/TIMER_UPDATED',
    timeEnd,
    timeDiff,
})

export const timerPaused = (gameId) => dispatch => {
    axiosInstance.put(`/games/${gameId}/pause/`)
    .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong'));
    })
}

export const timerUnpaused = (gameId) => dispatch => {
    axiosInstance.put(`/games/${gameId}/unpause/`)
    .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong'));
    })
}

export const handleFinishGame = ({gameId}) => dispatch => {
    axiosInstance.put(`/games/${gameId}/finish/`)
    .catch(() => {
      dispatch(setAlert('alert', 'Something went wrong'));
    });
}

export const toggleShowWords = () => {
    return {
        type: 'GAME/TOGGLE_SHOW_WORDS',
    }
}

export const toggleAudio = () => {
    return {
        type: 'GAME/TOGGLE_AUDIO',
    }
}