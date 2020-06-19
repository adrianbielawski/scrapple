import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const MenuHeader = (props) => {
    return (
        <div className="menu-header">
            <FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={props.toggleMenu} />
            <p className="title"><Trans>{props.title}</Trans></p>
        </div>
    );
}
 
export default MenuHeader;