import React, { useState } from 'react';
import MenuContent from './menu-content';
import MenuHeader from './menu-header';

const Menu = (props) => {
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    return ( 
        <div className="menu-wrapper">
            <div className="menu-icon">
                <img src="../src/assets/img/burger-menu-icon.png" onClick={toggleMenu}></img>
            </div>
            <div className={showMenu ? "content show" : "content"}>
                <div className="menu">
                    <MenuHeader title="Menu" toggleMenu={toggleMenu} />
                    <MenuContent gameId={props.gameId} />
                </div>
                <div className={showMenu ? "background show" : "background"} onClick={toggleMenu}></div>
            </div>
        </div>
    );
}
 
export default Menu;