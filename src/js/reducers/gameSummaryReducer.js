const initialState = {
    showExitOptions: false,
    isGameClosed: false,
};

const gameSummaryReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'GAME_SUMMARY/GAME_CLOSED':
            newState.isGameClosed = true;
            return newState;

        case 'GAME_SUMMARY/OPEN_EXIT_OPTIONS':
            newState.showExitOptions = true;
            return newState;

        case 'GAME_SUMMARY/OPEN_EXIT_OPTIONS':
            newState.showExitOptions = true;
            return newState;

        case 'APP/CLEAR_APP_STATE':
        case 'APP/EXIT_GAME':
            newState = { ...initialState };
            return newState;

        default:
            return state;
    }
}

export default gameSummaryReducer;