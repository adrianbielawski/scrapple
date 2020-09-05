import axios from 'axiosInstance';

export const toggleMyAccount = () => {
    return {
        type: 'SIDE_MENU/TOGGLE_MY_ACCOUNT',
    };
}

export const toggleAccountSettings = () => {
    return {
        type: 'SIDE_MENU/TOGGLE_ACCOUNT_SETTINGS',
    };
}

export const openNewNameModal = () => {
    return {
        type: 'SIDE_MENU/OPEN_NEW_NAME_MODAL',
    };
}

export const closeNewNameModal = () => {
    return {
        type: 'SIDE_MENU/CLOSE_NEW_NAME_MODAL',
    };
}

export const openNewPasswordModal = () => {
    return {
        type: 'SIDE_MENU/OPEN_NEW_PASSWORD_MODAL',
    };
}

export const closeNewPasswordModal = () => {
    return {
        type: 'SIDE_MENU/CLOSE_NEW_PASSWORD_MODAL',
    };
}

export const openProfileImageModal = () => {
    return {
        type: 'SIDE_MENU/OPEN_PROFILE_IMAGE_MODAL',
    };
}

export const closeProfileImageModal = () => {
    return {
        type: 'SIDE_MENU/CLOSE_PROFILE_IMAGE_MODAL',
    };
}

export const setGameDetails = (gameDetails) => {
    return {
        type: 'SIDE_MENU/SET_GAME_DETAILS',
        gameDetails
    };
}

export const setShowGameDetails = (showGameDetails) => {
    return {
        type: 'SIDE_MENU/SET_SHOW_GAME_DETAILS',
        showGameDetails
    };
}

export const clearSideMenuState = () => {
    return {
        type: 'SIDE_MENU/CLEAR_SIDE_MENU_STATE'
    };
}

export const openGamesHistory = () => ({
    type: 'SIDE_MENU/OPEN_GAMES_HISTORY',
})

export const closeGamesHistory = () => ({
    type: 'SIDE_MENU/CLOSE_GAMES_HISTORY',
})

const fetchGamesHistoryStart = () => ({
    type: 'SIDE_MENU/FETCH_GAMES_HISTORY/START',
})

const fetchGamesHistorySuccess = (data) => ({
    type: 'SIDE_MENU/FETCH_GAMES_HISTORY/SUCCESS',
    data,
})

const fetchGamesHistoryFailure = () => ({
    type: 'SIDE_MENU/FETCH_GAMES_HISTORY/FAILURE',
})

export const fetchGamesHistory = (page) => dispatch => {
    dispatch(fetchGamesHistoryStart());
    axios.get('/games/', {
        params: {
            page,
        }
    })
    .then((response) => {
        dispatch(fetchGamesHistorySuccess(response.data));
    })
    .catch(() => {
        dispatch(fetchGamesHistoryFailure());
    });
}

export const closeGameDetails = () => ({
    type: 'SIDE_MENU/CLOSE_GAME_DETAILS',
})

export const fetchGameDetailsStart = () => ({
    type: 'SIDE_MENU/FETCH_GAMES_DETAILS/START',
})

export const fetchGameDetailsSuccess = (data, game) => ({
    type: 'SIDE_MENU/FETCH_GAME_DETAILS/SUCCESS',
    data,
    game,
})

export const fetchGameDetailsFailure = () => ({
    type: 'SIDE_MENU/FETCH_GAME_DETAILS/FAILURE',
})

export const openGameDetails = (game) => dispatch => {
    dispatch(fetchGameDetailsStart());

    axios.get('/players/', {
        params: {
            game_id: game.id,
        }
    })
    .then((response) => {
        dispatch(fetchGameDetailsSuccess(response.data.results, game));
    })
    .catch(() => {
        dispatch(fetchGameDetailsFailure());
    });
}