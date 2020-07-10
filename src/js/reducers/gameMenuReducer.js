const gameMenu = {
  players: {
    initialListSpace: null,
    listSpace: null,
    grabbedElement: null,
    isTransitionEnabled: false,
    touches: 0
  },
  allPlayersJoined: false,
  showConfirmation: false,
};

const timeLimitReducer = (state = gameMenu, action) => {
  let newState = { ...state };
  switch(action.type) {
    case 'GAME_MENU/SET_LIST_SPACE':
      newState.players.listSpace = action.listSpace;
      return newState;
    
    case 'GAME_MENU/SET_INITIAL_LIST_SPACE':
      newState.players.initialListSpace = action.initialListSpace;
      return newState;
    
    case 'GAME_MENU/SET_GRABBED_ELEMENT':
      newState.players.grabbedElement = action.grabbedElement;
      return newState;
    
    case 'GAME_MENU/SET_IS_TRANSITION_ENABLED':
      newState.players.isTransitionEnabled = action.isTransitionEnabled;
      return newState;
    
    case 'GAME_MENU/SET_TOUCHES':
      newState.players.touches = action.touches;
      return newState;
    
    case 'GAME_MENU/SET_ALL_PLAYERS_JOINED':
      newState.allPlayersJoined = action.allPlayersJoined;
      return newState;
    
    case 'GAME_MENU/SET_SHOW_CONFIRMATION':
      newState.showConfirmation = action.showConfirmation;
      return newState;
      
    default:
      return state;
  }
}

export default timeLimitReducer;