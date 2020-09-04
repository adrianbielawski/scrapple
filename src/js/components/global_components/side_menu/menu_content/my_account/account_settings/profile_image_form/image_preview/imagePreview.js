import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './imagePreview.scss';

const ImagePreview = (props) => {
    const getImage = () => {
        let image;

        if (props.image) {
            image = <img className={styles.image} src={URL.createObjectURL(props.image)} />
        } else if (props.user.image) {
            image = <img className={styles.image} src={props.user.image} />
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

const mapStateToProps = (state) => {
    return {
        user: state.app.user,
    }
}

export default connect(mapStateToProps)(ImagePreview);