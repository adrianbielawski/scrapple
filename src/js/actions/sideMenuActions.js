import { db } from 'firebaseConfig';
import languages from 'components/global_components/language/languages';
//Redux actions
import axios from 'axiosInstance';

export const setFetchingGamesHistory = (fetchingGamesHistory) => {
    return {
        type: 'SIDE_MENU/SET_FETCHING_GAMES_HISTORY',
        fetchingGamesHistory,
    };
}

export const setFetchingGameDetails = (fetchingGameDetails) => {
    return {
        type: 'SIDE_MENU/SET_FETCHING_GAME_DETAILS',
        fetchingGameDetails,
    };
}

export const setShowGamesHistory = (showGamesHistory) => {
    return {
        type: 'SIDE_MENU/SET_SHOW_GAMES_HISTORY',
        showGamesHistory,
    };
}

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
            page
        }
    })
    .then((response) => {
        dispatch(fetchGamesHistorySuccess(response.data));
    })
    .catch(() => {
        dispatch(fetchGamesHistoryFailure());
    });
}

export const fetchGameDetails = (gameId) => dispatch => {
    return db.collection('games').doc(gameId).get()
        .then((response) => {
            const data = response.data();

            const lang = languages[data.language].name;
            const time = data.time ? `${data.time.hours}:${data.time.minutes}:${data.time.seconds}` : null;

            dispatch(setGameDetails(
                {
                    language: lang,
                    players: data.players,
                    time: time
                }
            ));
            dispatch(setFetchingGameDetails(false));
        }).catch((err) => {
            console.log(err)
        });
}