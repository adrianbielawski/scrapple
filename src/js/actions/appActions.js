import { db, auth } from '../../firebase';
import i18n from '../../i18n';
//Redux Actions
import { clearGameSummaryState } from '../actions/gameSummaryActions';
import { setShowFinishedGameCover } from '../actions/gameActions';

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

export const playAgain = (gameId, admin) => {
  return dispatch => {
    if(admin) {
      db.collection('games').doc(gameId).get()
      .then(response => {
        const data = response.data();
        const players = clearPlayers(data.players);

        db.collection('games').doc(gameId).update({
          gameStarted: true,
          gameFinished: false,
          pointsSubtracted: false,
          currentPlayer: 0,
          players,
          endTime: null,
          exitOption: 'playAgain'
        })
        .then(() => {
          dispatch(clearGameSummaryState());
          dispatch(setScreen(`Game/${gameId}`));
        })
        .catch(() => {
          dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
        });
      })
      .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
      });
    } else {
      dispatch(clearGameSummaryState());
      dispatch(setScreen(`Game/${gameId}`));
    };
  }
}

export const playAgainSettings = (gameId, admin) => {
  return dispatch => {
    if(admin) {
      db.collection('games').doc(gameId).get()
      .then(response => {
        const data = response.data();
        const players = clearPlayers(data.players);

        db.collection('games').doc(gameId).update({
          gameStarted: false,
          gameFinished: false,
          pointsSubtracted: false,
          currentPlayer: 0,
          players,
          endTime: null,
          exitOption: 'playAgainWithSettings'
        })
        .then(() => {
          dispatch(setScreen(`GameMenu`));
          dispatch(clearGameSummaryState());
        })
        .catch(() => {
          dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
        });
      })
    } else {
      dispatch(clearGameSummaryState());
      dispatch(setScreen(`Game/${gameId}`));
    };
  }
}

export const exitGame = (gameId, admin) => {
  return dispatch => {
    dispatch(clearGameSummaryState());
    dispatch(clearAppStateOnExit());
    if(admin) {
      db.collection('games').doc(gameId).set({
        exitOption: 'exitGame',
      });
    }
  }
}
  
const clearAppStateOnExit = () => {
  return {
    type: 'APP/EXIT_GAME',
  };
}
  
const clearPlayers = (players) => {
  return players.map((player) => {
    return {
      admin: player.admin,
      playerName: player.playerName,
      playerIndex: player.playerIndex,
      currentScore: 0,
      bestScore: 0,
      allPoints: [],
      uid: player.uid
    }
  });
}