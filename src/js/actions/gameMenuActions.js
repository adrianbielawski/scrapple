import db from '../../firebaseConfig';
//Redux Actions
import { setScreen, setAlert } from '../actions/appActions';
import { setPlayers } from '../actions/gameActions';

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

export const startAdminGame = (gameId) => {
  return dispatch => {
    db.collection('games').doc(gameId).update({ gameStarted: true })
      .then(() => {
        dispatch(setScreen(`Game/${gameId}`));
      })
      .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
      });
  }
}

export const getUserDataFromDatabase = (uid) => {
  return dispatch => {
    return db.collection('users').doc(uid).get()
      .then(response => response.data())
      .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
      });

  }
}