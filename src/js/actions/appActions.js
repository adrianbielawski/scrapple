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

export const setAlert = (alertType, messageKey, messageValue, action, props) => {
  return {
    type: 'APP/SET_ALERT',
    alertType,
    messageKey,
    messageValue,
    action,
    props,
  }
}

export const removeAlert = () => {
  return {
    type: 'APP/REMOVE_ALERT',
  }
}