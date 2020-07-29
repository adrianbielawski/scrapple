import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../../styles/two-letter-words.scss';
//Redux Actions
import { toggleShowWords } from '../../actions/gameActions';

const TwoLetterWords = (props) => {
    const { t } = useTranslation();
    let buttonName = props.showWords ? 'Hide two-letter words' : 'Show two-letter words';
    let wordsClass = props.showWords ? 'active' : '';
    
    return (
        <div className="two-letter-words">
            <button onClick={props.toggleShowWords} className={wordsClass}>
                {t(buttonName)}
            </button>
            <div className={`words ${wordsClass}`} onClick={props.toggleShowWords}>
                <img src={`../../src/assets/img/two-letter-words-${props.language}.jpg`}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      language: state.app.language,
      showWords: state.game.showWords,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleShowWords: (showWords) => { dispatch(toggleShowWords(showWords)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TwoLetterWords);