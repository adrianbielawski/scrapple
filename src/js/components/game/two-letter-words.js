import React from 'react';
import { Trans } from 'react-i18next';
import '../../../styles/two-letter-words.scss';

const TwoLetterWords = (props) => {
    let buttonName = props.showWords ? 'Hide two-letter words' : 'Show two-letter words';
    let wordsClass = props.showWords ? 'active' : '';
    return (
        <div className="two-letter-words">
            <button onClick={props.toggleShowWords} className={wordsClass}>
                <Trans>{buttonName}</Trans>
            </button>
            <div className={`words ${wordsClass}`} onClick={props.toggleShowWords}>
                <img src={`../../src/assets/img/two-letter-words-${props.language}.jpg`}/>
            </div>
        </div>
    );
}
export default TwoLetterWords;