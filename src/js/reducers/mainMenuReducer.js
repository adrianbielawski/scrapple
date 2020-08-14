const initialState = {
    showConfirmation: false,
};

const mainMenuReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'MAIN_MENU/SET_SHOW_CONFIRMATION':
            newState.showConfirmation = action.showConfirmation;
            return newState;

        default:
            return state;
    }
}

export default mainMenuReducer;