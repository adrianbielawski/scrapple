import { cloneDeep } from 'lodash';

const initialState = {
    fetchingGameData: true,
    players: {
        placeholder: null,
        grabbedElement: null,
        isTransitionEnabled: false,
        touches: 0
    },
    showTimePicker: true,
    timeLimit: 300,
    showConfirmation: false,
};

const gameMenuReducer = (state = initialState, action) => {
    let newState = cloneDeep(state);
    switch (action.type) {

        case 'GAME_MENU/TIME_LIMIT_UPDATE/SUCCESS':
            newState.timeLimit =  action.timeLimit || initialState.timeLimit;
            newState.showTimePicker = action.timeLimit ? true : false;
            return newState;

        case 'GAME_MENU/FETCH_GAME_DATA/START':
            newState.fetchingGameData = true;
            return newState;

        case 'GAME_MENU/FETCH_GAME_DATA/SUCCESS':
            newState.timeLimit = action.game.timeLimit || initialState.timeLimit;
            if (action.game.timeLimit === null) {
                newState.showTimePicker = false;
            }
            newState.fetchingGameData = false;
            return newState;

        case 'GAME_MENU/PLAYER_GRABBED':
            newState.players.grabbedElement = action.position;
            newState.players.placeholder = action.position - 1;
            newState.players.touches += 1;
            return newState;

        case 'GAME_MENU/PLAYERS_REORDERED':
            newState.players.grabbedElement = null;
            newState.players.placeholder = null;
            newState.players.touches -= 1;
            newState.players.isTransitionEnabled = false;
            return newState;

        case 'GAME_MENU/PLAYER_MOVED':
            if (!newState.players.isTransitionEnabled) {
                newState.players.isTransitionEnabled = true;
            }
            
            newState.players.placeholder = action.placeholder;
            return newState;

        case 'GAME_MENU/PLAYER_TOUCHED':
            newState.players.touches += 1;
            return newState;

        case 'GAME_MENU/PLAYER_UNTOUCHED':
            newState.players.touches -= 1;
            return newState;

        default:
            return state;
    }
}

export default gameMenuReducer;