import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./addPointsForm.scss";
//Custom Components
import Button from "components/global_components/button/button";
import Input from "components/global_components/input/input";
//Redux Actions
import { addPoints } from "actions/gameActions";

const AddPointsForm = (props) => {
  const { t } = useTranslation();
  const pointsInput = useRef(null);

  useEffect(() => {
    if (props.gameData.timePausedBy === props.user.id) {
      pointsInput.current.focus();
    }
  }, [props.gameData.timePausedBy]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let points = parseInt(pointsInput.current.value, 10);
    e.target.reset();

    props.addPoints(points, props.players[props.gameData.currentPlayer].id);
  };

  const cx = classNames.bind(styles);
  const addPointsClass = cx({
    addPoints: true,
    active:
      props.gameData.timePausedBy === props.user.id ||
      !props.gameData.timeLimit,
  });

  return (
    <form className={addPointsClass} onSubmit={handleSubmit}>
      <Input
        type="number"
        placeholder={t("Add points")}
        ref={pointsInput}
        min="0"
        max="999"
        required
      />
      <Button type="submit" className={styles.confirm}>
        <FontAwesomeIcon icon={faCheck} />
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    gameData: state.gamePage.gameData,
    players: state.gamePage.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPoints: (points, playerId) => dispatch(addPoints(points, playerId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(AddPointsForm));
