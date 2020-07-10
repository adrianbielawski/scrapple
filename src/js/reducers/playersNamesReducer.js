const names = ['aaa', 'bbb'];

const playersNamesReducer = (state = names, action) => {
  let playersNames = [ ...state ];
  switch(action.type) {
    case 'GAME_MENU/ADD_PLAYER':
      playersNames.push(action.playerName);
      return playersNames;

    case 'GAME_MENU/REMOVE_PLAYER':
      const playersNamesRemoved = playersNames.filter((_, index) => {
          return action.playerId !== index;
      });
      return playersNamesRemoved;

    case 'GAME_MENU/REORDER_PLAYERS':
      playersNames.splice(action.newIndex, 0, playersNames.splice(action.index, 1)[0]);
      return playersNames;

    case 'APP/CLEAR_APP_STATE':
      playersNames = [];
      return playersNames;

    default:
      return state;
  }
}


export default playersNamesReducer;