import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import styles from "./urlQrCode.scss";

const BASE_URL = process.env.API_URL;

const UrlQrCode = (props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.urlQrCode}>
      <p>{t("Show QR code to other players for easy join")}</p>
      <img
        src={`${BASE_URL}/games/${props.gameId}/qr.svg`}
        className={styles.qr}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    gameId: state.gamePage.gameData.id,
  };
};

export default connect(mapStateToProps)(UrlQrCode);
