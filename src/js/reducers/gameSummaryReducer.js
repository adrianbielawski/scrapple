const gameSummary = {
    showExitOptions: false,
    exitOption: null,
};
  
const gameSummaryReducer = (state = gameSummary, action) => {
    let newState = { ...state };
    switch(action.type) {
        case 'GAME_SUMMARY/SET_EXIT_OPTION':
            newState.exitOption = action.exitOption;
            return newState;

        case 'GAME_SUMMARY/SET_SHOW_EXIT_OPTIONS':
            newState.showExitOptions = action.show;
            return newState;
        
        default:
            return state;
    }
}
  
export default gameSummaryReducer;