import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { auth } from 'firebaseConfig';
import { auth } from '../../../../firebaseConfig';
//Redux Actions
import { clearAppState } from 'actions/appActions';

const LogOut = (props) => {
    const { t } = useTranslation();

    const handleClick = () => {
        auth.signOut().then(() => {
          props.clearAppState(props.language);
        })
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
    clearAppState: (language) => dispatch(clearAppState(language)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);