import db from '../../firebase';
import * as firebase from 'firebase';
//Redux Actions
import { changeLanguage, setGameId, setAlert, setAdmin, setShowFinishedGameCover, setScreen } from '../actions/appActions';

export const createNewGame = (user, gameId, language, timer, time) => {
  return dispatch => {
    let game = {
      admin: user.uid,
      language,
      players: [{playerName: user.displayName, uid: user.uid}],
      currentPlayer: 0,
      gameStarted: false,
      joinedPlayers: [user.uid],
      //exitOption: playedAgainWithSettings ? 'playAgainWithSettings' : null
    }
    
    if(timer) {
      game = {
        ...game,
        gameStarted: false,
        timer,
        time,
        endTime: null,
      }
    }
    
    db.collection('games').doc(gameId).set(game)
      .then(() => {
        //sessionStorage.setItem('admin', JSON.stringify(true));
        //dispatch(setShowConfirmation(true));
        if(timer) {
          //dispatch(setAdmin(true));
        } else {
          // dispatch(setScreen(`Game/${gameId}`));
          // dispatch(setAdmin(true));
        }
      })
      .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
      });
  }
}

export const joinGame = (gameId, language) => {
  return dispatch => {
    db.collection('games').doc(gameId).get()
    .then((response) => {
      const data = response.data();
      
      if(language !== data.language) {
        dispatch(changeLanguage(data.language));
      };

      if(data.timer) {
        const random = Math.floor(Math.random() * 100000).toString();
        
        db.collection('games').doc(gameId).update({'joinedPlayers': firebase.firestore.FieldValue.arrayUnion(random)})
        .then(() => {
          dispatch(setGameId(gameId));
        })
        .catch(() => {
          dispatch(setAlert('alert', 'Something went wrong, please check game ID'));
        });
      } else {
        dispatch(startJoinedPlayerGame(gameId));
      }
    })
    .catch(() => {
      dispatch(setAlert('alert', 'Something went wrong, please check game ID'));
      return
    });

    const unsubscribeGameStart = db.collection('games').doc(gameId).onSnapshot(doc => {
      const data = doc.data();
      if(data.gameStarted == true) {
        dispatch(startJoinedPlayerGame(gameId));
      }
    });

    return unsubscribeGameStart;
  }
}

export const startJoinedPlayerGame = (gameId) => {
  return dispatch => {
    dispatch(setAdmin(false));
    dispatch(setShowFinishedGameCover(false));
    dispatch(setScreen(`Game/${gameId}`));
  }
}