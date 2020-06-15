import React from 'react';

const Dropdown = (props) => {
    return (
        <div className={`dropdown ${props.className}`}>
            <div className="card">
                {props.children}
            </div>
        </div>
    );
}
 
export default Dropdown;