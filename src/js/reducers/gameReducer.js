import { cloneDeep } from 'lodash';

const initialState = {
    fetching: true,
    showWords: false,
    isAudioEnabled: false,
    currentPlayer: 0,
    endTime: null,
    players: [
        {
            playerName: 'aaa',
            uid: 'sdfsdf234234sf23f',
            playerIndex: 0,
            currentScore: 0,
            bestScore: 0,
            allPoints: [],
        },
    ],
    timeLeft: null,
    showMenu: false,
};
  
const gameReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch(action.type) { 
        case 'GAME_MENU/UPDATE_PLAYERS':
            newState.players = action.players;
            return newState;

        case 'GAME/SET_FETCHING_GAME_DATA':
            newState.fetching = action.fetching;
            return newState;

        case 'GAME/TOGGLE_SHOW_WORDS':
            newState.showWords = !newState.showWords;
            return newState;
                
        case 'GAME/TOGGLE_AUDIO':
            newState.isAudioEnabled = !newState.isAudioEnabled;
            return newState;
                
        case 'GAME/SET_CURRENT_PLAYER':
            newState.currentPlayer = action.currentPlayer;
            return newState;
                
        case 'GAME/SET_END_TIME':
            newState.endTime = action.endTime;
            return newState;
                
        case 'GAME/SET_PLAYERS':
            newState.players = action.players;
            return newState;
                
        case 'GAME/SET_TIME_LEFT':
            newState.timeLeft = action.timeLeft;
            return newState;

        case 'GAME/TOGGLE_SHOW_MENU':
            newState.showMenu = !state.showMenu;
            return newState;

        case 'APP/CLEAR_APP_STATE':
            newState = cloneDeep(initialState);
            return newState;
        
        default:
            return state;
    }
}
  
export default gameReducer;