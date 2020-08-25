import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './twoLetterWords.scss';
//Custom components
import Button from 'components/global_components/button/button';
import ZoomableComponent from '../../global_components/zoomable_component/zoomableComponent';
import WordsTable from './wordsTable';
//Redux Actions
import { toggleShowWords } from 'actions/gameActions';

const TwoLetterWords = (props) => {
    const { t } = useTranslation();
    let buttonName = props.showWords ? 'Hide two-letter words' : 'Show two-letter words';
    let wordsClass = props.showWords ? styles.active : '';

    useEffect(() => {
        if (props.showWords) {
            window.document.body.style.overscrollBehavior = 'contain';
        }
        if (!props.showWords) {
            window.document.body.style.overscrollBehavior = 'unset';
        }
    }, [props.showWords])

    return (
        <div className={styles.twoLetterWords}>
            <Button onClick={props.toggleShowWords} className={wordsClass}>
                {t(buttonName)}
            </Button>
            <ZoomableComponent className={`${styles.zoomable} ${props.showWords ? styles.active : ''}`}>
                <WordsTable />
            </ZoomableComponent>
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