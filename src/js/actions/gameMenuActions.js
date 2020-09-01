import db from 'firebaseConfig';
import moment from 'moment';
//Redux Actions
import { setAlert, updateUserAllGames, updateUserCurrentGame } from 'actions/appActions';
import { setPlayers } from 'actions/gameActions';

export const setFetchingGameData = (fetching) => {
  return {
    type: 'GAME_MENU/SET_FETCHING_GAME_DATA',
    fetching
  }
}

export const addPlayer = (playerName, uid, admin) => {
  return {
    type: 'GAME_MENU/ADD_PLAYER',
    playerName,
    uid,
    admin
  }
}

export const removePlayer = (playerIndex) => {
  return {
    type: 'GAME_MENU/REMOVE_PLAYER',
    playerIndex
  }
}

export const reorderPlayers = (playerIndex, newIndex) => {
  return {
    type: 'GAME_MENU/REORDER_PLAYERS',
    playerIndex,
    newIndex
  }
}

export const updateGameMenuData = (gameId, language, timer, time, players) => () => {
  db.collection('games').doc(gameId).update({ language, timer, time, players });
}

export const setTimer = (timer) => {
  return {
    type: 'GAME_MENU/SET_TIMER',
    timer
  }
}

export const setTime = (time) => {
  return {
    type: 'GAME_MENU/SET_TIME',
    time
  }
}

export const setInitialListSpace = (initialListSpace) => {
  return {
    type: 'GAME_MENU/SET_INITIAL_LIST_SPACE',
    initialListSpace
  }
}

export const setListSpace = (listSpace) => {
  return {
    type: 'GAME_MENU/SET_LIST_SPACE',
    listSpace
  }
}

export const setGrabbedElement = (grabbedElement) => {
  return {
    type: 'GAME_MENU/SET_GRABBED_ELEMENT',
    grabbedElement
  }
}

export const setIsTransitionEnabled = (isTransitionEnabled) => {
  return {
    type: 'GAME_MENU/SET_IS_TRANSITION_ENABLED',
    isTransitionEnabled
  }
}

export const setTouches = (touches) => {
  return {
    type: 'GAME_MENU/SET_TOUCHES',
    touches
  }
}

export const setShowConfirmation = (showConfirmation) => {
  return {
    type: 'GAME_MENU/SET_SHOW_CONFIRMATION',
    showConfirmation
  }
}

export const subscribeJoinedPlayers = (gameId) => dispatch => {
  return db.collection('games').doc(gameId).onSnapshot(doc => {
    const data = doc.data();
    dispatch(setPlayers(data.players));
  });
}

export const startAdminGame = (gameId, user, history) => {
  return dispatch => {
    const date = moment().format('DD.MM.YYYY');
    
    db.collection('games').doc(gameId).update({ gameStarted: true })
      .then(() => {
        dispatch(updateUserAllGames(user.uid, gameId, date));
      })
      .then(() => {
        dispatch(updateUserCurrentGame(user.uid, gameId));
        history.push(`/game/${gameId}`);
      })
      .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong'));
      });
  }
}

export const getCurrentGameFromDatabase = (uid) => {
  return dispatch => {
    return db.collection('users').doc(uid).collection('currentGame').doc('gameId').get()
      .then(response => response.data().id)
      .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong'));
      });
  }
}