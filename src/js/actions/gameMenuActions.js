import db from '../../firebase';
//Redux Actions
import { setScreen, setAlert } from '../actions/appActions';

export const setFetchingGameData = (fetching) => {
  return {
    type: 'GAME_MENU/SET_FETCHING_GAME_DATA',
    fetching
  }
}

export const addPlayer = (players, playerName, uid) => {
  return dispatch => {
    const newPlayers = [ ...players];
      newPlayers.push({
          playerName,
          uid,
          playerIndex: players.length,
          currentScore: 0,
          bestScore: 0,
          allPoints: [],
      });
      dispatch(updatePlayers(newPlayers));
  }
}

export const removePlayer = (players, playerIndex) => {
  return dispatch => {
    const newPlayers = players.filter((_, index) => {
        return playerIndex !== index;
    });
    dispatch(updatePlayers(newPlayers));
  }
}

export const reorderPlayers = (players, playerIndex, newIndex) => {
  return dispatch => {
    const newPlayers = [ ...players];
    newPlayers.splice(newIndex, 0, newPlayers.splice(playerIndex, 1)[0]);
    dispatch(updatePlayers(newPlayers));
  }
}

export const updatePlayers = (players) => {
    return {
      type: 'GAME_MENU/UPDATE_PLAYERS',
      players,
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

export const setAllPlayersJoined = (allPlayersJoined) => {
  return {
    type: 'GAME_MENU/SET_ALL_PLAYERS_JOINED',
    allPlayersJoined
  }
}

export const setShowConfirmation = (showConfirmation) => {
  return {
    type: 'GAME_MENU/SET_SHOW_CONFIRMATION',
    showConfirmation
  }
}

export const subscribeJoinedPlayers = (gameId, players) => dispatch => {
  return db.collection('games').doc(gameId).onSnapshot(doc => {
    const data = doc.data();
    if(data.joinedPlayers.length >= players.length) {
      dispatch(setAllPlayersJoined(true));
    };
  });
}

export const startAdminGame = (gameId) => {
  return dispatch => {
    db.collection('games').doc(gameId).update({gameStarted: true})
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