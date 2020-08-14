import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './twoLetterWords.scss';
//Custom components
import Button from 'components/global_components/button/button';
//Redux Actions
import { toggleShowWords } from 'actions/gameActions';

const TwoLetterWords = (props) => {
    const { t } = useTranslation();
    let buttonName = props.showWords ? 'Hide two-letter words' : 'Show two-letter words';
    let wordsClass = props.showWords ? styles.active : '';

    return (
        <div className={styles.twoLetterWords}>
            <Button onClick={props.toggleShowWords} className={wordsClass}>
                {t(buttonName)}
            </Button>
            <div className={`${styles.words} ${wordsClass}`} onClick={props.toggleShowWords}>
                <img src={`../../src/assets/img/two-letter-words-${props.language}.jpg`} />
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