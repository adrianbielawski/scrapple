import React from "react";
import { useTranslation } from "react-i18next";
import * as styles from "./playerSummary.scss";
//Custom Components
import Card from "components/global_components/card/card";
import place1st from "img/1st-place.png";
import place2nd from "img/2nd-place.png";
import place3rd from "img/3rd-place.png";

const PlayerSummary = (props) => {
  const { t } = useTranslation();

  const getImg = () => {
    const images = {
      1: place1st,
      2: place2nd,
      3: place3rd,
    };

    return <img src={images[props.place]}></img>;
  };

  const player = props.player;
  return (
    <li className={styles.playerSummary}>
      <Card className={styles.card}>
        <div className={styles.place}>
          <p>{t("place", { place: t(props.placeText) })}</p>
          {getImg()}
        </div>
        <p className={styles.playerName}>{player.user.username}</p>
        <p>{t("Score", { score: player.score })}</p>
        <p>{t("Best score", { best: player.bestScore })}</p>
      </Card>
    </li>
  );
};

export default PlayerSummary;

