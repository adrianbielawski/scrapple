import React from 'react';
import { connect } from 'react-redux';
import '../../../styles/audio-controller.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
//Redux Actions
import { toggleAudio } from '../../actions/gameActions';

const AudioController = (props) => {
  const className = props.isAudioEnabled ? 'on' : '';

  return (
    <div className={`audio-controller ${className}`} onClick={props.toggleAudio}>
      {props.isAudioEnabled ? <FontAwesomeIcon icon={faVolumeUp}/> : <FontAwesomeIcon icon={faVolumeMute}/>}
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      isAudioEnabled: state.game.isAudioEnabled,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAudio: (isEnabled) => { dispatch(toggleAudio(isEnabled)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioController);