import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import '../../../css/game-menu.css';

export class GameMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: this.props.language,
            showLanguages: false,
            timer: false,
            players: this.props.players,
        }
    }

    addPlayer = (e) => {
        e.preventDefault();
        const player = this.refs.playerName.value;
        const isPlayerExists = this.isPlayerExists(player);
        
        if(isPlayerExists) {
            const alert = this.state.language === 'en' ? `Player with name ${player} already exists.` : `Gracz o imieniu ${player} już istnieje`;
            this.props.alert('alert', alert);
            return true
        }

        if(player.length < 1) {
            const alert = this.state.language === 'en' ? `Please type in player's name.` : `Proszę podać imię gracza.`;
            this.props.alert('alert', alert);
            return
        }
        if(this.state.players.length >= 4) {
            const alert = this.state.language === 'en' ? `Max 4 players.` : `Maksymalnie 4 graczy.`;
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
            const alert = this.state.language === 'en' ? 'Please add at least 2 players.' : `Proszę dodać co najmniej 2 graczy.`;
            this.props.alert('alert', alert)
            return 
        }
        let hrs = time.slice(0, 2);
        let min = time.slice(3, 5);
        if(hrs == 0 && min == 0) {
            const alert = this.state.language === 'en' ? "Minimum player's time limit is 1 min." : `Minimalny limit czasu to 1 min.`;
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
    }

    toggleShowLanguages = () => {
        this.setState({showLanguages: !this.state.showLanguages})
    }

    getTexts = (lang) => {
        const texts = {
            language: lang === 'en' ? 'Language' : 'Język',
            limit: lang === 'en' ? "Player's time limit" : 'Limit czasu',
            addPlayer: lang === 'en' ? 'Add player' : 'Dodaj Gracza',
            player: lang === 'en' ? 'Player' : 'Gracz',
            start: lang === 'en' ? 'Start game' : 'Start',
        }
        return texts
    }

    render() {
        const texts = this.getTexts(this.state.language)
        const flag = `../src/img/${this.state.language}-flag.png`;

        const players = this.state.players.map((player, index) => {
            return <li key={index}>{texts.player} {index + 1}: <span>{player}</span></li>
        })

        const checkboxClass = this.state.timer ? 'active' : '';
        const timeInputClass = checkboxClass;
        const required = this.state.timer ? true : false;
        const languageClass = this.state.showLanguages ? 'active' : '';

        return (
            <div className="game-menu">
                <h1><img src="../src/img/logo.jpg"></img></h1>
                <form onSubmit={this.validateForm}>
                    <div className="choose-language" onClick={this.toggleShowLanguages}>
                        <div className="current-lang">
                            <img src={flag}></img>
                            <p>{texts.language}</p>
                        </div>
                        <div className={`languages ${languageClass}`}>
                            <div className="language" onClick={this.handleLanguageChange} id="en">
                                <img src="../src/img/en-flag.png"></img>
                                <p>English</p>
                            </div>
                            <div className="language" onClick={this.handleLanguageChange} id="pl">
                                <img src="../src/img/pl-flag.png"></img>
                                <p>Polski</p>
                            </div>
                        </div>
                    </div>
                    <div className="time-option" onClick={this.toggleTimeCheckbox}>
                        <div className={`check-box ${checkboxClass}`}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </div>
                            <p>{texts.limit}</p>
                    </div>
                    <input type="time" className={timeInputClass} required={required} ref="time" defaultValue="00:05:00" step="1"></input>
                    <p>{texts.addPlayer}</p>                    
                    <div className="add-player">
                        <input id="player-name" type="text" autoComplete="false" spellCheck="false" ref="playerName"></input>
                        <button className="add" onClick={this.addPlayer}>
                            <FontAwesomeIcon icon={faPlus} className="plus"/>
                        </button>
                    </div>
                    <ul>
                        {players}
                    </ul>
                    <button type="submit">{texts.start}</button>
                </form>
            </div>
        );
    }
}