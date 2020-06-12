import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import i18next from 'i18next';
import '../../../styles/game-menu.scss';
import { Players } from './players/players';
import { Languages } from './languages';
import { Timer } from './timer';
import { AddPlayer } from './add-player';
import { Header } from '../global_components/header';

export class GameMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLanguages: false,
            listSpace: null,
            caughtElement: null,
        }
    }

    validatePlayerName = (player) => {
        const isPlayerExists = this.isPlayerExists(player);
        
        if(isPlayerExists) {
            const alert = i18next.t('Player with name {player} already exists', {player});
            this.props.alert('alert', alert);
            return true
        }
        if(player.length < 1) {
            const alert = "Please type in player's name";
            this.props.alert('alert', alert);
            return
        }
        if(this.props.players.length >= 4) {
            const alert = 'Max 4 players';
            this.props.alert('alert', alert);
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
        this.props.startGame();
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

        return (
            <div className="game-menu">
                <Header />
                <div className="menu">
                    <Languages
                        toggleShowLanguages={this.toggleShowLanguages}
                        handleLanguageChange={this.handleLanguageChange}
                        languageClass={languageClass}
                        language={this.props.language}
                    />
                    <Timer toggleTimer={this.props.toggleTimer} setTime={this.props.setTime} timer={this.props.timer} />
                    <AddPlayer validatePlayerName={this.validatePlayerName} alert={this.props.alert} />
                    <Players removePlayer={this.props.removePlayer} reorderPlayers={this.props.reorderPlayers} players={this.props.players} />
                    <button onClick={this.validateSettings} type="submit"><Trans>Start game</Trans></button>
                </div>
            </div>
        );
    }
}