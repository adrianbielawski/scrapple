import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import classNames from "classnames/bind";
import styles from "./myAccount.scss";
//Custom Components
import GamesHistory from "./games_history/gamesHistory";
import AccountSettings from "./account_settings/accountSettings";
//Redux actions
import { toggleMyAccount } from "actions/sideMenuActions";

const MyAccount = (props) => {
  const { t } = useTranslation();

  const cx = classNames.bind(styles);
  const accountContentClass = cx({
    accountContent: true,
    showContent: props.showMyAccount,
  });

  return (
    <div className={styles.myAccount}>
      <p className={styles.title} onClick={props.toggleMyAccount}>
        {t("My account")}
      </p>
      <div className={accountContentClass}>
        <AccountSettings />
        <GamesHistory />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showMyAccount: state.sideMenu.showMyAccount,
    showGamesHistory: state.sideMenu.showGamesHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMyAccount: () => dispatch(toggleMyAccount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
