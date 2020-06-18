import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Menu = (props) => {
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    return ( 
        <div className="menu-wrapper">
            <div className="img-wrapper">
                <img src="../src/assets/img/burger-menu-icon.png" onClick={toggleMenu}></img>
            </div>
            <div className={showMenu ? "content show" : "content"}>
                <div className="menu">
                    <div className="menu-header">
                        <FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={toggleMenu} />
                        <p className="title"><Trans>Menu</Trans></p>
                    </div>
                    <div className="menu-content" onClick={() => { return }}>
                        <p><Trans>Game ID</Trans>: <strong>{props.gameId}</strong></p>
                    </div>
                </div>
                <div className="background" onClick={toggleMenu}></div>
            </div>
        </div>
    );
}
 
export default Menu;