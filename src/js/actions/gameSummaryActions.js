import db from '../../firebase';
//Redux Actions
import { playAgain, playAgainSettings } from './appActions';

export const subscribeExitOption = (gameId, exitOption) => {
    return dispatch => {
        return db.collection('games').doc(gameId).onSnapshot(doc => {
            const data = doc.data();
            if(data.exitOption !== exitOption) {
                dispatch(setExitOption(data.exitOption));
                if (data.exitOption === 'exitGame') {
                    return;
                } else if(data.exitOption === 'playAgain') {
                    dispatch(playAgain(gameId));
                };
            }
            if(data.joinedPlayers.length > 0 && data.exitOption === 'playAgainWithSettings') {
                dispatch(playAgainSettings(gameId));
            }
        });
    };
}

export const setShowExitOptions = (show) => {
    return {
        type: 'GAME_SUMMARY/SET_SHOW_EXIT_OPTIONS',
        show
    }
}

export const clearGameSummaryState = () => {
    return {
        type: 'GAME_SUMMARY/CLEAR_STATE',
    }
}

const setExitOption = (exitOption) => {
    return {
        type: 'GAME_SUMMARY/SET_EXIT_OPTION',
        exitOption
    }
}