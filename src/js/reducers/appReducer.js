const app = {
  gameId: null,
};

const appReducer = (state = app, action) => {
  const app = { ...state };
  switch(action.type) {
    case 'APP/SET_GAME_ID':
      app.gameId = action.gameId
      return app;
    case 'APP/CLEAR_APP_STATE':
      app.gameId = null
      return app;
  }
  return state;
}

export default appReducer;