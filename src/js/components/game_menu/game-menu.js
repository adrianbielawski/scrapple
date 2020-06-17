import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import i18next from 'i18next';
import db from '../../../firebase';
import '../../../styles/game-menu.scss';
import { Players } from './players/players';
import { Languages } from './languages';
import { Timer } from './timer';
import { AddPlayer } from './add-player';
import { Header } from '../global_components/header';
import Confirmation from './confirmation';
import Card from '../global_components/card';

export class GameMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLanguages: false,
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

    validatePlayerName = (player) => {
        const isPlayerExists = this.isPlayerExists(player);
        
        if(isPlayerExists) {
            const alertMessage = 'Player exists';
            const messageValue = {'player': player};
            this.props.alert('alert', alertMessage, null, messageValue);
            return true
        }
        if(player.length < 1) {
            const alertMessage = "Please type in player's name";
            this.props.alert('alert', alertMessage);
            return
        }
        if(this.props.players.length >= 4) {
            const alertMessage = 'Max 4 players';
            this.props.alert('alert', alertMessage);
            return
        }
        const input = document.getElementById('player-name');
        input.value = '';
        this.props.addPlayer(player);
    }
    
    isPlayerExists = (player) => {
        const lowNewPlayer = player.toLowerCase();
        const players = [ ...this.props.players ]
        const lowPlayers = players.map((player) => {
            const lowPlayer = player.toLowerCase();
            return lowPlayer
        })
        return lowPlayers.includes(lowNewPlayer);
    }

    validateSettings = (e) => {
        e.preventDefault();
        if(this.props.players.length < 2) {
            const alert = 'Please add at least 2 players';
            this.props.alert('alert', alert)
            return 
        }

        if(this.props.timer) {
            const time = this.props.time;
            if(time.hours == 0 && time.minutes == 0) {
                const alert = "Minimum player's time limit is 1 min";
                this.props.alert('alert', alert)
                return
            }
        }
        const gameId = this.props.gameId ? this.props.gameId : Math.floor(Math.random() * 1000000).toString();
        this.props.handleCreateNewGame(gameId);

        if(this.props.timer) {
            this.serverChangeListener(gameId);
        }
        
        this.setState(state => ({ ...state, showConfirmation: !state.showConfirmation}))
    }

    serverChangeListener = (gameId) => {
        this.unsubscribe = db.collection('games').doc(gameId).onSnapshot(doc => {
            const data = doc.data();
            if(data.joinedPlayers.length >= this.props.players.length) {
                this.setState(state => ({ ...state, allPlayersJoined: true }));
            };
        });
    }

    handleLanguageChange = (e) => {
        const language = e.currentTarget.id;
        this.props.changeLanguage(language);
    }

    toggleShowLanguages = () => {
        this.setState(state => ({ ...state, showLanguages: !state.showLanguages}));
    }

    render() {
        const languageClass = this.state.showLanguages ? 'active' : '';
        const buttonText = this.props.playedAgainWithSettings ? 'Play again' : 'Create game';
        
        return (
            <div className="game-menu">
                {this.state.showConfirmation ? 
                    <Confirmation 
                        gameId={this.props.gameId} 
                        handleGameStart={this.props.startAdminGame} 
                        allPlayersJoined={this.state.allPlayersJoined}
                    /> : null}
                <Header />
                <div className="menu">
                    <Card>
                        <Languages
                            toggleShowLanguages={this.toggleShowLanguages}
                            handleLanguageChange={this.handleLanguageChange}
                            languageClass={languageClass}
                            language={this.props.language} />
                    </Card>
                    <Card>
                        <Timer toggleTimer={this.props.toggleTimer} setTime={this.props.setTime} timer={this.props.timer} />
                    </Card>
                    <Card>
                        <AddPlayer validatePlayerName={this.validatePlayerName} alert={this.props.alert} />
                        <Players removePlayer={this.props.removePlayer} reorderPlayers={this.props.reorderPlayers} players={this.props.players} />
                    </Card>
                    <button onClick={this.validateSettings} type="submit"><Trans>{buttonText}</Trans></button>
                </div>
            </div>
        );
    }
}