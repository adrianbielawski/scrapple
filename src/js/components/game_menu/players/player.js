import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index,
            isGrabbed: false,
            isTouchDevice: false,
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
        this.element = document.getElementsByClassName('player')[this.props.index];
        this.elementH = this.element.getBoundingClientRect().height;
    }

    handleGrab = (e) => {
        if(e.type === 'touchstart') {
            if(this.props.isOtherGrabbed) {
                this.props.setTouches(1);
                return
            }
            this.setState(state => ({ ...state, isTouchDevice: true}));
        };
        this.props.setGrabbedElement(this.state.index, e.type);
        
        const parent = document.getElementsByClassName('players')[0];
        const parentD = parent.getBoundingClientRect();
        parent.style.height = `${parentD.height}px`;
        
        const elementD = this.element.getBoundingClientRect();
        
        const topStart =  elementD.y - parentD.y;
        
        let startX = e.clientX;
        let startY = e.clientY;
        if(e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }

        this.setState(state => ({ ...state, isGrabbed: true, top: topStart, topStart, startX}));
        this.handleMove = () => {this.move(event, startX, startY, topStart)}
        if(e.type === 'mousedown') {
            window.addEventListener('mousemove', this.handleMove);
        }
        if(e.type === 'touchstart') {
            window.addEventListener('touchmove', this.handleMove);
        }
    }

    move = (e, startX, startY, topStart) => {
        this.props.setTransition(true);
        let x = e.clientX;
        let y = e.clientY;
        if(e.type == 'touchmove') {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        };
        const top = y - startY + topStart;
        const left = x - startX;
        let distance = (top - topStart) / this.elementH;
        distance = Math.round(distance);
        if(distance === -0) {
            distance = 0;
        };
        if(distance !== this.state.distance) {
            this.props.addSpace(distance);
        };
        this.setState(state => ({ ...state, top, left, startX, distance}));
    }

    handleDrop = (e) => {
        this.props.setTransition(false);
        if(this.props.isOtherGrabbed) {
            this.props.setTouches(-1)
            return
        };
        
        window.removeEventListener('mousemove', this.handleMove);
        window.removeEventListener('touchmove', this.handleMove);
        
        let parent = document.getElementsByClassName('players')[0];
        parent.style.height = `auto`;
        
        this.props.addSpace(0);
        const event = e.type;
        this.props.drop(this.state.index, this.state.distance, event);
        this.setState(state => ({ ...state, isGrabbed: false, top: 0, left: 0, distance: 0, startX: 0}));
    }

    removePlayer = (e) => {
        e.preventDefault();
        this.removedPlayerTransition();
        setTimeout(this.remove, 500);
    }
    
    removedPlayerTransition = () => {
        const element = this.element;
        element.style.transitionProperty = 'width, max-height';
        element.style.transitionDuration = '.4s, .4s';
        element.style.transitionDelay = '0.1s, .4s';
        element.style.transitionTimingFunction = 'ease-in, ease';
        element.style.width = 0;
        element.style.maxHeight = 0;
    }

    remove = () => {
        this.element.style = {};
        this.props.removePlayer(this.state.index);
    }

    getStyles = () => {
        let styles = {
            topSpaceStyle: {},
            bottomSpaceStyle: {},
            topSpaceClass: '',
            bottomSpaceClass: '',
            grabbed: '',
            position: {},
            hover: 'no-touch-device'
        }

        if(this.props.topSpace && !this.state.isGrabbed) {
            styles.topSpaceStyle = {height: this.elementH};
            styles.topSpaceClass = 'visible';
        } else if(this.props.bottomSpace && !this.state.isGrabbed) {
            styles.bottomSpaceStyle = {height: this.elementH}
            styles.bottomSpaceClass = 'visible';
        };

        if(!this.props.isTransitionEnableed && !this.state.isGrabbed) {
            styles.bottomSpaceStyle.transition = 'none';
            styles.topSpaceStyle.transition = 'none';
        };

        if(this.state.isGrabbed) {
            styles.grabbed = 'grabbed'
            styles.position = {
                top: this.state.top,
                left: this.state.left
            };
        };
        if (this.state.isTouchDevice) {
            styles.hover = '';
        };

        return styles
    }

    render() {
        const styles = this.getStyles();
        
        return (
            <li className={`player ${styles.grabbed} ${styles.hover}`} style={styles.position}>
                <div className={`top-list-space ${styles.topSpaceClass}`} style={styles.topSpaceStyle}></div>
                <div className="wrapper">
                    <div onMouseDown={this.handleGrab}
                        onMouseUp={this.handleDrop}
                        onTouchStart={this.handleGrab}
                        onTouchEnd={this.handleDrop}
                        className="player-name"
                    >
                        <p><Trans>Player</Trans> {this.props.index + 1}: <span> {this.props.player}</span></p>
                    </div>
                    <button onClick={this.removePlayer} className="remove">
                        <FontAwesomeIcon icon={faTimes} onClick={this.handleClick}/>
                    </button>
                </div>
                <div className={`bottom-list-space ${styles.bottomSpaceClass}`} style={styles.bottomSpaceStyle}></div>
            </li>
        );
    }
}
export default Player;