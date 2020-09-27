import axiosInstance from 'axiosInstance';
//Redux Actions
import { setAlert, clearAppStateOnExit } from 'actions/appActions'

export const openExitOptions = () => {
    return {
        type: 'GAME_SUMMARY/OPEN_EXIT_OPTIONS',
    }
}

export const createNewGameFromSource = (gameId, startImmediately, history) => dispatch => {
    axiosInstance.post('/games/', {
        source_game_id: gameId,
        start_immediately: startImmediately,
    })
        .then(response => {
            history.push(`/game/${response.data.id}`);
        })
        .catch(() => {
            dispatch(setAlert('alert', 'Something went wrong'));
        });
}

export const exitGame = (admin, gameId, history) => dispatch => {
    if (admin) {
        axiosInstance.put(`/games/${gameId}/exit/`)
        .catch(() => {
            dispatch(setAlert('alert', 'Something went wrong'));
        })
    } else {
        history.push(`/main_menu`);
        dispatch(clearAppStateOnExit());
    }
}

export const setIsGameClosed = () => ({
    type: 'GAME_SUMMARY/GAME_CLOSED',
})