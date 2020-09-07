import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMobileAlt, faSlash, faUserCog } from '@fortawesome/free-solid-svg-icons';
import styles from './player.scss';
//Custom components
import Button from 'components/global_components/button/button';
//Redux Actions
import { removePlayer, reorderPlayers, setGrabbedElement, setIsTransitionEnabled,
    setInitialListSpace, setListSpace, setTouches } from 'actions/gameMenuActions';
import { setAlert } from 'actions/appActions';

const Player = (props) => {
    const [isGrabbed, setIsGrabbed] = useState(false);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [distance, setDistance] = useState(0);
    const [elementH, setElementH] = useState(null);
    const element = useRef(null);
    const [moveData, setMoveData] = useState(null);

    useEffect(() => {
        setElementH(element.current.getBoundingClientRect().height);
    }, [])

    useEffect(() => {
        if (isGrabbed) {
            if (moveData.eType === 'mousedown') {
                window.addEventListener('mousemove', move);
            }
            if (moveData.eType === 'touchstart') {
                window.addEventListener('touchmove', move);
            }
        }
        
        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('touchmove', move);
        }
    }, [isGrabbed])

    const handleGrab = (e) => {
        if (props.players.length === 1) {
            return;
        }
        if (e.type === 'touchstart') {
            if (props.touches > 0 && props.index !== props.grabbedElement) {
                props.setTouches(props.touches + 1);
                return;
            }
        };
        setGrabbedElement(props.index, e.type);
        
        const topStart = props.index * elementH;

        let startX = e.clientX;
        let startY = e.clientY;
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }

        setIsGrabbed(true);
        setTop(topStart);
        setMoveData({ eType: e.type, startX, startY, topStart });
    }

    const setGrabbedElement = (index, eType) => {
        eType === 'touchstart' && props.setTouches(props.touches + 1);
        props.setInitialListSpace(index - 1);
        props.setListSpace(index - 1);
        props.setGrabbedElement(index);
    }

    const move = (e) => {
        props.setIsTransitionEnabled(true);
        let x = e.clientX;
        let y = e.clientY;
        if (e.type == 'touchmove') {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        };
        const newTop = y - moveData.startY + moveData.topStart;
        const newLeft = x - moveData.startX;
        let newDistance = (newTop - moveData.topStart) / elementH;
        newDistance = Math.round(newDistance);
        if (newDistance === -0) {
            newDistance = 0;
        };
        if (newDistance !== distance) {
            addSpace(newDistance);
        };
        setTop(newTop);
        setLeft(newLeft);
        setDistance(newDistance);
    }

    const addSpace = (distance) => {
        let listSpace = props.initialListSpace + distance;
        if (props.grabbedElement <= listSpace) {
            listSpace += 1;
        }
        if (listSpace >= props.players.length) {
            listSpace = props.players.length - 1;
        }
        if (props.grabbedElement === props.players.length - 1 && listSpace >= props.players.length - 2) {
            listSpace = props.players.length - 2;
        }
        props.setListSpace(listSpace);
    }

    const handleDrop = (e) => {
        if (props.players.length === 1) {
            return;
        }

        props.setIsTransitionEnabled(false);

        if (props.touches > 0 && props.index !== props.grabbedElement) {
            props.setTouches(-1)
            return
        }

        addSpace(0);

        let newIndex = props.index + distance
        if (newIndex < 1) {
            newIndex = 0;
        } else if (newIndex >= props.players.length) {
            newIndex = props.players.length - 1;
        }

        let touches = 0;
        if (e.type === 'touchend') {
            touches = props.touches - 1;
        }

        props.reorderPlayers(newIndex + 1, props.player.id);
        props.setInitialListSpace(null);
        props.setListSpace(null);
        props.setGrabbedElement(null);
        props.setTouches(touches);

        setIsGrabbed(false);
        setTop(0);
        setLeft(0);
        setDistance(0);
    }

    const removePlayerHandler = () => {
        if (props.player.user.id === props.adminId) {
            props.setAlert('alert', "You can't remove game admin")
            return;
        }
        removedPlayerTransition();
        setTimeout(remove, 500);
    }

    const removedPlayerTransition = () => {
        const el = element.current;
        el.style.transitionProperty = 'width, max-height';
        el.style.transitionDuration = '.4s, .4s';
        el.style.transitionDelay = '0.1s, .4s';
        el.style.transitionTimingFunction = 'ease-in, ease';
        el.style.width = 0;
        el.style.maxHeight = 0;
    }

    const remove = () => {
        element.current.style = {};
        props.removePlayer(props.player.id);
    }

    const getStyles = () => {
        let dynamicStyles = {
            topSpaceStyle: {},
            bottomSpaceStyle: {},
            topSpaceClass: '',
            bottomSpaceClass: '',
            grabbed: '',
            position: {},
            hover: 'no-touch-device'
        }

        if (props.grabbedElement != 0 && props.listSpace < 0 && props.index === 0
            || props.grabbedElement === 0 && props.listSpace < 0 && props.index === 1
            && !isGrabbed) {
            dynamicStyles.topSpaceStyle = { height: elementH };
            dynamicStyles.topSpaceClass = styles.visible;
        } else if (props.index === props.listSpace && !isGrabbed) {
            dynamicStyles.bottomSpaceStyle = { height: elementH }
            dynamicStyles.bottomSpaceClass = styles.visible;
        };

        if (!props.isTransitionEnabled && !isGrabbed) {
            dynamicStyles.bottomSpaceStyle.transition = 'none';
            dynamicStyles.topSpaceStyle.transition = 'none';
        };

        if (isGrabbed) {
            dynamicStyles.grabbed = styles.grabbed;
            dynamicStyles.position = {
                top: top,
                left: left
            };
        };
        if (props.isTouchDevice) {
            dynamicStyles.hover = '';
        };

        return dynamicStyles
    }

    const getUserIcon = () => {
        const player = props.player;
        const admin = player.user.id == props.adminId;
        
        if (admin) {
            return (
                <div className={styles.userIcon}>
                    <FontAwesomeIcon icon={faUserCog} />
                </div>
            );
        } else if (!admin && !player.user.isAnonymous) {
            return (
                <div className={styles.userIcon}>
                    <FontAwesomeIcon icon={faMobileAlt} />
                </div>
            );
        } else if (!admin && player.user.isAnonymous) {
            return (
                <div className={`fa-layers fa-fw ${styles.userIcon}`}>
                    <FontAwesomeIcon icon={faMobileAlt} />
                    <FontAwesomeIcon icon={faSlash} />
                </div>
            );
        }
    }

    const dynamicStyles = getStyles();

    return (
        <li
            className={`${styles.player} ${dynamicStyles.grabbed} ${dynamicStyles.hover}`}
            style={dynamicStyles.position} ref={element}
        >
            <div
                className={`${styles.topListSpace} ${dynamicStyles.topSpaceClass}`}
                style={dynamicStyles.topSpaceStyle}>
            </div>
            <div className={styles.wrapper}>
                <div
                    className={styles.playerNameWrapper}
                    onMouseDown={handleGrab}
                    onMouseUp={handleDrop}
                    onTouchStart={handleGrab}
                    onTouchEnd={handleDrop}
                >
                    <p className={styles.playerName}>
                        {props.index + 1}: <span> {props.player.user.username}</span>
                    </p>
                </div>
                {getUserIcon()}
                <Button onClick={removePlayerHandler} className={styles.remove}>
                    <FontAwesomeIcon icon={faTimes} />
                </Button>
            </div>
            <div
                className={`${styles.bottomListSpace} ${dynamicStyles.bottomSpaceClass}`}
                style={dynamicStyles.bottomSpaceStyle}>
            </div>
        </li>
    );
}

const mapStateToProps = (state) => {
    return {
        isTouchDevice: state.app.isTouchDevice,
        user: state.app.user,
        players: state.game.players,
        adminId: state.game.adminId,
        initialListSpace: state.gameMenu.players.initialListSpace,
        listSpace: state.gameMenu.players.listSpace,
        grabbedElement: state.gameMenu.players.grabbedElement,
        isTransitionEnabled: state.gameMenu.players.isTransitionEnabled,
        touches: state.gameMenu.players.touches,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reorderPlayers: (newIndex, id) => dispatch(reorderPlayers(newIndex, id)),
        removePlayer: (playerId) => dispatch(removePlayer(playerId)),
        setIsTransitionEnabled: (isTransitionEnabled) => dispatch(setIsTransitionEnabled(isTransitionEnabled)),
        setInitialListSpace: (initialListSpace) => dispatch(setInitialListSpace(initialListSpace)),
        setGrabbedElement: (grabbedElement) => dispatch(setGrabbedElement(grabbedElement)),
        setListSpace: (listSpace) => dispatch(setListSpace(listSpace)),
        setTouches: (touches) => dispatch(setTouches(touches)),
        setAlert: (type, messageKey, messageValue, action, alertProps) => dispatch(setAlert(type, messageKey, messageValue, action, alertProps)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);