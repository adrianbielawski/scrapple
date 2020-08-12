import db from '../../firebaseConfig';
import { cloneDeep } from 'lodash';
//Redux Actions
import { setScreen } from './appActions';

export const subPoints = (gameId, players, points) => {
    return dispatch => {
        const updatedPlayers = cloneDeep(players);

        for (const player of updatedPlayers) {
            player.currentScore -= points[player.playerIndex] || 0;
        }

        db.collection('games').doc(gameId).update({
            players: updatedPlayers,
            pointsSubtracted: true
        }).then(() => {
            dispatch(setScreen(`Game/${gameId}/GameSummary`));
        });
    }
};