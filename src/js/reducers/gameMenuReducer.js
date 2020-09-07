const initialState = {
    fetchingGameData: true,
    players: {
        initialListSpace: null,
        listSpace: null,
        grabbedElement: null,
        isTransitionEnabled: false,
        touches: 0
    },
    showTimePicker: true,
    timeLimit: 300,
    showConfirmation: false,
};

const gameMenuReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'GAME_MENU/TIME_PICKER_ON':
            newState.showTimePicker = true;
            return newState;

        case 'GAME_MENU/TIME_PICKER_OFF':
            newState.showTimePicker = false;
            return newState;

        case 'GAME_MENU/TIME_LIMIT_UPDATE/SUCCESS':
            newState.timeLimit = action.timeLimit;
            return newState;

        case 'GAME_MENU/FETCH_GAME_DATA/START':
            newState.fetchingGameData = true;
            return newState;

        case 'GAME_MENU/FETCH_GAME_DATA/SUCCESS':
            newState.timeLimit = action.game.timeLimit;
            newState.fetchingGameData = false;
            return newState;

        case 'GAME_MENU/SET_LIST_SPACE':
            newState.players.listSpace = action.listSpace;
            return newState;

        case 'GAME_MENU/SET_INITIAL_LIST_SPACE':
            newState.players.initialListSpace = action.initialListSpace;
            return newState;

        case 'GAME_MENU/SET_GRABBED_ELEMENT':
            newState.players.grabbedElement = action.grabbedElement;
            return newState;

        case 'GAME_MENU/SET_IS_TRANSITION_ENABLED':
            newState.players.isTransitionEnabled = action.isTransitionEnabled;
            return newState;

        case 'GAME_MENU/SET_TOUCHES':
            newState.players.touches = action.touches;
            return newState;

        default:
            return state;
    }
}

export default gameMenuReducer;