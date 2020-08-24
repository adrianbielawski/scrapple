import React from 'react';
import styles from './header.scss';
import logo from "img/logo.jpg";

const Header = () => <h1 className={styles.header}><img src={logo}></img></h1>;

export default Header;