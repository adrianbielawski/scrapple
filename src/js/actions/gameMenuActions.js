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