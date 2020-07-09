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