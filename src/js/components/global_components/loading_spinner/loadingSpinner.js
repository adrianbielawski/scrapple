import React from 'react';
import styles from './loadingSpinner.scss'

const LoadingSpinner = (props) => <div className={`${styles.loader} ${!props.background && styles.noBackground}`}>Loading...</div>;

export default LoadingSpinner;