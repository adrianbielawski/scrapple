import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../orderableList.scss';
//Contexts
import ItemContext from './itemContext';
import { ListContext } from '../listStore';

const ListItem = (props) => {
    const { state: listContext, onRemove } = useContext(ListContext);
    const element = useRef(null);
    const [itemRemoved, setItemRemoved] = useState(false);

    const { grabbedElement } = listContext;
    const isGrabbed = grabbedElement.index === props.index;

    const handleRemove = () => {
        setItemRemoved(true);
        setTimeout(() => onRemove(props.index), 500);
    }

    const getDynamicStyles = () => {
        if (grabbedElement.index === null) {
            return null;
        }

        let styles = {
            transform: props.transform && `translate(0px, ${grabbedElement.height}px)`,
        }
        
        if (isGrabbed) {
            styles = {
                ...styles, 
                top: grabbedElement.coords.top,
                left: grabbedElement.coords.left,
                width: grabbedElement.width,
            }
        }
        
        return styles;
    }

    const liClass = classNames(
        styles.item,
        props.className,
        isGrabbed && props.grabbedClassName,
        {
            [styles.removed]: itemRemoved,
            [styles.grabbed]: isGrabbed,
            [styles.transition]: props.transition,
            [styles.rightAnimation]: props.rightAnimation,
        }
    );

    const itemContext = {
        onRemove: handleRemove,
        element,
        index: props.index,
    }

    return (
        <ItemContext.Provider value={itemContext}>
            <li
                className={liClass}
                style={getDynamicStyles()}
                ref={element}
            >
                {props.children}
            </li>
        </ItemContext.Provider>
    );
}

ListItem.propTypes = {
    className: PropTypes.string,
    grabbedClassName: PropTypes.string,
    index: PropTypes.number.isRequired,
    rightAnimation: PropTypes.bool.isRequired,
    transition: PropTypes.bool.isRequired,
    transform: PropTypes.bool.isRequired,
}

export default ListItem;