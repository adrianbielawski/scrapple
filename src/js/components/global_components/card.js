import React from 'react';

const Card = (props, ref) => {
    return (
        <div className={`card ${props.className}`} ref={ref}>
            {props.children}
        </div>
    );
}
 
export default React.forwardRef(Card);