import React from 'react';
import { useTranslation } from 'react-i18next';
import { auth } from '../../../firebase';
//Redux Actions

const LogOut = (props) => {
    const { t } = useTranslation();

    const handleClick = () => {
        auth.signOut()
    }

    return ( <p className="log-out" onClick={handleClick}>{t("Logout")}</p> );
}

export default LogOut;