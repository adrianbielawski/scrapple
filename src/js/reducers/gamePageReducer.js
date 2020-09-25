import { cloneDeep } from 'lodash';
import moment from 'moment';
import { playerDeserializer, gameDeserializer } from 'serializers';

const initialState = {
    fetchingGameData: true,
    players: [],
    gameData: {
        id: null,
        language: 'en-GB',
        currentPlayer: null,
        timeLimit: 300,
        timeEnd: null,
        timePausedBy: null,
        createdBy: null,
        createdAt: null,
        startedAt: null,
        finishedAt: null,
        pointsSubtracted: false,
        timeDiff: null,
    },
};

const gamePageReducer = (state = initialState, action) => {
    let newState = cloneDeep(state);
    switch (action.type) {
        case 'GAME_PAGE/FETCH_GAME_DATA/START':
            newState.fetchingGameData = true;
            return newState;

        case 'GAME_PAGE/FETCH_GAME_DATA/SUCCESS':
            newState.players = cloneDeep(action.players);
            newState.gameData = cloneDeep(action.gameData);
            newState.gameData.timeLimit = action.gameData.timeLimit || initialState.gameData.timeLimit;
            newState.fetchingGameData = false;
            return newState;

        case 'GAME_PAGE/FETCH_GAME_DATA/FAILURE':
            newState.fetchingGameData = false;
            return newState;

        case 'GAME_MENU/TIME_LIMIT_UPDATE/SUCCESS':
            newState.gameData.timeLimit = action.timeLimit || initialState.gameData.timeLimit;
            return newState;

        case 'GAME_PAGE/PLAYERS_CHANGED':
            newState.players = action.players.map(playerDeserializer);
            return newState;

        case 'GAME_PAGE/GAME_CHANGED':
            newState.gameData = gameDeserializer(action.gameData);
            newState.gameData.timeDiff = moment(action.timestamp).diff(moment());
            return newState;

        case 'APP/EXIT_GAME':
        case 'APP/CLEAR_APP_STATE':
            newState = cloneDeep(initialState);
            return newState;

        default:
            return state;
    }
}

export default gamePageReducer;