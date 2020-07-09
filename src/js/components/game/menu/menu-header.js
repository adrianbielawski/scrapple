import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const MenuHeader = (props) => {
    const { t } = useTranslation();
    return (
        <div className="menu-header">
            <FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={props.toggleMenu} />
            <p className="title">{t(props.title)}</p>
        </div>
    );
}
 
export default MenuHeader;