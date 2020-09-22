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
    playerGrabbed, dropPlayer, playerMoved } from 'actions/gameMenuActions';
import { setAlert } from 'actions/appActions';

const Player = (props) => {
    const element = useRef(null);
    const [isGrabbed, setIsGrabbed] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const [distance, setDistance] = useState(0);
    const [elementH, setElementH] = useState(null);
    const [moveData, setMoveData] = useState(null);
    const [playerRemoved, setPlayerRemoved] = useState(null)

    useEffect(() => {
        setElementH(element.current.getBoundingClientRect().height);
    }, [])

    useEffect(() => {
        if (isGrabbed) {
            window.document.body.style.overscrollBehavior = 'contain';
            
            if (props.isTouchDevice) {
                window.addEventListener('touchmove', move);
            } else {
                window.addEventListener('mousemove', move);
            }
        }
        
        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('touchmove', move);
            window.document.body.style.overscrollBehavior = 'unset';
        }
    }, [isGrabbed])

    const handleGrab = (e) => {
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
        if (props.isTouchDevice) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }

        setIsGrabbed(true);
        setCoords({ top: topStart, left: coords.left });
        setMoveData({ startX, startY, topStart });
        props.playerGrabbed(props.position, e.type);
    }

    const move = (e) => {            
        let x = e.clientX;
        let y = e.clientY;
        if (props.isTouchDevice) {
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

        let placeholder = props.placeholder;
        if (newDistance !== distance) {
            placeholder = getPlaceholder(newDistance);
        };

        setCoords({ top: newTop, left: newLeft });
        setDistance(newDistance);
        props.playerMoved(placeholder);
    }

    const getPlaceholder = (distance) => {
        let placeholder = props.initialPlaceholder + distance;
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

        const dropPlayerPromise = props.dropPlayer(newPosition, props.player.id);
        dropPlayerPromise.then(() => {
            setIsGrabbed(false);
            setCoords({ top: 0, left: 0 })
            setDistance(0);
        })
    }

    const handleRemovePlayer = () => {
        if (props.player.user.id === props.adminId) {
            props.setAlert('alert', "You can't remove game admin")
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
                top: coords.top,
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
        initialPlaceholder: state.gameMenu.players.initialPlaceholder,
        placeholder: state.gameMenu.players.placeholder,
        grabbedElement: state.gameMenu.players.grabbedElement,
        isTransitionEnabled: state.gameMenu.players.isTransitionEnabled,
        touches: state.gameMenu.players.touches,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removePlayer: (playerId) => dispatch(removePlayer(playerId)),
        playerGrabbed: (index, eType) => dispatch(playerGrabbed(index, eType)),
        playerMoved: (placeholder) => dispatch(playerMoved(placeholder)),
        dropPlayer: (newPosition, id) => dispatch(dropPlayer(newPosition, id)),
        setListSpace: (placeholder) => dispatch(setListSpace(placeholder)),
        playerTouched: () => dispatch(playerTouched()),
        playerUntouched: () => dispatch(playerUntouched()),
        setAlert: (type, messageKey, messageValue, action, alertProps) => dispatch(
            setAlert(type, messageKey, messageValue, action, alertProps)
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);