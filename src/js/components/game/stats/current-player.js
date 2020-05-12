import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export class CurrentPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: this.props.time,
        }
        this.startTimer = this.props.timer ? setInterval(this.updateTimer, 1000) : '';
    }

    componentWillUnmount = () => {
        clearInterval(this.startTimer);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let points = this.refs.points.value;
        points = parseInt(points, 10);
        this.props.addPoints(points);
        e.target.reset();
    }

    updateTimer = () => {
        let hrs = this.state.timer.hours;
        let min = this.state.timer.minutes;
        let sec = this.state.timer.seconds;

        if(sec !=0) {
            sec--
        } else {
            if(min != 0) {
                sec = 59;
                min--
            } else {
                sec = 59;
                min = 59;
                hrs--
            }
        };

        if(sec.toString().length < 2) {
            sec = `0${sec}`;
        };

        if(min.toString().length < 2) {
            min = `0${min}`;
        };
        if(hrs.toString().length < 2) {
            hrs = `0${hrs}`;
        };

        if(hrs == '00' && min == '00' && sec == '00') {
            this.props.timeOut()
            return
        };

        this.setState({timer: {hours: hrs, minutes: min, seconds: sec}});
    }

    render() {
        const player = this.props.player;
        const hrs = this.state.timer.hours;
        const min = this.state.timer.minutes;
        const sec = this.state.timer.seconds;
        let shortTimeClass = hrs == 0 && min == 0 && sec <= 30 ? 'short-time' : '';
        let timerDisplay = this.props.timer ? 'show-timer' : '';

        let timer = hrs == '00' ?
            `${min}:${sec}` :
            `${hrs}:${min}:${sec}`;

        const pointsPlaceholder = this.props.language === 'en' ? 'add points' : 'dodaj punkty';
    
        return (
            <div className="current-player">
                {this.props.language === 'en' ? <p>It is <span>{player.playerName}'s</span> turn now!</p> : <p>Teraz gra <span>{player.playerName}</span></p>}
                <div className={`timer ${shortTimeClass} ${timerDisplay}`}>
                    {timer}
                </div>
                <form className="add-points" onSubmit={this.handleSubmit}>
                    <input type="number" placeholder={pointsPlaceholder} ref="points" required min="0"></input>
                    <button type="submit" className="confirm">
                        <FontAwesomeIcon icon={faCheck}/>
                    </button>
                </form>
            </div>
        );
    }
}