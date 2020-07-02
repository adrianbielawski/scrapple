import React, { Component } from 'react';
import { Trans } from 'react-i18next';
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

class GameMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: this.props.gameId,
            playersNames: ['sd', 'sdf'],
            timer: true,
            time: {
              hours: '00',
              minutes: '05',
              seconds: '00'
            },
            listSpace: null,
            caughtElement: null,
            showConfirmation: this.props.playedAgain && !this.props.playedAgainWithSettings ? true : false,
            allPlayersJoined: false
        };
        this.listenServerChanges = this.props.playedAgain ? this.serverChangeListener(this.props.gameId) : null
    }
  
    componentWillUnmount() {
        if(this.state.timer) {
            this.unsubscribe();
        }
    }

    handleCreateNewGame = () => {
        const gameId = this.state.gameId ? this.state.gameId : Math.floor(Math.random() * 1000000).toString();
        this.props.setPlayersNames(this.state.playersNames);
        const players = this.getPlayers();
        this.createNewGame(players, gameId);
    }
  
    getPlayers = () => {
      let players = [ ...this.state.playersNames];
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
  
      if(this.state.timer) {
        game = {
          ...game,
          gameStarted: false,
          timer: this.state.timer,
          time: this.state.time,
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
            
            if(this.state.timer) {
                this.serverChangeListener(gameId);
            }

            this.props.gameCreated(gameId, this.state.timer);
        })
        .catch((error) => {
            console.log(error)
        });
    }

    serverChangeListener = (gameId) => {
        this.unsubscribe = db.collection('games').doc(gameId).onSnapshot(doc => {
            const data = doc.data();
            if(data.joinedPlayers.length >= this.state.playersNames.length) {
                this.setState(state => ({ ...state, allPlayersJoined: true }));
            };
        });
    }

    handleStartAdminGame = () => {
        this.props.startAdminGame();
    }

    toggleTimer = () => {
        this.setState(state => ({ ...state, timer: !state.timer}));
    }
  
    setTime = (val) => {
      let time = {};
      let hrs = val.slice(0, 2);
      let min = val.slice(3, 5);
      let sec = val.slice(6, 8);
      if(sec == '') {
        sec= '00';
      }
      time.hours = hrs;
      time.minutes = min;
      time.seconds = sec;
  
      this.setState(state => ({ ...state, time}));
    }

    validatePlayerName = (player) => {
        const isPlayerExists = this.isPlayerExists(player);
        
        if(isPlayerExists) {
            const messageKey = 'Player exists';
            const messageValue = {'player': player};
            this.props.alert('alert', messageKey, messageValue, null);
            return
        }
        if(player.length < 1) {
            const messageKey = "Please type in player's name";
            this.props.alert('alert', messageKey);
            return
        }
        if(this.state.playersNames.length >= 4) {
            const messageKey = 'Max 4 players';
            this.props.alert('alert', messageKey);
            return
        }
        const input = document.getElementById('player-name');
        input.value = '';
        this.addPlayer(player);
    }

    addPlayer = (player) => {
        const playersNames = [ ...this.state.playersNames ];
        playersNames.push(player);
        this.setState(state => ({ ...state, playersNames}));
    }

    removePlayer = (i) => {
        const playersNamesState = [ ...this.state.playersNames ];
        const playersNames = playersNamesState.filter((_, index) => {
            return i !== index
        })
        this.setState(state => ({ ...state, playersNames}));
    }
  
    reorderPlayers = (index, newIndex) => {
      const playersNames = [ ...this.state.playersNames];
      playersNames.splice(newIndex, 0, playersNames.splice(index, 1)[0]);
      this.setState((state) => ({ ...state, playersNames}));
    }
    
    isPlayerExists = (player) => {
        const lowNewPlayer = player.toLowerCase();
        const players = [ ...this.state.playersNames ]
        const lowPlayers = players.map((player) => {
            const lowPlayer = player.toLowerCase();
            return lowPlayer
        })
        return lowPlayers.includes(lowNewPlayer);
    }

    validateSettings = (e) => {
        e.preventDefault();
        if(this.state.playersNames.length < 2) {
            const messageKey = 'Please add at least 2 players';
            this.props.alert('alert', messageKey)
            return 
        }

        // if(this.state.timer) {
        //     const time = this.state.time;
        //     if(time.hours == 0 && time.minutes == 0) {
        //         const messageKey = "Minimum player's time limit is 1 min";
        //         this.props.alert('alert', messageKey)
        //         return
        //     }
        // }
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
                        <Timer toggleTimer={this.toggleTimer} setTime={this.setTime} timer={this.state.timer} time={this.state.time} />
                    </Card>
                    <Card>
                        <AddPlayer validatePlayerName={this.validatePlayerName} alert={this.props.alert} />
                        <Players removePlayer={this.removePlayer} reorderPlayers={this.reorderPlayers} players={this.state.playersNames} />
                    </Card>
                    <button onClick={this.validateSettings} type="submit"><Trans>{buttonText}</Trans></button>
                </div>
            </div>
        );
    }
}
export default GameMenu;