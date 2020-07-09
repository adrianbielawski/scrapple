import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import db from '../../../firebase';
import '../../../styles/game-menu.scss';
//Custom Components
import Players from './players/players';
import Language from '../global_components/language/language';
import Timer from './timer';
import AddPlayer from './add-player';
import Header from '../global_components/header';
import Confirmation from './confirmation';
import Card from '../global_components/card';
//Redux Actions
import { setGameId } from '../../actions/appActions';

class GameMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpace: null,
            caughtElement: null,
            showConfirmation: this.props.playedAgain && !this.props.playedAgainWithSettings ? true : false,
            allPlayersJoined: false
        };
        this.listenServerChanges = this.props.playedAgain ? this.serverChangeListener() : null
    }
  
    componentWillUnmount() {
        if(this.props.timer) {
            this.unsubscribe();
        }
    }

    serverChangeListener = () => {
        this.unsubscribe = db.collection('games').doc(this.props.gameId).onSnapshot(doc => {
            const data = doc.data();
            if(data.joinedPlayers.length >= this.props.playersNames.length) {
                this.setState(state => ({ ...state, allPlayersJoined: true }));
            };
        });
    }

    validateSettings = (e) => {
        e.preventDefault();
        if(this.props.playersNames.length < 2) {
            const messageKey = 'Please add at least 2 players';
            this.props.alert('alert', messageKey)
            return 
        }

        // if(this.props.timer) {
        //     const time = this.props.time;
        //     if(time.hours == 0 && time.minutes == 0) {
        //         const messageKey = "Minimum player's time limit is 1 min";
        //         this.props.alert('alert', messageKey)
        //         return
        //     }
        // }
        this.handleCreateNewGame();
        
        this.setState(state => ({ ...state, showConfirmation: !state.showConfirmation}))
    }

    handleCreateNewGame = () => {
        const gameId = this.props.gameId ? this.props.gameId : this.setGameId();
        const players = this.getPlayers();
        this.createNewGame(players, gameId);
    }

    setGameId = () => {
        const gameId = Math.floor(Math.random() * 1000000).toString();
        this.props.setGameId(gameId);
        return gameId
    }
  
    getPlayers = () => {
      let players = [ ...this.props.playersNames];
      players = players.map((player, index) => {
        return {
          playerName: player,
          playerId: index,
          currentScore: 0,
          bestScore: 0,
          allPoints: [],
        }
      });
  
      return players
    }

    createNewGame = (players, gameId) => {
      let game = {
        language: this.props.language,
        players,
        currentPlayer: 0,
        gameStarted: true,
        joinedPlayers: [1],
        exitOption: this.props.playedAgainWithSettings ? 'playAgainWithSettings' : null
      }
  
      if(this.props.timer) {
        game = {
          ...game,
          gameStarted: false,
          timer: this.props.timer,
          time: this.props.time,
          endTime: null,
        }
      }
      
      db.collection('games').doc(gameId).set(game)
        .then(() => {
            const newState = {
                showConfirmation: true,
                exitOption: false,
                playedAgainWithSettings: false
            }

            this.setState(state => ({ ...state, ...newState}));
            
            if(this.props.timer) {
                this.serverChangeListener();
            }

            this.props.gameCreated(this.props.timer);
        })
        .catch((error) => {
            console.log(error)
        });
    }

    handleStartAdminGame = () => {
        this.props.startAdminGame();
    }

    render() {
        const buttonText = this.props.playedAgainWithSettings ? 'Play again' : 'Create game';
        
        return (
            <div className="game-menu">
                {this.state.showConfirmation ? 
                    <Confirmation 
                        gameId={this.props.gameId} 
                        handleStartAdminGame={this.handleStartAdminGame} 
                        allPlayersJoined={this.state.allPlayersJoined}
                    /> : null
                }
                <Header />
                <div className="menu">
                    <Card>
                        <Language showName={true}/>
                    </Card>
                    <Card>
                        <Timer />
                    </Card>
                    <Card>
                        <AddPlayer alert={this.props.alert} />
                        <Players />
                    </Card>
                    <button onClick={this.validateSettings} type="submit">{this.props.t(buttonText)}</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        gameId: state.app.gameId,
        language: state.app.language,
        playersNames: state.playersNames,
        timer: state.timeLimit.timer,
        time: state.timeLimit.time,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setGameId: (gameId) => { dispatch(setGameId(gameId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(GameMenu));