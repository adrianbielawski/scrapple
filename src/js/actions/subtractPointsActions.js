import db from '../../firebase';
//Redux Actions
import { setScreen } from './appActions';

export const subPoints = (gameId, playerss) => {
    return dispatch => {
        const players = [ ...playerss ];
        players.map((player, index) => {
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