import { db } from 'firebaseConfig';
import languages from 'components/global_components/language/languages';
//Redux actions
import {setUserInfo} from 'actions/appActions';

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

export const setShowMyAccount = (showMyAccount) => {
    return {
        type: 'SIDE_MENU/SET_SHOW_MY_ACCOUNT',
        showMyAccount,
    };
}

export const setShowAccountSettings = (showAccountSettings) => {
    return {
        type: 'SIDE_MENU/SET_SHOW_ACCOUNT_SETTINGS',
        showAccountSettings,
    };
}

export const setShowChangeNameModal = (showChangeNameModal) => {
    return {
        type: 'SIDE_MENU/SET_SHOW_CHANGE_NAME_MODAL',
        showChangeNameModal,
    };
}

export const setShowChangePasswordModal = (showChangePasswordModal) => {
    return {
        type: 'SIDE_MENU/SET_SHOW_CHANGE_PASSWORD_MODAL',
        showChangePasswordModal,
    };
}

export const setShowChangeProfileImageModal = (showChangeProfileImageModal) => {
    return {
        type: 'SIDE_MENU/SET_SHOW_CHANGE_PROFILE_IMAGE_MODAL',
        showChangeProfileImageModal,
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
        })
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
    })
}