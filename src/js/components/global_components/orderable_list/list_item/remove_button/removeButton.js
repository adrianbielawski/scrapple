import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ItemContext from '../itemContext';

const Button = (props) => {
    const itemContext = useContext(ItemContext);

    return (
        <button onClick={itemContext.onRemove} {...props}>
            {props.children}
        </button>
    )
}

Button.propTypes = {
    className: PropTypes.string,
}

export default Button;