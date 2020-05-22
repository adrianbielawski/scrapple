import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import i18next from 'i18next';
import i18n from '../../../i18n';
import Switch from '@material-ui/core/Switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/game-menu.scss';
import { Player } from './player';
import { Players } from './players';

export class GameMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: this.props.language,
            showLanguages: false,
            timer: false,
            players: this.props.players,
            listSpace: null,
            caughtElement: null,
        }
    }

    addPlayer = (e) => {
        e.preventDefault();
        const player = this.refs.playerName.value;
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
        if(this.state.players.length >= 4) {
            const alert = 'Max 4 players';
            this.props.alert('alert', alert);
            return
        }
        let players = this.state.players;
        players.push(player);
        const input = document.getElementById('player-name');
        input.value = '';
        this.setState({players})
    }
    
    isPlayerExists = (player) => {
        const LowPlayer = player.toLowerCase();
        const statePlayers = this.state.players.map((player) => {
            const lowPlayer = player.toLowerCase();
            return lowPlayer
        })        
        return statePlayers.includes(LowPlayer) ? true : false;
    }

    validateForm = (e) => {
        e.preventDefault();
        let time = this.refs.time.value;
        if(this.state.players.length < 2) {
            const alert = 'Please add at least 2 players';
            this.props.alert('alert', alert)
            return 
        }
        let hrs = time.slice(0, 2);
        let min = time.slice(3, 5);
        if(hrs == 0 && min == 0) {
            const alert = "Minimum player's time limit is 1 min";
            this.props.alert('alert', alert)
            return
        }
        this.handleFormSubmit(time)
    }

    handleFormSubmit = (time) => {
        const players = this.state.players;
        if(!this.state.timer) {
            time = false
        }

        this.props.startGame(players, time, this.state.language);
    }

    toggleTimeCheckbox = () => {
        this.setState({timer: !this.state.timer});
    }

    handleLanguageChange = (e) => {
        const language = e.currentTarget.id;
        const html = document.getElementsByTagName('html');
        html[0].lang = language;
        this.setState({language})
        i18n.changeLanguage(`${language}`);
    }

    toggleShowLanguages = () => {
        this.setState({showLanguages: !this.state.showLanguages})
    }

    render() {
        const flag = `../src/img/${this.state.language}-flag.png`;
        const timeInputClass = this.state.timer ? 'active' : '';
        const required = this.state.timer ? true : false;
        const languageClass = this.state.showLanguages ? 'active' : '';

        return (
            <div className="game-menu">
                <h1><img src="../src/img/logo.jpg"></img></h1>
                <form onSubmit={this.validateForm}>
                    <div className="choose-language" onClick={this.toggleShowLanguages}>
                        <div className="current-lang">
                            <img src={flag}></img>
                            <p><Trans>Language</Trans></p>
                        </div>
                        <div className={`languages ${languageClass}`}>
                            <div className="language" onClick={this.handleLanguageChange} id="en-GB">
                                <img src="../src/img/en-GB-flag.png"></img>
                                <p>English</p>
                            </div>
                            <div className="language" onClick={this.handleLanguageChange} id="pl-PL">
                                <img src="../src/img/pl-PL-flag.png"></img>
                                <p>Polski</p>
                            </div>
                        </div>
                    </div>
                    <div className="time-option" onClick={this.toggleTimeCheckbox}>
                        <Switch onChange={this.toggleTimeCheckbox} checked={this.state.timer}></Switch>
                        <p><Trans>Player's time limit</Trans></p>
                    </div>
                    <input type="time" className={timeInputClass} required={required} ref="time" defaultValue="00:05:00" step="1"></input>
                    <p><Trans>Add player</Trans></p>                    
                    <div className="add-player">
                        <input id="player-name" type="text" autoComplete="false" spellCheck="false" ref="playerName"></input>
                        <button className="add" onClick={this.addPlayer}>
                            <FontAwesomeIcon icon={faPlus} className="plus"/>
                        </button>
                    </div>
                    <Players players={this.state.players} />
                    <button type="submit"><Trans>Start game</Trans></button>
                </form>
            </div>
        );
    }
}