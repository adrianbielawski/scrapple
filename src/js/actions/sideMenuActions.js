import { db } from 'firebaseConfig';

export const setUserInfo = (userInfo) => {
    return {
        type: 'SIDE_MENU/SET_USER_INFO',
        userInfo,
    };
}

export const setShowAccountInfo = (showAccountInfo) => {
    return {
        type: 'SIDE_MENU/SET_SHOW_ACCOUNT_INFO',
        showAccountInfo,
    };
}

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

export const setShowAccountSettings = (showAccountSettings) => {
    return {
        type: 'SIDE_MENU/SET_SHOW_ACCOUNT_SETTINGS',
        showAccountSettings,
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

export const clearSideMenuState = () => {
    return {
        type: 'SIDE_MENU/CLEAR_SIDE_MENU_STATE'
    };
}

export const fetchUserInfo = (uid) => dispatch => {
    return db.collection('users').doc(uid).get()
        .then((response) => {
            let data = response.data();
            const allGames = data.allGames;
            let reversedAllGames = [];
            for (let i = 0; i < allGames.length; i++) {
                reversedAllGames.unshift(allGames[i]);
            }
            data.allGames = reversedAllGames;

            dispatch(setUserInfo(data));
        }).then(() => {
            dispatch(setFetchingUserInfo(false));
        }).catch(() => {

        })
}

export const fetchGameDetails = (gameId) => dispatch => {
    return db.collection('games').doc(gameId).get()
    .then((response) => {
        const data = response.data();

        dispatch(setGameDetails(
            {
                language: data.language,
                players: data.players,
                time: data.timer ? data.time : null
            }
        ))
    }).catch((err) => {
        console.log(err)
    })
}