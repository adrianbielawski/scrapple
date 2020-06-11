import React, { Component } from 'react';
import { Player } from './player';

export class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialListSpace: null,
            listSpace: null,
            grabbedElement: null,
            isTransitionEnableed: false,
            touches: 0
        }
    }

    setTransition = (val) => {
        this.setState(state => ({ ...state, isTransitionEnableed: val}));
    }

    setTouches = (val) => {
        this.setState(state => ({ ...state, touches: this.state.touches + val}));
    }

    setGrabbedElement = (index, eType) => {
        const touches = eType === 'touchstart' && this.state.touches + 1;
        this.setState(state => ({ ...state, grabbedElement: index, initialListSpace: index -1, listSpace: index -1, touches}));
    }

    addSpace = (distance) => {
        let listSpace = this.state.initialListSpace + distance;
        if(this.state.grabbedElement <= listSpace) {
            listSpace +=1;
        };
        this.setState(state => ({ ...state, listSpace}));
    }

    drop = (index, distance, eType) => {
        let players = [ ...this.props.players];
        let newIndex = index + distance
        if(newIndex < 1) {
            newIndex = 0;
        } else if(newIndex >= players.length) {
            newIndex = players.length -1;
        }
        let touches = 0;
        if (eType === 'touchend') {
            touches = this.state.touches - 1;
        }
        this.props.reorderPlayers(index, newIndex)
        this.setState(state => ({ ...state, grabbedElement: null, initialListSpace: null, listSpace: null, touches}));
    }

    getPlayers = () => {
        const propsPlayers = [ ...this.props.players ]
        const players = propsPlayers.map((player, index) => {
            let bottomSpace = index === this.state.listSpace ? true : false;
            
            let topSpace = this.state.grabbedElement != 0 && this.state.listSpace < 0 && index === 0 ||
                this.state.grabbedElement === 0 && this.state.listSpace < 0 && index === 1 ? 
                true :
                false;
            
            const isOtherGrabbed = this.state.touches > 0 && index !== this.state.grabbedElement ? true : false;

            return <Player
                drop={this.drop}
                addSpace={this.addSpace}
                setGrabbedElement={this.setGrabbedElement}
                setTouches={this.setTouches}
                setTransition={this.setTransition}
                removePlayer={this.props.removePlayer}
                isOtherGrabbed={isOtherGrabbed}
                isTransitionEnableed={this.state.isTransitionEnableed}
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