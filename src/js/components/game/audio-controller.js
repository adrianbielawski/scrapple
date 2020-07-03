import React from 'react';
import '../../../styles/audio-controller.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const AudioController = (props) => {
  const setVolume = () => {
    props.toggleAudio();
  }
  const className = props.isAudioEnabled ? 'on' : '';

  return (
    <div className={`audio-controller ${className}`} onClick={setVolume}>
      {props.isAudioEnabled ? <FontAwesomeIcon icon={faVolumeUp}/> : <FontAwesomeIcon icon={faVolumeMute}/>}
    </div>
  );
}
export default AudioController;