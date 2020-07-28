import db from '../../firebase';
//Redux Actions
import { setScreen, setAdmin, setAlert } from '../actions/appActions';

export const addPlayer = (playerName) => {
  return {
    type: 'GAME_MENU/ADD_PLAYER',
    playerName
  }
}

export const removePlayer = (playerId) => {
  return {
    type: 'GAME_MENU/REMOVE_PLAYER',
    playerId
  }
}

export const reorderPlayers = (index, newIndex) => {
  return {
    type: 'GAME_MENU/REORDER_PLAYERS',
    index,
    newIndex
  }
}

export const toggleTimer = () => {
  return {
    type: 'GAME_MENU/TOGGLE_TIMER'
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

export const createNewGame = (players, gameId, language, playedAgainWithSettings, timer, time) => {
  return dispatch => {
    let game = {
      language,
      players,
      currentPlayer: 0,
      gameStarted: true,
      joinedPlayers: [1],
      exitOption: playedAgainWithSettings ? 'playAgainWithSettings' : null
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
        sessionStorage.setItem('admin', JSON.stringify(true));
        dispatch(setShowConfirmation(true));
        if(timer) {
          dispatch(setAdmin(true));
        } else {
          dispatch(setScreen(`Game/${gameId}`));
          dispatch(setAdmin(true));
        }
      })
      .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
      });
    }
}