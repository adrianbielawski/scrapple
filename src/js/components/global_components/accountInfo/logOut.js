import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { auth } from '../../../../firebase';
//Redux Actions
import { clearUser } from '../../../actions/appActions';

const LogOut = (props) => {
    const { t } = useTranslation();

    const handleClick = () => {
        auth.signOut();
        props.clearUser();
    }

    return ( <p className="log-out" onClick={handleClick}>{t("Logout")}</p> );
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearUser: () => { dispatch(clearUser()) },
  }
}

export default connect(null, mapDispatchToProps)(LogOut);