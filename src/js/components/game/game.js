import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import '../../../styles/game.scss';
//Custom Components
import WordChecker from './word-checker';
import Stats from './stats/stats';
import TwoLetterWords from './two-letter-words';
import FinishedGameCover from './finished-game-cover';
import LoadingSpinner from '../global_components/loadingSpinner';
import AudioController from './audio-controller';
import Menu from './menu/menu';
//Redux Actions
import { setGameId, checkAdmin, setAlert } from '../../actions/appActions';
import { setEndTime, checkEndTime, fetchGameData } from '../../actions/gameActions';

class Game extends React.Component {
  componentDidMount() {
    const pathArray = window.location.pathname.split('/');
    const gameId = pathArray[2];
    this.props.setGameId(gameId);
    
    const promise = this.props.fetchGameData(gameId);
    promise.then((unsubscribe) => this.unsubscribe = unsubscribe);
  }

  componentWillUnmount(){
      this.unsubscribe();
  }

  handleGameFinish = (e) => {
    e.preventDefault();
    const action = e.target.id;
    const type = e.target.value;
    const messageKey = 'Are you sure you want to finish this game?';
    const alertProps = {
      gameId: this.props.gameId,
      admin: this.props.admin,
    };
    this.props.setAlert(type, messageKey, null, action, alertProps)
  }

  render() {
    const gameClass = this.props.showWords ? 'show-words' : '';
      
    return (
      this.props.fetching ? <LoadingSpinner background={true} /> : ( 
        <div className={`game ${gameClass}`}>
          {this.props.showFinishedGameCover ? <FinishedGameCover /> : null}
          <div className="top-wrapper">
            <Menu />
            <WordChecker />
            {this.props.admin ? <AudioController /> : null}
          </div>
          <TwoLetterWords />
          <Stats />
          {this.props.admin && <button id="game-finish-button" onClick={this.handleGameFinish} value="confirm">
            {this.props.t("Finish the game")}
          </button>}
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
    return {
      gameId: state.app.gameId,
      admin: state.app.admin,
      showFinishedGameCover: state.app.showFinishedGameCover,
      showWords: state.game.showWords,
      fetching: state.game.fetching,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGameId: (gameId) => { dispatch(setGameId(gameId)) },
    setAlert: (type, messageKey, messageValue, action, props) => { dispatch(setAlert(type, messageKey, messageValue, action, props)) },
    checkAdmin: () => { dispatch(checkAdmin()) },
    checkEndTime: (data, gameId) => dispatch(checkEndTime(data, gameId)),
    setEndTime: (endTime) => { dispatch(setEndTime(endTime)) },
    fetchGameData: (gameId) => dispatch(fetchGameData(gameId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Game));