import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
//Redux Actions

const UserName = (props) => {
  const { t } = useTranslation();

  return <p>{t("Logged in as", { 'name': props.username })}</p>;
}

const mapStateToProps = (state) => {
  return {
    username: state.app.user.username,
  }
}

export default connect(mapStateToProps)(UserName);