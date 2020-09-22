const initialState = {
    showConfirmation: false,
};

const mainMenuReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'MAIN_MENU/JOIN_GAME/SUCCESS':
            newState.showConfirmation = true;
            return newState;

        default:
            return state;
    }
}

export default mainMenuReducer;