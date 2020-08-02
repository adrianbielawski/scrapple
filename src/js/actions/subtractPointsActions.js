import db from '../../firebase';
import { cloneDeep } from 'lodash';
//Redux Actions
import { setScreen } from './appActions';

export const subPoints = (gameId, players) => {
    return dispatch => {
        const updatedPlayers = cloneDeep(players);
        updatedPlayers.map((player, index) => {
            const inputVal = document.getElementById(`sub-points${index}`).value;
            let newPlayer = player;
            newPlayer.currentScore -= inputVal;
            newPlayer.subtractedPoints = inputVal;
            return newPlayer;
        });
        db.collection('games').doc(gameId).update({
            players,
            pointsSubtracted: true
        });
        dispatch(setScreen(`Game/${gameId}/GameSummary`));
    }
};