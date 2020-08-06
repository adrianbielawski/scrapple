import React from 'react';
import '../../../styles/loadingSpinner.scss'

const LoadingSpinner = (props) => <div className={`loader ${!props.background && 'no-background'}`}>Loading...</div>;

export default LoadingSpinner;