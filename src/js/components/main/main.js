import React from "react";
import { connect } from "react-redux";
import * as styles from "./main.scss";
//Custom Components
import Header from "components/global_components/header/header";
import Language from "components/global_components/language/changeLanguage";
import Login from "./login/login";
import Signup from "./signup/signup";
//Redux Actions
import { changeLanguage } from "actions/appActions";

const Main = (props) => {
  const handleLanguageChange = (language) => {
    props.changeLanguage(language);
  };

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <Language showName={false} onChange={handleLanguageChange} />
        {props.location.pathname === "/signup" ? <Signup /> : <Login />}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (language) => dispatch(changeLanguage(language)),
  };
};

export default connect(null, mapDispatchToProps)(Main);

