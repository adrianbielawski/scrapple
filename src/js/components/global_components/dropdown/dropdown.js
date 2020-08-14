import React, { useState, useEffect } from 'react';
import Card from '../card/card';
import styles from './dropdown.scss';

const Dropdown = (props) => {
    const [cardClass, setCardClass] = useState(null);
    useEffect(() => {
        setCardClass(styles.show)
    }, []);
    return (
        <div className={`${styles.dropdown} ${props.className}`}>
            <Card className={`${styles.card} ${cardClass}`}>
                {props.children}
            </Card>
        </div>
    );
}
 
export default Dropdown;