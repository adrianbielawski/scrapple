import React from 'react';
import styles from './input.scss';

const Input = (props, ref) => <input className={styles.input} {...props} ref={ref} spellCheck="false" />;

export default React.forwardRef(Input);