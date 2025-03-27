import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "./accountInfo.scss";
//Redux Actions
import { logOut } from "actions/authActions";

const LogOut = (props) => {
  const { t } = useTranslation();

  const handleClick = () => {
    props.logOut();
  };

  return (
    <p className={`${styles.logout} ${props.className}`} onClick={handleClick}>
      {t("Logout")}
    </p>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.app.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);
