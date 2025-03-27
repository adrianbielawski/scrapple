import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./addPlayer.scss";
//Custom components
import Button from "components/global_components/button/button";
import Input from "components/global_components/input/input";
//Redux Actions
import { addPlayer } from "actions/gameMenuActions";
import { setAlert } from "actions/appActions";

const AddPlayer = (props) => {
  const { t } = useTranslation();
  const { gameId } = useParams(null);
  const inputEl = useRef(null);

  const checkPlayers = (player) => {
    const lowNewPlayer = player.toLowerCase();
    const lowPlayers = props.players.map((p) => {
      return p.user.username.toLowerCase();
    });
    return lowPlayers.includes(lowNewPlayer);
  };

  const validatePlayerName = (player) => {
    let error = null;
    const isPlayerExists = checkPlayers(player);

    if (props.players.length >= 4) {
      error = ["Max 4 players"];
    }
    if (isPlayerExists) {
      error = ["Player exists", { player: player }];
    }
    if (player.length < 1) {
      error = ["Please type in player's name"];
    }

    return {
      valid: error === null,
      error,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const player = inputEl.current.value.trim();
    const { valid, error } = validatePlayerName(player);
    if (!valid) {
      props.setAlert("alert", ...error);
      return;
    }

    inputEl.current.value = "";
    props.addPlayer(player, gameId);
  };

  return (
    <div className={styles.addPlayer}>
      <p>{t("Add player")}</p>
      <div className={styles.form}>
        <Input
          type="text"
          autoComplete="false"
          spellCheck="false"
          maxLength="30"
          ref={inputEl}
        />
        <Button className={styles.add} onClick={handleSubmit}>
          <FontAwesomeIcon icon={faPlus} className="plus" />
        </Button>
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
    addPlayer: (playerName, gameId) => dispatch(addPlayer(playerName, gameId)),
    setAlert: (type, messageKey, messageValue, action, alertProps) =>
      dispatch(setAlert(type, messageKey, messageValue, action, alertProps)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);

