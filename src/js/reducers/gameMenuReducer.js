const initialState = {
    showTimePicker: true,
    showConfirmation: false,
};

const gameMenuReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'GAME_PAGE/FETCH_GAME_DATA/SUCCESS':
            newState.showTimePicker = action.gameData.timeLimit ? true : false;
            return newState;

        case 'GAME_MENU/TIME_LIMIT_UPDATE/SUCCESS':
            newState.showTimePicker = action.timeLimit ? true : false;
            return newState;

        default:
            return state;
    }
}

export default gameMenuReducer;