import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "./subtractPoints.scss";
//Custom Components
import PlayerSubPoints from "./player_subtract_points/playerSubtractPoints";
import Header from "components/global_components/header/header";
import Button from "components/global_components/button/button";
//Redux Actions
import { setAlert } from "actions/appActions";
import { subPoints } from "actions/subtractPointsActions";
import { every } from "lodash";

const SubtractPoints = (props) => {
  const { t } = useTranslation();
  const [points, setPoints] = useState({});
  const { gameId } = useParams(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateUserInputs();

    if (isValid) {
      props.subPoints(gameId, points);
    } else {
      props.setAlert("alert", "Points value must be positive integer");
    }
  };

  const validateUserInputs = () => {
    return every(points, (point) => {
      const p = parseFloat(point);
      return Number.isInteger(p) && p >= 0;
    });
  };

  const getPlayers = () => {
    return props.players.map((player) => {
      const onChange = (e) =>
        setPoints({
          ...points,
          [player.id]: e.target.value || 0,
        });
      return (
        <PlayerSubPoints
          playerName={player.user.username}
          key={player.id}
          onChange={onChange}
        />
      );
    });
  };

  return (
    <div className={styles.subtractPoints}>
      <Header />
      <h2>{t("Subtract points of unused letters")}</h2>
      <div>
        <ul className={styles.players}>{getPlayers()}</ul>
        <Button onClick={handleSubmit}>{t("Continue")}</Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.gamePage.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (type, messageKey, messageValue, action, alertProps) =>
      dispatch(setAlert(type, messageKey, messageValue, action, alertProps)),
    subPoints: (gameId, points) => dispatch(subPoints(gameId, points)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubtractPoints);
