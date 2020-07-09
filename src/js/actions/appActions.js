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

export const setInnerHeight = (height) => {
  return {
    type: 'APP/SET_INNER_HEIGHT',
    height
  }
}