import React, { Component } from 'react';
import { Trans } from 'react-i18next';

export class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index,
            isCought: false,
            top: 0,
            left: 0,
            startX: 0,
            elementH: 0,
            distance: 0,
            topSpace: this.props.topSpace,
            bottomSpace: this.props.bottomSpace
        }
    }

    componentDidMount () {
        const elementH = document.getElementsByClassName('player')[this.props.index].getBoundingClientRect().height;
        this.setState({elementH})
    }

    handleCatch = (e) => {
        e.preventDefault();
        this.props.setCaughtElement(this.state.index)
        const parent = document.getElementsByClassName('players')[0];
        const parentD = parent.getBoundingClientRect();
        parent.style.height = `${parentD.height}px`;
        const element = e.currentTarget.getBoundingClientRect();
        const topStart =  element.y - parentD.y;
        const elementH = element.height;
        const startX = e.clientX;
        const startY = e.clientY;
        this.setState({isCought: true, top: topStart, topStart, startX, elementH});
        this.handleMove = () => {this.move(event, startX, startY, elementH, topStart)}
        document.addEventListener('mousemove', this.handleMove);
    }

    move = (e, startX, startY, elementH, topStart) => {
        const x = e.clientX;
        const y = e.clientY;
        const top = y - startY + topStart;
        const left = x - startX ;
        let distance = (top - topStart) / elementH;
        distance = Math.round(distance);
        if(distance === -0) {
            distance = 0;
        };
        if(distance !== this.state.distance) {
            this.props.handleSpace(distance);
        };
        this.setState({top, left, startX, elementH, distance});
    }

    handleDrop = (e) => {
        e.preventDefault();
        this.props.handleSpace(0);
        const parent = document.getElementsByClassName('players')[0];
        parent.style.height = `auto`;
        this.props.handleDrop(this.state.index, this.state.distance);
        document.removeEventListener('mousemove', this.handleMove);
        this.setState({isCought: false, top: 0, left: 0, distance: 0, startX: 0});
    }

    render() {
        let className = '';
        let style = {};
        let topDivStyle = this.props.topSpace && !this.state.isCought ? {height: this.state.elementH, visibility: 'visible'} : {};
        let bottomDivStyle = this.props.bottomSpace && !this.state.isCought ? {height: this.state.elementH, visibility: 'visible'} : {};
        if(this.state.isCought) {
            className = 'caught'
            style = {
                top: this.state.top,
                left: this.state.left
            }
        }
        
        return (
            <li onMouseDown={this.handleCatch} onMouseUp={this.handleDrop} className={`player ${className}`} style={style} value={this.props.index}>
                <div className="top-list-space" style={topDivStyle}></div>
                <div className="player-name">
                    <Trans>Player</Trans> {this.props.index + 1}: <span>{this.props.player}</span>
                </div>
                <div className="bottom-list-space" style={bottomDivStyle}></div>
            </li>
        );
    }
}