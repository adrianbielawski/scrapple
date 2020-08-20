import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { auth } from 'firebaseConfig';
import styles from './accountInfo.scss';
//Redux Actions
import { clearAppState, updateUserCurrentGame } from 'actions/appActions';

const LogOut = (props) => {
  const { t } = useTranslation();

  const handleClick = () => {
    props.updateUserCurrentGame(props.user.uid, null);
    auth.signOut().then(() => {
      props.clearAppState(props.language);
    });
  }

  return (<p className={`${styles.logout} ${props.className}`} onClick={handleClick}>{t("Logout")}</p>);
}

const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearAppState: (language) => dispatch(clearAppState(language)),
    updateUserCurrentGame: (uid, gameId) => dispatch(updateUserCurrentGame(uid, gameId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);