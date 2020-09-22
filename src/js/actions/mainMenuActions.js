import axiosInstance from 'axiosInstance';
//Redux Actions
import { changeLanguage, setAlert } from 'actions/appActions';

export const createNewGame = (language, timeLimit, history) => dispatch => {
    axiosInstance.post('/games/', {language, time_limit: timeLimit})
        .then(response => {
            history.push(`/game_menu/${response.data.id}`);
        })
        .catch(() => {
            dispatch(setAlert('alert', 'Something went wrong'));
        });
}

const joinGameSuccess = () => ({
    type: 'MAIN_MENU/JOIN_GAME/SUCCESS',
})

const joinGameFailure = () => ({
    type: 'MAIN_MENU/JOIN_GAME/FAILURE',
})

export const joinGame = (gameId, language) => dispatch => {
    axiosInstance.put(`/games/${gameId}/join/`)
    .then((response) => {
        if (response.data.language !== language) {
            dispatch(changeLanguage(response.data.language));
        };        
        dispatch(joinGameSuccess());
    })
    .catch((error) => {
        dispatch(joinGameFailure());
        dispatch(setAlert('alert', Object.values(error.response.data)[0][0]));
    })

}