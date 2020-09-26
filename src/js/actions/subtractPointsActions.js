import axiosInstance from 'axiosInstance';
import { setAlert } from 'actions/appActions';

export const subPoints = (gameId, points) => dispatch => {
    axiosInstance.put(`/games/${gameId}/subtract-points/`, {
        points,
    })
    .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong'));
    })
};