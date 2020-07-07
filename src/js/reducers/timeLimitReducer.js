const timeLimit = {
  timer: true,
  time: {
    hours: '00',
    minutes: '05',
    seconds: '00'
  }
};

const timeLimitReducer = (state = timeLimit, action) => {
  const timeLimit = { ...state };
  switch(action.type) {
    case 'TOGGLE_TIMER':
      timeLimit.timer = !state.timer;
      return timeLimit;
    case 'SET_TIME':
      timeLimit.time = action.time;
      return timeLimit;
  }
  return state;
}

export default timeLimitReducer;