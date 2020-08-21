import { db } from 'firebaseConfig';
import languages from 'components/global_components/language/languages';
//Redux actions
import {setUserInfo} from 'actions/appActions';

export const setFetchingUserInfo = (fetchingUserInfo) => {
    return {
        type: 'SIDE_MENU/SET_FETCHING_USER_INFO',
        fetchingUserInfo,
    };
}

export const setShowGames = (showGames) => {
    return {
        type: 'SIDE_MENU/SET_SHOW_GAMES',
        showGames,
    };
}

export const setShowAccountInfo = (showAccountInfo) => {
    return {
        type: 'SIDE_MENU/SET_SHOW_ACCOUNT_INFO',
        showAccountInfo,
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

export const fetchUserInfo = (uid) => dispatch => {
    return db.collection('users').doc(uid).collection('allGames').doc('allGames').get()
        .then((response) => {
            let data = response.data();
            let allGames = data.allGames;
            let reversedAllGames = [];
            for (let i = 0; i < allGames.length; i++) {
                reversedAllGames.unshift(allGames[i]);
            }

            dispatch(setUserInfo(null, reversedAllGames));
        }).then(() => {
            dispatch(setFetchingUserInfo(false));
        }).catch(() => {

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
        ))
    }).catch((err) => {
        console.log(err)
    })
}