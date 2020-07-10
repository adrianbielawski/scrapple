import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
import { setGameId, setAlert } from '../../actions/appActions';
import { setAllPlayersJoined, setShowConfirmation } from '../../actions/gameMenuActions';

const GameMenu = (props) => {
    const { t } = useTranslation();
  
    useEffect(() => {
        props.playedAgain && !props.playedAgainWithSettings ? props.setShowConfirmation(true) : null;
        if(props.timer && props.playAgain) {
            unsubscribe(gameId)
        }        
        
        return () => {
            props.setShowConfirmation(false);
            if(props.playAgain) {
                unsubscribe()
            }
        }
    }, []);

    const unsubscribe = (gameId) => {
         db.collection('games').doc(gameId).onSnapshot(doc => {
            const data = doc.data();
            if(data.joinedPlayers.length >= props.playersNames.length) {
                props.setAllPlayersJoined(true);
            };
        });
    }

    const validateSettings = (e) => {
        e.preventDefault();
        if(props.playersNames.length < 2) {
            const messageKey = 'Please add at least 2 players';
            props.setAlert('alert', messageKey)
            return 
        }

        // if(props.timer) {
        //     const time = props.time;
        //     if(time.hours == 0 && time.minutes == 0) {
        //         const messageKey = "Minimum player's time limit is 1 min";
        //         props.setAlert('alert', messageKey)
        //         return
        //     }
        // }
        handleCreateNewGame();
        props.setShowConfirmation(!props.showConfirmation)
    }

    const handleCreateNewGame = () => {
        const gameId = props.gameId ? props.gameId : setGameId();
        const players = getPlayers();
        createNewGame(players, gameId);
    }

    const setGameId = () => {
        const gameId = Math.floor(Math.random() * 1000000).toString();
        props.setGameId(gameId);
        return gameId
    }
  
    const getPlayers = () => {
      let players = [ ...props.playersNames];
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

    const createNewGame = (players, gameId) => {
      let game = {
        language: props.language,
        players,
        currentPlayer: 0,
        gameStarted: true,
        joinedPlayers: [1],
        exitOption: props.playedAgainWithSettings ? 'playAgainWithSettings' : null
      }
  
      if(props.timer) {
        game = {
          ...game,
          gameStarted: false,
          timer: props.timer,
          time: props.time,
          endTime: null,
        }
      }
      
      db.collection('games').doc(gameId).set(game)
        .then(() => {
            props.setShowConfirmation(true)
            
            if(props.timer) {
                unsubscribe(gameId)
            }

            props.gameCreated(props.timer);
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const handleStartAdminGame = () => {
        props.startAdminGame();
    }

    const buttonText =  props.playedAgainWithSettings ? 'Play again' : 'Create game';
    
    return (
        <div className="game-menu">
            {props.showConfirmation ? 
                <Confirmation
                    handleStartAdminGame={handleStartAdminGame}
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
                    <AddPlayer />
                    <Players />
                </Card>
                <button onClick={validateSettings} type="submit">{t(buttonText)}</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        gameId: state.app.gameId,
        language: state.app.language,
        playersNames: state.playersNames,
        timer: state.timeLimit.timer,
        time: state.timeLimit.time,
        playedAgain: state.app.playedAgain,
        playedAgainWithSettings: state.app.playedAgainWithSettings,
        showConfirmation: state.gameMenu.showConfirmation,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setGameId: (gameId) => { dispatch(setGameId(gameId)) },
        setAlert: (type, messageKey, messageValue, action, props) => { dispatch(setAlert(type, messageKey, messageValue, action, props)) },
        setAllPlayersJoined: (allPlayersJoined) => { dispatch(setAllPlayersJoined(allPlayersJoined)) },
        setShowConfirmation: (showConfirmation) => { dispatch(setShowConfirmation(showConfirmation)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);