import React from 'react';
import { connect } from 'react-redux';
import styles from './sideMenu.scss';
//Custom Components
import MenuContent from './menu_content/menuContent';
import MenuHeader from './menu_header/menuHeader';
//Redux Actions
import { toggleShowMenu } from 'actions/sideMenuActions';
import burgerIcon from "img/burger-menu-icon.png";

const SideMenu = (props) => {
    return (
        <div className={styles.menuWrapper}>
            <div className={`${styles.menuIcon} ${props.className}`}>
                <img src={burgerIcon} onClick={props.toggleShowMenu}></img>
            </div>
            <div className={props.showMenu ? `${styles.content} ${styles.show}` : styles.content}>
                <div className={styles.menu}>
                    <MenuHeader title="Menu" />
                    <MenuContent />
                </div>
                <div className={props.showMenu ? `${styles.background} ${styles.show}` : styles.background} onClick={props.toggleShowMenu}></div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        gameId: state.app.gameId,
        showMenu: state.sideMenu.showMenu,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleShowMenu: () => { dispatch(toggleShowMenu()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);