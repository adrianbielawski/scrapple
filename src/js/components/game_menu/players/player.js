import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMobileAlt, faSlash, faUserCog } from '@fortawesome/free-solid-svg-icons';
//Redux Actions
import { removePlayer, reorderPlayers, setGrabbedElement, setIsTransitionEnabled, setInitialListSpace, setListSpace, setTouches } from '../../../actions/gameMenuActions';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGrabbed: false,
            isTouchDevice: false,
            top: 0,
            left: 0,
            distance: 0,
        },
        this.element = React.createRef();
    }

    componentDidMount () {
        this.elementH = this.element.current.getBoundingClientRect().height;
    }

    handleGrab = (e) => {
        if(this.props.players.length === 1) {
            return;
        }
        if(e.type === 'touchstart') {
            if(this.props.touches > 0 && this.props.index !== this.props.grabbedElement) {
                this.props.setTouches(this.props.touches + 1)
                return
            }
            this.setState(state => ({ ...state, isTouchDevice: true}));
        };
        this.setGrabbedElement(this.props.index, e.type);
        
        const topStart =  this.props.index * this.elementH;
        
        let startX = e.clientX;
        let startY = e.clientY;
        if(e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }

        this.setState(state => ({ ...state, isGrabbed: true, top: topStart}));
        this.handleMove = () => {this.move(event, startX, startY, topStart)}
        if(e.type === 'mousedown') {
            window.addEventListener('mousemove', this.handleMove);
        }
        if(e.type === 'touchstart') {
            window.addEventListener('touchmove', this.handleMove);
        }
    }

    setGrabbedElement = (index, eType) => {
        eType === 'touchstart' && this.props.setTouches(this.props.touches + 1);
        this.props.setInitialListSpace(index -1);
        this.props.setListSpace(index -1);
        this.props.setGrabbedElement(index);        
    }

    move = (e, startX, startY, topStart) => {
        this.props.setIsTransitionEnabled(true);
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
            this.addSpace(distance);
        };
        this.setState(state => ({ ...state, top, left, distance}));
    }

    addSpace = (distance) => {
        let listSpace = this.props.initialListSpace + distance;
        if(this.props.grabbedElement <= listSpace) {
            listSpace +=1;
        };
        if(listSpace >= this.props.players.length) {
            listSpace = this.props.players.length -1;
        };
        if(this.props.grabbedElement === this.props.players.length -1 && listSpace >= this.props.players.length -2) {
            listSpace = this.props.players.length -2;
        };
        this.props.setListSpace(listSpace);
    }

    handleDrop = (e) => {
        this.props.setIsTransitionEnabled(false);
        if(this.props.touches > 0 && this.props.index !== this.props.grabbedElement) {
            this.props.setTouches(-1)
            return
        };
        
        window.removeEventListener('mousemove', this.handleMove);
        window.removeEventListener('touchmove', this.handleMove);
        
        this.addSpace(0);
        const event = e.type;
        this.drop(event);
        this.setState(state => ({ ...state, isGrabbed: false, top: 0, left: 0, distance: 0 }));
    }

    drop = (eType) => {
        let players = [ ...this.props.players];
        let newIndex = this.props.index + this.state.distance
        if(newIndex < 1) {
            newIndex = 0;
        } else if(newIndex >= players.length) {
            newIndex = players.length -1;
        }
        let touches = 0;
        if (eType === 'touchend') {
            touches = this.props.touches - 1;
        }
        
        this.props.reorderPlayers(this.props.index, newIndex);
        this.props.setInitialListSpace(null);
        this.props.setListSpace(null);
        this.props.setGrabbedElement(null);
        this.props.setTouches(touches);
    }

    removePlayerHandler = (e) => {
        e.preventDefault();
        this.removedPlayerTransition();
        setTimeout(this.remove, 500);
    }
    
    removedPlayerTransition = () => {
        const element = this.element.current;
        element.style.transitionProperty = 'width, max-height';
        element.style.transitionDuration = '.4s, .4s';
        element.style.transitionDelay = '0.1s, .4s';
        element.style.transitionTimingFunction = 'ease-in, ease';
        element.style.width = 0;
        element.style.maxHeight = 0;
    }

    remove = () => {
        this.element.current.style = {};
        this.props.removePlayer(this.props.index);
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

        if(this.props.grabbedElement != 0 && this.props.listSpace < 0 && this.props.index === 0
            || this.props.grabbedElement === 0 && this.props.listSpace < 0 && this.props.index === 1
            && !this.state.isGrabbed) {
                styles.topSpaceStyle = {height: this.elementH};
                styles.topSpaceClass = 'visible';
        } else if(this.props.index === this.props.listSpace && !this.state.isGrabbed) {
            styles.bottomSpaceStyle = {height: this.elementH}
            styles.bottomSpaceClass = 'visible';
        };

        if(!this.props.isTransitionEnabled && !this.state.isGrabbed) {
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

    getUserIcon = () => {
        const player = this.props.player;
        if (player.admin) {
            return (
                <div className="user-icon">
                    <FontAwesomeIcon icon={faUserCog} />
                </div>
            );
        } else if (!player.admin && player.uid) {
            return (
                <div className="user-icon">
                    <FontAwesomeIcon icon={faMobileAlt} />
                </div>
            );
        } else if (!player.admin && !player.uid) {
            return (
                <div className="fa-layers fa-fw user-icon">
                    <FontAwesomeIcon icon={faMobileAlt} />
                    <FontAwesomeIcon icon={faSlash} />
                </div>
            );
        }
    }

    render() {
        const styles = this.getStyles();

        return (
            <li className={`player ${styles.grabbed} ${styles.hover}`} style={styles.position} ref={this.element}>
                <div className={`top-list-space ${styles.topSpaceClass}`} style={styles.topSpaceStyle}></div>
                <div className="wrapper">
                    <div onMouseDown={this.handleGrab}
                        onMouseUp={this.handleDrop}
                        onTouchStart={this.handleGrab}
                        onTouchEnd={this.handleDrop}
                        className="player-name">
                        <p>{this.props.index + 1}: <span> {this.props.player.playerName}</span></p>
                    </div>
                        {this.getUserIcon()}
                    <button onClick={this.removePlayerHandler} className="remove">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className={`bottom-list-space ${styles.bottomSpaceClass}`} style={styles.bottomSpaceStyle}></div>
            </li>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        players: state.game.players,
        initialListSpace: state.gameMenu.players.initialListSpace,
        listSpace: state.gameMenu.players.listSpace,
        grabbedElement: state.gameMenu.players.grabbedElement,
        isTransitionEnabled: state.gameMenu.players.isTransitionEnabled,
        touches: state.gameMenu.players.touches,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reorderPlayers: (playerIndex, newIndex) => dispatch(reorderPlayers(playerIndex, newIndex)),
        removePlayer: (playerIndex) => dispatch(removePlayer(playerIndex)),
        setIsTransitionEnabled: (isTransitionEnabled) => dispatch(setIsTransitionEnabled(isTransitionEnabled)),
        setInitialListSpace: (initialListSpace) => dispatch(setInitialListSpace(initialListSpace)),
        setGrabbedElement: (grabbedElement) => dispatch(setGrabbedElement(grabbedElement)),
        setListSpace: (listSpace) => dispatch(setListSpace(listSpace)),
        setTouches: (touches) => dispatch(setTouches(touches)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Player));