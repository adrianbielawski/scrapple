import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './player.scss';
//Custom components
import Button from 'components/global_components/button/button';
import UserIcon from 'components/global_components/user_icon/userIcon';
//Redux Actions
import { removePlayer, playerTouched, playerUntouched,
    playerGrabbed, playerMoved, playerDropped } from 'actions/gameMenuActions';
import { setAlert } from 'actions/appActions';

const SCROLL_STEP = 1;

const Player = (props) => {
    const element = useRef(null);
    const playerNameWrapperRef = useRef(null);
    const scrollInterval = useRef(null);
    const [isGrabbed, setIsGrabbed] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const [distance, setDistance] = useState(0);
    const [elementH, setElementH] = useState(null);
    const [moveData, setMoveData] = useState(null);
    const [playerRemoved, setPlayerRemoved] = useState(null);
    const [scrollStep, setScrollStep] = useState(null);
    const [initialTopOffset, setInitialTopOffset] = useState(0);
    const [topOffset, setTopOffset] = useState(0);

    const doScroll = () => {
        if (scrollStep > 0 && window.innerHeight + window.pageYOffset >= document.body.clientHeight) {
            return;
        }
        if (scrollStep < 0 && window.pageYOffset <= 0) {
            return;
        }
        
        window.scrollBy({
            left: 0,
            top: scrollStep,
        });
    }

    const updateTopOffset = () => {
        setTopOffset(window.pageYOffset);
    }
    
    const move = (e) => {
        let x = e.clientX;
        let y = e.clientY;
        if (e.type === 'touchmove') {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        };

        let scrollStep = null;
        if (y >= window.innerHeight - elementH * .8) {
            scrollStep = SCROLL_STEP;
        } else if (y <= elementH * .8) {
            scrollStep = -SCROLL_STEP;
        }
        
        const newTop = y - moveData.startY + moveData.topStart;
        const newLeft = x - moveData.startX;

        let newDistance = (newTop + topOffset - initialTopOffset - moveData.topStart) / elementH;
        newDistance = Math.round(newDistance);
        if (newDistance === -0) {
            newDistance = 0;
        };
        
        setDistance(newDistance);
        setCoords({ top: newTop, left: newLeft });
        setScrollStep(scrollStep);

        const placeholder = getPlaceholder(newDistance);
        props.playerMoved(placeholder);
    };

    useEffect(() => {
        if (scrollStep !== null && !scrollInterval.current) {
            scrollInterval.current = setInterval(doScroll, 5);
        }
        return () => {
            clearInterval(scrollInterval.current);
            scrollInterval.current = null;
        }
    }, [scrollStep, scrollInterval.current])

    useEffect(() => {
        setElementH(element.current.getBoundingClientRect().height);
    }, [])

    useEffect(() => {
        if (isGrabbed) {
            window.document.body.style.overscrollBehavior = 'contain';
            window.addEventListener('scroll', updateTopOffset);
            
            if (props.isTouchDevice) {
                window.addEventListener('touchmove', move);
            } else {
                window.addEventListener('mousemove', move);
            }
        }
        
        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('touchmove', move);
            window.removeEventListener('scroll', updateTopOffset);
            window.document.body.style.overscrollBehavior = 'unset';
        }
    }, [isGrabbed, move])

    useEffect(() => {
        playerNameWrapperRef.current.addEventListener('touchstart', handleGrab, {passive: false});
        playerNameWrapperRef.current.addEventListener('touchend', handleDrop);
        playerNameWrapperRef.current.addEventListener('mousedown', handleGrab);
        playerNameWrapperRef.current.addEventListener('mouseup', handleDrop);

        return () => {
            playerNameWrapperRef.current.removeEventListener('touchstart', handleGrab, {passive: false});
            playerNameWrapperRef.current.removeEventListener('touchend', handleDrop);
            playerNameWrapperRef.current.removeEventListener('mousedown', handleGrab);
            playerNameWrapperRef.current.removeEventListener('mouseup', handleDrop);
        }
    }, [elementH])

    const handleGrab = (e) => {
        e.preventDefault();

        if (props.players.length === 1) {
            return;
        }
        if (props.isTouchDevice) {
            if (props.touches > 0 && props.position !== props.grabbedElement) {
                props.playerTouched();
                return;
            }
        };
        
        const topStart = props.position * elementH;

        let startX = e.clientX;
        let startY = e.clientY;
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }

        setInitialTopOffset(window.pageYOffset);
        setTopOffset(window.pageYOffset);
        setIsGrabbed(true);
        setCoords({ top: topStart, left: coords.left });
        setMoveData({ startX, startY, topStart });
        props.playerGrabbed(props.position);
    }

    const getPlaceholder = (newDistance) => {
        let placeholder = props.grabbedElement - 1 + newDistance;

        if (props.grabbedElement <= placeholder) {
            placeholder += 1;
        }
        if (placeholder >= props.players.length) {
            placeholder = props.players.length - 1;
        }
        if (props.grabbedElement === props.players.length - 1 && placeholder >= props.players.length - 2) {
            placeholder = props.players.length - 2;
        }

        return placeholder;
    }

    const handleDrop = () => {
        if (props.players.length === 1) {
            return;
        }

        if (props.touches > 0 && props.position !== props.grabbedElement) {
            props.playerUntouched();
            return;
        }

        let newPosition = props.position + distance
        if (newPosition < 1) {
            newPosition = 0;
        } else if (newPosition >= props.players.length) {
            newPosition = props.players.length - 1;
        }

        const dropPlayerPromise = props.playerDropped(newPosition, props.player.id);
        dropPlayerPromise.then(() => {
            setIsGrabbed(false);
            setCoords({ top: 0, left: 0 });
            setDistance(0);
            setInitialTopOffset(0);
            setTopOffset(0);
            setScrollStep(null);
            if (scrollInterval.current) {
                clearInterval(scrollInterval.current);
                scrollInterval.current = null;
            }
        })
    }

    const handleRemovePlayer = () => {
        if (props.player.user.id === props.adminId) {
            props.setAlert('alert', "You can't remove game admin");
            return;
        }
        setPlayerRemoved(true);
        setTimeout(remove, 500);
    }

    const remove = () => {
        element.current.style = {};
        props.removePlayer(props.player.id);
    }

    const getStyles = () => {
        let dynamicStyles = {
            topPlaceholderStyle: {},
            bottomPlaceholderStyle: {},
            topPlaceholderVisible: false,
            bottomPlaceholderVisible: false,
            position: {},
        }

        if (props.grabbedElement != 0 && props.placeholder < 0 && props.position === 0
            || props.grabbedElement === 0 && props.placeholder < 0 && props.position === 1
            && !isGrabbed) {
            dynamicStyles.topPlaceholderStyle = { height: elementH };
            dynamicStyles.topPlaceholderVisible = true;
        } else if (props.position === props.placeholder && !isGrabbed) {
            dynamicStyles.bottomPlaceholderStyle = { height: elementH };
            dynamicStyles.bottomPlaceholderVisible = true;
        };

        if (isGrabbed) {
            dynamicStyles.position = {
                top: coords.top + topOffset - initialTopOffset,
                left: coords.left
            };
        };

        return dynamicStyles;
    }

    const dynamicStyles = getStyles();

    const cx = classNames.bind(styles);
    const liClass = cx({
        player: true,
        removed: playerRemoved,
        grabbed: isGrabbed,
    });
    const topPlaceholderClass = cx({
        topPlaceholder: true,
        visible: dynamicStyles.topPlaceholderVisible,
        noTransition: !props.isTransitionEnabled && !isGrabbed,
    });
    const bottomPlaceholderClass = cx({
        bottomPlaceholder: true,
        visible: dynamicStyles.bottomPlaceholderVisible,
        noTransition: !props.isTransitionEnabled && !isGrabbed,
    });

    return (
        <li className={liClass} style={dynamicStyles.position} ref={element}>
            <div className={topPlaceholderClass} style={dynamicStyles.topPlaceholderStyle}></div>
            <div className={styles.wrapper}>
                <div className={styles.playerNameWrapper} ref={playerNameWrapperRef} >
                    <p className={styles.playerName}>
                        {props.position + 1}: <span> {props.player.user.username}</span>
                    </p>
                    <UserIcon player={props.player} className={styles.userIcon} />
                </div>
                {props.player.user.id !== props.adminId &&
                <Button onClick={handleRemovePlayer} className={styles.remove}>
                    <FontAwesomeIcon icon={faTimes} />
                </Button>
                }
            </div>
            <div className={bottomPlaceholderClass} style={dynamicStyles.bottomPlaceholderStyle}></div>
        </li>
    );
}

const mapStateToProps = (state) => {
    return {
        isTouchDevice: state.app.isTouchDevice,
        user: state.app.user,
        players: state.game.players,
        adminId: state.game.adminId,
        placeholder: state.gameMenu.players.placeholder,
        grabbedElement: state.gameMenu.players.grabbedElement,
        isTransitionEnabled: state.gameMenu.players.isTransitionEnabled,
        touches: state.gameMenu.players.touches,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removePlayer: (playerId) => dispatch(removePlayer(playerId)),
        playerGrabbed: (position) => dispatch(playerGrabbed(position)),
        playerMoved: (placeholder) => dispatch(playerMoved(placeholder)),
        playerDropped: (newPosition, id) => dispatch(playerDropped(newPosition, id)),
        setListSpace: (placeholder) => dispatch(setListSpace(placeholder)),
        playerTouched: () => dispatch(playerTouched()),
        playerUntouched: () => dispatch(playerUntouched()),
        setAlert: (type, messageKey, messageValue, action, alertProps) => dispatch(
            setAlert(type, messageKey, messageValue, action, alertProps)
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);