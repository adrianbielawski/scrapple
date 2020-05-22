import React, { Component } from 'react';
import { Player } from './player';

export class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpace: null,
            grabbedElement: null,
            touches: 0
        }
    }

    setTouches = (val) => {
        this.setState({touches: this.state.touches + val})
    }

    setGrabbedElement = (index) => {
        const touches = this.state.touches + 1
        this.setState({grabbedElement: index, initialListSpace: index -1, listSpace: index -1, touches})
    }

    handleSpace = (distance) => {
        let listSpace = this.state.initialListSpace + distance;
        if(this.state.grabbedElement <= listSpace) {
            listSpace +=1;
        };
        this.setState({listSpace});
    }

    handleDrop = (index, distance) => {
        let players = this.props.players;
        let newIndex = index + distance
        if(newIndex < 1) {
            newIndex = 0;
        } else if(newIndex >= players.length) {
            newIndex = players.length -1;
        }
        const touches = this.state.touches - 1;
        players.splice(newIndex, 0, players.splice(index, 1)[0]);
        this.setState({players, grabbedElement: null, initialListSpace: -1, listSpace: null, touches})
    }

    getPlayers = () => {
        const players = this.props.players.map((player, index) => {
            let bottomSpace = index === this.state.listSpace ? true : false;
            
            let topSpace = this.state.grabbedElement != 0 && this.state.listSpace < 0 && index === 0 ||
                this.state.grabbedElement === 0 && this.state.listSpace < 0 && index === 1 ? 
                true :
                false;
            
            const isOtherGrabbed = this.state.touches > 0 && index !== this.state.grabbedElement ? true : false;

            return <Player
                handleDrop={this.handleDrop}
                handleSpace={this.handleSpace}
                setGrabbedElement={this.setGrabbedElement}
                setTouches={this.setTouches}
                removePlayer={this.props.removePlayer}
                isOtherGrabbed={isOtherGrabbed}
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