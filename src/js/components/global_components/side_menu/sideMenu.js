import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './sideMenu.scss';
//Custom Components
import MenuContent from './menu_content/menuContent';
import MenuHeader from './menu_header/menuHeader';
//Redux Actions
import { toggleShowMenu } from 'actions/sideMenuActions';
import burgerIcon from "img/burger-menu-icon.png";

const SideMenu = (props) => {
    const cx = classNames.bind(styles);
    const menuClass = cx({
        content: true,
        show: props.showMenu,
    });
    const backgroundClass = cx({
        background: true,
        show: props.showMenu,
    });
    return (
        <div className={styles.menuWrapper}>
            <div className={`${styles.menuIcon} ${props.className}`}>
                <img src={burgerIcon} onClick={props.toggleShowMenu} className={styles.icon} />
            </div>
            <div className={menuClass}>
                <div className={styles.menu}>
                    <MenuHeader title="Menu" />
                    <MenuContent />
                </div>
                <div className={backgroundClass} onClick={props.toggleShowMenu}></div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        showMenu: state.sideMenu.showMenu,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleShowMenu: () => dispatch(toggleShowMenu()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);