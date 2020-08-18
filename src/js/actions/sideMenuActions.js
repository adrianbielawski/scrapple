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

export const clearSideMenuState = () => {
    return {
        type: 'SIDE_MENU/CLEAR_SIDE_MENU_STATE'
    };
}