import db from '../../firebase';
//Redux Actions
import { joinGame } from '../actions/mainMenuActions';

export const setGameId = (gameId) => {
  return {
    type: 'APP/SET_GAME_ID',
    gameId
  }
}

export const clearAppState = () => {
  return {
    type: 'APP/CLEAR_APP_STATE',
  }
}

export const changeLanguage = (language) => {
  return {
    type: 'APP/CHANGE_LANGUAGE',
    language
  }
}

export const setScreenHeight = (height) => {
  return {
    type: 'APP/SET_SCREEN_HEIGHT',
    height
  }
}

export const setScreen = (screen) => {
  return {
    type: 'APP/SET_SCREEN',
    screen
  }
}

export const setAdmin = (admin) => {
  return {
    type: 'APP/SET_ADMIN',
    admin
  }
}

export const setPlayedAgain = (playedAgain) => {
  return {
    type: 'APP/SET_PLAYED_AGAIN',
    playedAgain
  }
}

export const setPlayedAgainWithSettings = (playedAgainWithSettings) => {
  return {
    type: 'APP/SET_PLAYED_AGAIN_WITH_SETTINGS',
    playedAgainWithSettings
  }
}

export const setShowFinishedGameCover = (showFinishedGameCover) => {
  return {
    type: 'APP/SHOW_FINISHED_GAME_COVER',
    showFinishedGameCover
  }
}

export const setAlert = (alertType, messageKey, messageValue, action, alertProps) => {
  return {
    type: 'APP/SET_ALERT',
    alertType,
    messageKey,
    messageValue,
    action,
    alertProps,
  }
}

export const removeAlert = () => {
  return {
    type: 'APP/REMOVE_ALERT',
  }
}

export const handleFinishGame = (gameId, admin) => {
  console.log(gameId, admin)
  return dispatch => {
    if(admin) {
      db.collection('games').doc(gameId).update({
        gameFinished: true,
        exitOption: null,
      });
      dispatch(setPlayedAgain(false));
      dispatch(setPlayedAgainWithSettings(false));
      dispatch(setScreen(`Game/${gameId}/SubtractPoints`));
      dispatch(removeAlert());
    } else {
      dispatch(setShowFinishedGameCover(true));
      dispatch(removeAlert());
    }
  }
}

export const playAgain = (gameId) => {
  return dispatch => {
    sessionStorage.setItem('gameStarted', JSON.stringify(false));
    const localData = sessionStorage.getItem('admin');
    const isAdmin = JSON.parse(localData);
    if(isAdmin) {
      let timer = false;
      let players = [];
      db.collection('games').doc(gameId).get()
      .then(response => {
        const data = response.data();
        timer = data.timer;
        players = getPlayers(data.players);

        db.collection('games').doc(gameId).update({
          showFinishedGameCover: false,
          gameStarted: false,
          gameFinished: false,
          pointsSubtracted: false,
          currentPlayer: 0,
          joinedPlayers: [1],
          players,
          exitOption: 'playAgain'
        })
        .then(() => {
          dispatch(setShowFinishedGameCover(false));
          dispatch(setAdmin(isAdmin));
          dispatch(setPlayedAgain(true));
          dispatch(setScreen(timer ? 'GameMenu' : `Game/${gameId}`));
        })
        .catch(() => {
          dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
        });
      })
      .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
      });
    } else {
      dispatch(setShowFinishedGameCover(false));
      dispatch(setScreen('MainMenu'));
      dispatch(joinGame(gameId));
    };
  }
}

export const playAgainSettings = (gameId) => {
  return dispatch => {
    sessionStorage.setItem('gameStarted', JSON.stringify(false));
    const localData = sessionStorage.getItem('admin');
    const isAdmin = JSON.parse(localData);
    if(isAdmin) {
      db.collection('games').doc(gameId).update({
        showFinishedGameCover: false,
        gameStarted: false,
        gameFinished: false,
        pointsSubtracted: false,
        currentPlayer: 0,
        joinedPlayers: [],
        players: [],
        exitOption: 'playAgainWithSettings'
      })
      .then(() => {
        dispatch(setScreen(`GameMenu`));
        dispatch(setPlayedAgainWithSettings(true));
        dispatch(setShowFinishedGameCover(false));
      })
      .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
      });
    } else {
        dispatch(setShowFinishedGameCover(false));
        dispatch(setScreen(`MainMenu`));
        dispatch(joinGame(gameId));
    };
  }
}

export const exitGame = (gameId, admin) => {
  return dispatch => {
    if(admin) {
      db.collection('games').doc(gameId).set({
        exitOption: 'exitGame',
      });
    }
    
    dispatch(clearAppState());
  }
}
  
const getPlayers = (players) => {
  return players.map((player, index) => {
    return {
      playerName: player.playerName,
      playerId: index,
      currentScore: 0,
      bestScore: 0,
      allPoints: [],
    }
  });
}