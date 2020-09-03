import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
//Redux Actions

const UserName = (props) => {
  const { t } = useTranslation();

  return <p>{t("Logged in as", { 'name': `${props.firstName} ${props.lastName}` })}</p>;
}

const mapStateToProps = (state) => {
  return {
    firstName: state.app.user.first_name,
    lastName: state.app.user.last_name,
  }
}

export default connect(mapStateToProps)(UserName);