import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Moment from "react-moment"; // tslint:disable-line
import moment from "moment";
import * as styles from "./timeLimit.scss";
//Custom Components
import Switch from "@mui/material/Switch";
import Input from "components/global_components/input/input";
//Redux Actions
import { updateTimeLimit } from "actions/gameMenuActions";

const TIME_FORMAT = "HH:mm:ss";

const timeLimit = (props) => {
  const { t } = useTranslation();
  const { gameId } = useParams(null);
  const defaultTime = moment
    .duration(props.timeLimit, "seconds")
    .format(TIME_FORMAT, { trim: false });

  const toggleTimePicker = () => {
    if (props.showTimePicker) {
      props.updateTimeLimit(gameId, null);
    } else {
      props.updateTimeLimit(gameId, props.timeLimit);
    }
  };

  const handleTimeChange = (e) => {
    let val = e.target.value;
    let timeLimit = moment.duration(val).asSeconds();
    props.updateTimeLimit(gameId, timeLimit);
  };

  return (
    <div className={styles.timeLimit}>
      <div className={styles.wrapper}>
        <Switch
          onClick={toggleTimePicker}
          checked={props.showTimePicker}
        ></Switch>
        <p>{t("Player's time limit")}</p>
      </div>
      <Input
        type="time"
        className={props.showTimePicker ? styles.active : ""}
        onChange={handleTimeChange}
        defaultValue={defaultTime}
        step="1"
        required={props.showTimePicker}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showTimePicker: state.gameMenu.showTimePicker,
    timeLimit: state.gamePage.gameData.timeLimit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTimeLimit: (gameId, timeLimit) =>
      dispatch(updateTimeLimit(gameId, timeLimit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(timeLimit);

