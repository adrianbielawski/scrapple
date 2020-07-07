export const addPlayer = (playerName) => {
  return {
    type: 'ADD_PLAYER',
    playerName
  }
}

export const removePlayer = (playerId) => {
  return {
    type: 'REMOVE_PLAYER',
    playerId
  }
}

export const reorderPlayers = (index, newIndex) => {
  return {
    type: 'REORDER_PLAYERS',
    index,
    newIndex
  }
}

export const toggleTimer = () => {
  return {
    type: 'TOGGLE_TIMER'
  }
}

export const setTime = (time) => {
  return {
    type: 'SET_TIME',
    time
  }
}