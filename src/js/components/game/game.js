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
import { setGameId, setAlert } from '../../actions/appActions';
import { setEndTime, checkEndTime, fetchGameData, setShowFinishedGameCover } from '../../actions/gameActions';

class Game extends React.Component {
  componentDidMount() {
    const pathArray = window.location.pathname.split('/');
    const gameId = pathArray[2];
    this.props.setGameId(gameId);
    
    const promise = this.props.fetchGameData(gameId, this.props.user);
    promise.then((unsubscribe) => this.unsubscribe = unsubscribe);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.uid !== this.props.user.uid) {
      const promise = this.props.fetchGameData(this.props.gameId, this.props.user);
      promise.then((unsubscribe) => this.unsubscribeAfterUpdate = unsubscribe);
    }
  }

  componentWillUnmount(){
    this.props.setShowFinishedGameCover(false);
    this.unsubscribe();
    if(this.unsubscribeAfterUpdate) {
      this.unsubscribeAfterUpdate();
    }
  }

  handleGameFinish = (e) => {
    e.preventDefault();
    this.props.setAlert('confirm', 'Are you sure you want to finish this game?', null, 'game-finish-button');
  }

  render() {
    const gameClass = this.props.showWords ? 'show-words' : '';
      
    return (
      this.props.fetchingGameData ? <LoadingSpinner background={true} /> : ( 
        <div className={`game ${gameClass}`}>
          {this.props.showFinishedGameCover ? <FinishedGameCover /> : null}
          <div className="top-wrapper">
            <Menu />
            <WordChecker />
            {this.props.admin ? <AudioController /> : null}
          </div>
          <TwoLetterWords />
          <Stats />
          {this.props.admin && <button className="game-finish-button" onClick={this.handleGameFinish}>
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
      user: state.app.user,
      admin: state.app.admin,
      showFinishedGameCover: state.game.showFinishedGameCover,
      showWords: state.game.showWords,
      fetchingGameData: state.game.fetchingGameData,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGameId: (gameId) => { dispatch(setGameId(gameId)) },
    setAlert: (type, messageKey, messageValue, action, props) => { dispatch(setAlert(type, messageKey, messageValue, action, props)) },
    checkEndTime: (data, gameId) => dispatch(checkEndTime(data, gameId)),
    setEndTime: (endTime) => { dispatch(setEndTime(endTime)) },
    fetchGameData: (gameId, user) => dispatch(fetchGameData(gameId, user)),
    setShowFinishedGameCover: (showFinishedGameCover) => dispatch(setShowFinishedGameCover(showFinishedGameCover)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Game));