const initialState = {
  timer: true,
  time: {
    hours: '00',
    minutes: '05',
    seconds: '00'
  }
};

const timeLimitReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch(action.type) {
    case 'GAME_MENU/SET_TIMER':
      newState.timer = action.timer;
      return newState;

    case 'GAME_MENU/SET_TIME':
      newState.time = action.time;
      return newState;
    
    default:
      return state;
  }
}

export default timeLimitReducer;