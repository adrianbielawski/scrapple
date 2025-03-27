import React from "react";
import * as styles from "./accountInfo.scss";
//Custom Components
import LogOut from "./logout";
import UserName from "./userName";

const AccountInfo = (props) => {
  return (
    <div className={styles.accountInfo}>
      <UserName />
      <LogOut />
    </div>
  );
};

export default AccountInfo;

