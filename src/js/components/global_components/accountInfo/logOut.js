import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { auth } from '../../../../firebase';
//Redux Actions
import { clearUser, clearAppState } from '../../../actions/appActions';

const LogOut = (props) => {
    const { t } = useTranslation();

    const handleClick = () => {
        auth.signOut();
        props.clearAppState(props.language);
    }

    return ( <p className="log-out" onClick={handleClick}>{t("Logout")}</p> );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearUser: () => dispatch(clearUser()),
    clearAppState: (language) => dispatch(clearAppState(language)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);