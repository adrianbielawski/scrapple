import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './imagePreview.scss';

const ImagePreview = (props) => {
    const getImage = () => {
        let image;

        if (props.profileImageURL) {
            image = <img className={styles.image} src={props.profileImageURL} />
        } else if (props.user.photoURL) {
            image = <img className={styles.image} src={props.user.photoURL} />
        } else {
            image = <FontAwesomeIcon icon={faUser} />
        }
        return image;
    }

    return (
        <div className={styles.imagePreview} onClick={props.onClick}>
            {getImage()}
        </div>
    );
}

export default ImagePreview;