import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Card from '../card/card';
import styles from './modal.scss';

const Modal = (props) => {
    const [cardClass, setCardClass] = useState(null);
    useEffect(() => {
        setCardClass(styles.show)
    }, []);
    return (
        props.show && ReactDOM.createPortal(
        <div className={`${styles.modal} ${props.className ? props.className : ''}`}>
            <div className={styles.wrapper}>
                <Card className={`${styles.card} ${cardClass}`}>
                    {props.children}
                </Card>
            </div>
        </div>, document.body)
    );
}

export default Modal;