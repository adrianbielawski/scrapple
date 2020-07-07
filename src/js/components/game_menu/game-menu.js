import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import db from '../../../firebase';
import { connect } from 'react-redux';
import '../../../styles/game-menu.scss';
//Custom Components
import Players from './players/players';
import Language from '../global_components/language/language';
import Timer from './timer';
import AddPlayer from './add-player';
import Header from '../global_components/header';
import Confirmation from './confirmation';
import Card from '../global_components/card';

class GameMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: this.props.gameId,
            listSpace: null,
            caughtElement: null,
            showConfirmation: this.props.playedAgain && !this.props.playedAgainWithSettings ? true : false,
            allPlayersJoined: false
        };
        this.listenServerChanges = this.props.playedAgain ? this.serverChangeListener(this.props.gameId) : null
    }
  
    componentWillUnmount() {
        if(this.props.timer) {
            this.unsubscribe();
        }
    }

    serverChangeListener = (gameId) => {
        this.unsubscribe = db.collection('games').doc(gameId).onSnapshot(doc => {
            const data = doc.data();
            if(data.joinedPlayers.length >= this.props.playersNames.length) {
                this.setState(state => ({ ...state, allPlayersJoined: true }));
            };
        });
    }

    handleCreateNewGame = () => {
        const gameId = this.state.gameId ? this.state.gameId : Math.floor(Math.random() * 1000000).toString();
        const players = this.getPlayers();
        this.createNewGame(players, gameId);
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
                gameId,
                showConfirmation: true,
                exitOption: false,
                playedAgainWithSettings: false
            }

            this.setState(state => ({ ...state, ...newState}));
            
            if(this.props.timer) {
                this.serverChangeListener(gameId);
            }

            this.props.gameCreated(gameId, this.props.timer);
        })
        .catch((error) => {
            console.log(error)
        });
    }

    handleStartAdminGame = () => {
        this.props.startAdminGame();
    }

    validateSettings = (e) => {
        e.preventDefault();
        if(this.props.playersNames.length < 2) {
            const messageKey = 'Please add at least 2 players';
            this.props.alert('alert', messageKey)
            return 
        }

        if(this.props.timer) {
            const time = this.props.time;
            if(time.hours == 0 && time.minutes == 0) {
                const messageKey = "Minimum player's time limit is 1 min";
                this.props.alert('alert', messageKey)
                return
            }
        }
        this.handleCreateNewGame();
        
        this.setState(state => ({ ...state, showConfirmation: !state.showConfirmation}))
    }

    render() {
        const buttonText = this.props.playedAgainWithSettings ? 'Play again' : 'Create game';
        
        return (
            <div className="game-menu">
                {this.state.showConfirmation ? 
                    <Confirmation 
                        gameId={this.state.gameId} 
                        handleStartAdminGame={this.handleStartAdminGame} 
                        allPlayersJoined={this.state.allPlayersJoined}
                    /> : null
                }
                <Header />
                <div className="menu">
                    <Card>
                        <Language changeLanguage={this.props.changeLanguage} currentLanguage={this.props.language} showName={true}/>
                    </Card>
                    <Card>
                        <Timer />
                    </Card>
                    <Card>
                        <AddPlayer alert={this.props.alert} />
                        <Players />
                    </Card>
                    <button onClick={this.validateSettings} type="submit"><Trans>{buttonText}</Trans></button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        playersNames: state.playersNames,
        timer: state.timeLimit.timer,
        time: state.timeLimit.time,
    }
}

export default connect(mapStateToProps)(GameMenu);