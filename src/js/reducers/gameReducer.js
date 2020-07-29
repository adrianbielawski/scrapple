const game = {
    fetching: true,
    showWords: false,
    isAudioEnabled: false,
    currentPlayer: 0,
    endTime: null,
    players: null,
    timeLeft: null,
};
  
const gameReducer = (state = game, action) => {
    let newState = { ...state };
    switch(action.type) {                
        case 'GAME/SET_FETCHING':
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
        
        default:
            return state;
    }
}
  
export default gameReducer;