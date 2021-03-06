import { cloneDeep } from 'lodash';
import moment from 'moment';
import { listDeserializer, pointsDataDeserializer } from 'serializers';

const initialState = {
    showWords: false,
    isAudioEnabled: false,
    timeLeft: null,
    showFinishedGameCover: false,
    allPointsData: {},
};

const gameReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'GAME/ALL_POINTS_CLOSED':
            const newPointsData = cloneDeep(newState.allPointsData);
            newPointsData[action.playerId] = null;
            newState.allPointsData = newPointsData;
            return newState;

        case 'GAME/FETCH_ALL_POINTS/SUCCESS':
            const data = listDeserializer(action.data, pointsDataDeserializer);
            
            const allPointsData = cloneDeep(newState.allPointsData);
            allPointsData[action.playerId] = cloneDeep(data);
            
            newState.allPointsData = allPointsData;
            newState.fetchingAllPoints = false;
            return newState;

        case 'GAME/TIMER_UPDATED':
            const now = moment().add(moment(action.timeDiff));
            let timeLeft = moment(action.timeEnd).diff(now, 'seconds', true);
            timeLeft = Math.ceil(Math.max(0, timeLeft));
            newState.timeLeft = timeLeft;
            return newState;

        case 'GAME/TOGGLE_SHOW_WORDS':
            newState.showWords = !newState.showWords;
            return newState;

        case 'GAME/TOGGLE_AUDIO':
            newState.isAudioEnabled = !newState.isAudioEnabled;
            return newState;

        case 'APP/CLEAR_APP_STATE':
        case 'SIDE_MENU/QUIT_GAME_SUCCESS':
        case 'APP/EXIT_GAME':
            newState = cloneDeep(initialState);
            return newState;

        default:
            return state;
    }
}

export default gameReducer;