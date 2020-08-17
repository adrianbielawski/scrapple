import db from 'firebaseConfig';
import { cloneDeep } from 'lodash';

export const subPoints = (gameId, players, points, history) => {
    return () => {
        const updatedPlayers = cloneDeep(players);

        for (const player of updatedPlayers) {
            player.currentScore -= points[player.playerIndex] || 0;
        }

        db.collection('games').doc(gameId).update({
            players: updatedPlayers,
            pointsSubtracted: true
        }).then(() => {
            history.push(`/game/${gameId}/game_summary`);
        });
    }
};