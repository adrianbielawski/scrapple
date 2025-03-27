import React from "react";
import { connect } from "react-redux";
import * as styles from "./audioController.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
//Redux Actions
import { toggleAudio } from "actions/gameActions";

const AudioController = (props) => {
  const className = props.isAudioEnabled ? styles.on : "";

  return (
    <div
      className={`${styles.audioController} ${className}`}
      onClick={props.toggleAudio}
    >
      {props.isAudioEnabled ? (
        <FontAwesomeIcon icon={faVolumeUp} />
      ) : (
        <FontAwesomeIcon icon={faVolumeMute} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAudioEnabled: state.game.isAudioEnabled,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAudio: (isEnabled) => {
      dispatch(toggleAudio(isEnabled));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioController);

