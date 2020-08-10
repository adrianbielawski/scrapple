import { db, auth } from '../../firebase';
import i18n from '../../i18n';
//Redux Actions
import { joinGame } from '../actions/mainMenuActions';
import { clearGameSummaryState } from '../actions/gameSummaryActions';

export const setGameId = (gameId) => {
  return {
    type: 'APP/SET_GAME_ID',
    gameId
  }
}

export const setUser = (user) => {
  return {
    type: 'APP/SET_USER',
    user
  }
}

export const clearUser = () => {
  return {
    type: 'APP/CLEAR_USER',
  }
}

export const setFetchingGameData = (fetching) => {
  return {
    type: 'APP/SET_FETCHING_GAME_DATA',
    fetching
  }
}

export const clearAppState = (language) => {
  return {
    type: 'APP/CLEAR_APP_STATE',
    language
  }
}

export const setLanguage = language => {
  return {
    type: 'APP/SET_LANGUAGE',
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

export const changeLanguage = (language) => {
  return dispatch => {
    const html = document.getElementsByTagName('html');
    html[0].lang = language;
    i18n.changeLanguage(language);
    auth.languageCode = language;
    dispatch(setLanguage(language));
  }
}

export const updateUser = (uid, gameId) => () => {
  return db.collection('users').doc(uid).update({
    currentGame: gameId,
  });
}

export const getGameId = () => {
  return dispatch => {
    const pathArray = window.location.pathname.split('/');
    const gameId = pathArray[2];
    dispatch(setGameId(gameId));
    return gameId;
  }
}

export const getGameData = (gameId) => {
  return dispatch => {
    return db.collection('games').doc(gameId).get()
    .then(response => response.data())
    .catch(() => {
      dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
    });
  }
}

export const handleFinishGame = (gameId, admin) => {
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
    dispatch(clearGameSummaryState());
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
    dispatch(clearGameSummaryState());
  }
}

export const exitGame = (gameId, admin) => {
  return dispatch => {
    if(admin) {
      db.collection('games').doc(gameId).set({
        exitOption: 'exitGame',
      });
    }
    
    dispatch(clearGameSummaryState());
    dispatch(clearAppStateOnExit());
  }
}
  
const clearAppStateOnExit = () => {
  return {
    type: 'APP/EXIT_GAME',
  };
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