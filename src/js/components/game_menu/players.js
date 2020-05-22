import React, { Component } from 'react';
import { Player } from './player';

export class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.props.players,
            listSpace: null,
            caughtElement: null,
        }
    }

    setCaughtElement = (index) => {
        this.setState({caughtElement: index, firstListSpace: index -1, listSpace: index -1})
    }

    handleSpace = (distance) => {
        let listSpace = this.state.firstListSpace + distance;
        if(this.state.caughtElement <= listSpace) {
            listSpace +=1;
        };
        this.setState({listSpace});
    }

    handleDrop = (index, distance) => {
        let players = this.state.players;
        let newIndex = index + distance
        if(newIndex < 1) {
            newIndex = 0;
        } else if(newIndex >= players.length) {
            newIndex = players.length -1;
        }
        players.splice(newIndex, 0, players.splice(index, 1)[0]);
        this.setState({players, caughtElement: '', firstListSpace: -1, listSpace: null})
    }

    getPlayers = () => {
        const players = this.state.players.map((player, index) => {
            let bottomSpace = index === this.state.listSpace ? true : false;
            
            let topSpace = this.state.caughtElement != 0 && this.state.listSpace < 0 && index === 0 ||
                this.state.caughtElement === 0 && this.state.listSpace < 0 && index === 1 ? 
                true :
                false;

            return <Player
                handleDrop={this.handleDrop}
                handleSpace={this.handleSpace}
                setCaughtElement={this.setCaughtElement}
                key={index}
                index={index}
                player={player}
                topSpace={topSpace}
                bottomSpace={bottomSpace} />
        })
        return players
    }

    render() {
        const players = this.getPlayers();

        return (
            <ul className="players">
                {players}
            </ul>
        );
    }
}