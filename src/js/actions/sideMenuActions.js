import { db } from 'firebaseConfig';
import languages from 'components/global_components/language/languages';
//Redux actions
import { setUserInfo } from 'actions/appActions';

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

export const decreaseGamesToRender = () => {
    return {
        type: 'SIDE_MENU/DECREASE_GAMES_TO_RENDER'
    };
}

export const increaseGamesToRender = () => {
    return {
        type: 'SIDE_MENU/INCREASE_GAMES_TO_RENDER'
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

export const fetchGamesHistory = (uid) => dispatch => {
    return db.collection('users').doc(uid).collection('allGames').doc('allGames').get()
        .then((response) => {
            let data = response.data();
            let gamesHistory = data.allGames;
            let reversedGamesHistory = [];

            for (let i = 0; i < gamesHistory.length; i++) {
                reversedGamesHistory.unshift(gamesHistory[i]);
            }

            dispatch(setUserInfo(null, reversedGamesHistory));
            dispatch(setFetchingGamesHistory(false));
        }).catch((err) => {
            console.log(err)
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