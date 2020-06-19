import React, { useState, useEffect } from 'react';
import Card from './card';

const Dropdown = (props) => {
    const [cardClass, setCardClass] = useState(null)
    useEffect(() => {
        setCardClass('show')
    }, [])
    return (
        <div className={`dropdown ${props.className}`}>
            <Card className={cardClass}>
                {props.children}
            </Card>
        </div>
    );
}
 
export default Dropdown;