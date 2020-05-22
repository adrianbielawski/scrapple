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
        this.props.setCaughtElement(this.state.index)
        
        const parent = document.getElementsByClassName('players')[0];
        const parentD = parent.getBoundingClientRect();
        parent.style.height = `${parentD.height}px`;
        
        const element = e.currentTarget;
        const elementD = element.getBoundingClientRect();
        const elementH = elementD.height;
        
        const topStart =  elementD.y - parentD.y;
        
        let startX = e.clientX;
        let startY = e.clientY;
        if(e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }

        this.setState({isCought: true, top: topStart, topStart, startX, elementH});
        this.handleMove = () => {this.move(event, startX, startY, elementH, topStart)}
        element.addEventListener('mousemove', this.handleMove);
        element.addEventListener('touchmove', this.handleMove);
    }

    move = (e, startX, startY, elementH, topStart) => {
        let x = e.clientX;
        let y = e.clientY;
        if(e.type == 'touchmove') {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        }
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
        e.currentTarget.removeEventListener('mousemove', this.handleMove);
        e.currentTarget.addEventListener('touchmove', this.handleMove);
        
        let parent = document.getElementsByClassName('players')[0];
        parent.style.height = `auto`;
        
        this.props.handleSpace(0);
        this.props.handleDrop(this.state.index, this.state.distance);
        this.setState({isCought: false, top: 0, left: 0, distance: 0, startX: 0});
    }

    render() {
        let topDivStyle = this.props.topSpace && !this.state.isCought ? {height: this.state.elementH, visibility: 'visible'} : {};
        let bottomDivStyle = this.props.bottomSpace && !this.state.isCought ? {height: this.state.elementH, visibility: 'visible'} : {};
        let className = '';
        let style = {};
        if(this.state.isCought) {
            className = 'caught'
            style = {
                top: this.state.top,
                left: this.state.left
            }
        }
        
        return (
            <li onMouseDown={this.handleCatch} onTouchStart={this.handleCatch} onMouseUp={this.handleDrop} onTouchEnd={this.handleDrop} className={`player ${className}`} style={style} value={this.props.index}>
                <div className="top-list-space" style={topDivStyle}></div>
                <div className="player-name">
                    <Trans>Player</Trans> {this.props.index + 1}: <span>{this.props.player}</span>
                </div>
                <div className="bottom-list-space" style={bottomDivStyle}></div>
            </li>
        );
    }
}