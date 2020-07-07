const playersNamesReducer = (state = ['aaa', 'bbb', 'ccc'], action) => {
  const playersNames = [ ...state ];
  switch(action.type) {
    case 'ADD_PLAYER':
      playersNames.push(action.playerName);
      return playersNames;
    case 'REMOVE_PLAYER':
      const playersNamesRemoved = playersNames.filter((_, index) => {
          return action.playerId !== index;
      });
      return playersNamesRemoved;
    case 'REORDER_PLAYERS':
      playersNames.splice(action.newIndex, 0, playersNames.splice(action.index, 1)[0]);
      return playersNames;
  }
  return state;
}


export default playersNamesReducer;