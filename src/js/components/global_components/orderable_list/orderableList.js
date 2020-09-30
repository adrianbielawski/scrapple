import React, { useReducer } from 'react';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import RemoveButton from './list_item/remove_button/removeButton';
import Grabbable from './list_item/grabbable/grabbable';
import List from './list';
//Contexts
import { ListContext, reducer, initialState } from './listStore';

export const OrderableList = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { children, ...rest } = props;

    const onDrop = (newPosition) => {
        let newItems = cloneDeep(props.items);
        newItems.splice(newPosition, 0, newItems.splice(state.grabbedElement.index, 1)[0]);

        Promise.resolve(
            props.onDrop(newPosition, props.items[state.grabbedElement.index], newItems)
        )
            .then(() => {
                dispatch({ type: 'CLEAR_STATE' });
            })
            .catch(e => console.log(e));
    }

    const onRemove = (index) => {
        let newItems = cloneDeep(props.items);
        newItems.splice(index, 1);
        
        props.onRemove(props.items[index], newItems);
    }

    const context = {
        state: {
            ...state,
            items: props.items,
        },
        dispatch,
        onDrop,
        onRemove,
    };

    return (
        <ListContext.Provider value={context}>
            <List {...rest}>{children}</List>
        </ListContext.Provider>
    );
};

OrderableList.defaultProps = {
    onRemove: () => { },
};

OrderableList.propTypes = {
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    grabbedItemClassName: PropTypes.string,
    rightAnimation: PropTypes.bool,
    items: PropTypes.array.isRequired,
    itemComponent: PropTypes.elementType.isRequired,
    onDrop: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
};

OrderableList.RemoveButton = RemoveButton;
OrderableList.Grabbable = Grabbable;

export default OrderableList;

