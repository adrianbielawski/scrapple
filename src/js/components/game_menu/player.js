import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index,
            isHovered: false,
            isGrabbed: false,
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
        const element = document.getElementsByClassName('player')[this.props.index];
        const elementH = element.getBoundingClientRect().height;
        this.setState({element, elementH});
    }

    toggleHover = (e) => {
        this.setState({isHovered: !this.state.isHovered});
    }

    handleGrab = (e) => {
        if(this.props.isOtherGrabbed) {
            this.props.setTouches(1);
            return
        };
        this.props.setGrabbedElement(this.state.index);
        
        const parent = document.getElementsByClassName('players')[0];
        const parentD = parent.getBoundingClientRect();
        parent.style.height = `${parentD.height}px`;
        
        const elementD = this.state.element.getBoundingClientRect();
        const elementH = elementD.height;
        
        const topStart =  elementD.y - parentD.y;
        
        let startX = e.clientX;
        let startY = e.clientY;
        if(e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }

        this.setState({isGrabbed: true, top: topStart, topStart, startX, elementH});
        this.handleMove = () => {this.move(event, startX, startY, elementH, topStart)}
        e.currentTarget.addEventListener('mousemove', this.handleMove);
        e.currentTarget.addEventListener('touchmove', this.handleMove);
    }

    move = (e, startX, startY, elementH, topStart) => {
        this.props.toggelTransition(true);
        let x = e.clientX;
        let y = e.clientY;
        if(e.type == 'touchmove') {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        };
        const top = y - startY + topStart;
        const left = x - startX;
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
        this.props.toggelTransition(false);
        if(this.props.isOtherGrabbed) {
            this.props.setTouches(-1)
            return
        };
        e.currentTarget.removeEventListener('mousemove', this.handleMove);
        e.currentTarget.addEventListener('touchmove', this.handleMove);
        
        let parent = document.getElementsByClassName('players')[0];
        parent.style.height = `auto`;
        
        this.props.handleSpace(0);
        this.props.handleDrop(this.state.index, this.state.distance);
        this.setState({isGrabbed: false, top: 0, left: 0, distance: 0, startX: 0});
    }

    removePlayer = (e) => {
        e.preventDefault();
        this.removedPlayerTransition();
        setTimeout(this.remove, 500);
    }
    
    removedPlayerTransition = () => {
        const element = this.state.element;
        element.style.transitionProperty = 'width, max-height';
        element.style.transitionDuration = '.4s, .4s';
        element.style.transitionDelay = '0.1s, .4s';
        element.style.transitionTimingFunction = 'ease-in, ease';
        element.style.width = 0;
        element.style.maxHeight = 0;
        this.setState({isHovered: false})
    }

    remove = () => {
        this.state.element.style = {};
        this.props.removePlayer(this.state.index);
    }

    getStyles = () => {
        let styles = {
            topDivStyle: {},
            bottomDivStyle: {},
            topSpaceClassName: '',
            bottomSpaceClassName: '',
            classNameGrabbed: '',
            position: {},
            classNameHovered: this.state.isHovered ? 'hovered' : '',
        }

        if(this.props.topSpace && !this.state.isGrabbed) {
            styles.topDivStyle = {height: this.state.elementH};
            styles.topSpaceClassName = 'visible';
        } else if(this.props.bottomSpace && !this.state.isGrabbed) {
            styles.bottomDivStyle = {height: this.state.elementH}
            styles.bottomSpaceClassName = 'visible';
        };

        if(!this.props.isTransitionEnableed && !this.state.isGrabbed) {
            styles.bottomDivStyle.transition = 'none'
            styles.topDivStyle.transition = 'none'
        }

        if(this.state.isGrabbed) {
            styles.classNameGrabbed = 'grabbed'
            styles.position = {
                top: this.state.top,
                left: this.state.left
            }
        }

        return styles
    }

    render() {
        const styles = this.getStyles();
        
        return (
            <li className={`player ${styles.classNameGrabbed} ${styles.classNameHovered}`} style={styles.position}>
                <div className={`top-list-space ${styles.topSpaceClassName}`} style={styles.topDivStyle}></div>
                <div className="wrapper">
                    <div onMouseOver={this.toggleHover} onMouseOut={this.toggleHover} onMouseDown={this.handleGrab} onMouseUp={this.handleDrop} onTouchStart={this.handleGrab} onTouchEnd={this.handleDrop} className="player-name">
                        <Trans>Player</Trans> {this.props.index + 1}: <span>{this.props.player}</span>
                    </div>
                    <button onClick={this.removePlayer} className="remove">
                        <FontAwesomeIcon icon={faTimes} onClick={this.handleClick}/>
                    </button>
                </div>
                <div className={`bottom-list-space ${styles.bottomSpaceClassName}`} style={styles.bottomDivStyle}></div>
            </li>
        );
    }
}