import { cloneDeep } from 'lodash';

const initialState = {
    fetchingGameData: true,
    showWords: false,
    isAudioEnabled: false,
    currentPlayer: 0,
    endTime: null,
    isTimerPaused: false,
    thisUserPaused: false,
    players: [],
    timeLeft: null,
    showMenu: false,
    showFinishedGameCover: false,
};

const gameReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'GAME_MENU/ADD_PLAYER':
            const newPlayers = [...newState.players];
            newPlayers.push({
                playerName: action.playerName,
                uid: action.uid,
                profileImage: null,
                admin: action.admin,
                playerIndex: newState.players.length,
                currentScore: 0,
                bestScore: 0,
                allPoints: [],
            });
            newState.players = newPlayers;
            return newState;

        case 'GAME_MENU/REMOVE_PLAYER':
            const players = newState.players.filter((_, index) => {
                return action.playerIndex !== index;
            });
            newState.players = players;
            return newState;

        case 'GAME_MENU/REORDER_PLAYERS':
            const reorderedPlayers = [...newState.players];
            reorderedPlayers.splice(action.newIndex, 0, reorderedPlayers.splice(action.playerIndex, 1)[0]);
            newState.players = reorderedPlayers;
            return newState;

        case 'GAME/SET_FETCHING_GAME_DATA':
            newState.fetchingGameData = action.fetchingGameData;
            return newState;

        case 'GAME/SHOW_FINISHED_GAME_COVER':
            newState.showFinishedGameCover = action.showFinishedGameCover;
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

        case 'GAME/SET_TIMER_PAUSED':
            newState.isTimerPaused = action.isTimerPaused;
            return newState;

        case 'GAME/SET_THIS_USER_PAUSED':
            newState.thisUserPaused = action.thisUserPaused;
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

        case 'APP/EXIT_GAME':
            newState = cloneDeep(initialState);
            return newState;

        default:
            return state;
    }
}

export default gameReducer;