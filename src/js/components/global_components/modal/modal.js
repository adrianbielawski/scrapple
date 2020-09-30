import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import styles from './modal.scss';
//Custom components
import Card from '../card/card';

const Modal = (props) => {
    const [showCard, setShowCard] = useState(null);
    const [top, setTop] = useState(0);

    const updatePosition = () => {
        setTop(window.pageYOffset);
    }

    useEffect(() => {
        setShowCard(styles.show)
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition)
        }
    }, [])

    const cx = classNames.bind(styles);
    const modalClass = cx('modal', props.className);
    const cardClass = cx(
        'card',
        props.cardClassName,
        {
            [styles.show]: showCard
        }
    );

    return (
        props.show && ReactDOM.createPortal(
            <div className={modalClass} style={{ top }}>
                <div className={styles.wrapper}>
                    <Card className={`${styles.card} ${cardClass} ${props.cardClassName || ''}`}>
                        {props.children}
                    </Card>
                </div>
            </div>, document.body
        )
    );
}

export default Modal;