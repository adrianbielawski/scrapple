import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import i18next from 'i18next';
import Switch from '@material-ui/core/Switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/game-menu.scss';
import { Players } from './players';
import { Languages } from './languages';

export class GameMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLanguages: false,
            timer: false,
            listSpace: null,
            caughtElement: null,
        }
    }

    addPlayerHandler = (e) => {
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
        const LowPlayer = player.toLowerCase();
        const propsPlayers = [ ...this.props.players ]
        propsPlayers.map((player) => {
            const lowPlayer = player.toLowerCase();
            return lowPlayer
        })        
        return propsPlayers.includes(LowPlayer);
    }

    validateForm = (e) => {
        e.preventDefault();
        let time = this.refs.time.value;
        if(this.props.players.length < 2) {
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
        const players = this.props.players;
        if(!this.state.timer) {
            time = false
        }

        this.props.startGame(time);
    }

    toggleTimeCheckbox = () => {
        this.setState(state => ({ ...state, timer: !this.state.timer}));
    }

    handleLanguageChange = (e) => {
        const language = e.currentTarget.id;
        this.props.changeLanguage(language);
    }

    toggleShowLanguages = () => {
        this.setState(state => ({ ...state, showLanguages: !this.state.showLanguages}));
    }

    render() {
        const timeInputClass = this.state.timer ? 'active' : '';
        const required = this.state.timer ? true : false;
        const languageClass = this.state.showLanguages ? 'active' : '';

        return (
            <div className="game-menu">
                <h1><img src="../src/img/logo.jpg"></img></h1>
                <form onSubmit={this.validateForm}>
                    <Languages toggleShowLanguages={this.toggleShowLanguages} handleLanguageChange={this.handleLanguageChange} languageClass={languageClass} language={this.props.language}/>
                    <div className="time-option" onClick={this.toggleTimeCheckbox}>
                        <Switch onChange={this.toggleTimeCheckbox} checked={this.state.timer}></Switch>
                        <p><Trans>Player's time limit</Trans></p>
                    </div>
                    <input type="time" className={timeInputClass} required={required} ref="time" defaultValue="00:05:00" step="1"></input>
                    <p><Trans>Add player</Trans></p>                    
                    <div className="add-player">
                        <input id="player-name" type="text" autoComplete="false" spellCheck="false" ref="playerName"></input>
                        <button className="add" onClick={this.addPlayerHandler}>
                            <FontAwesomeIcon icon={faPlus} className="plus"/>
                        </button>
                    </div>
                    <Players removePlayer={this.props.removePlayer} reorderPlayers={this.props.reorderPlayers} players={this.props.players} />
                    <button type="submit"><Trans>Start game</Trans></button>
                </form>
            </div>
        );
    }
}