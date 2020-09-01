import React, { useEffect, useRef, useState } from 'react';
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
    const componentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState(null);
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

    useEffect(() => {
        const element = componentRef.current.getBoundingClientRect();
        setMaxHeight(props.screenHeight - element.x - 10);
    }, [props.screenHeight])

    return (
        <div className={styles.twoLetterWords} ref={componentRef}>
            <Button onClick={props.toggleShowWords} className={wordsClass}>
                {t(buttonName)}
            </Button>
            <ZoomableComponent
                className={`${styles.zoomable} ${props.showWords ? styles.active : ''}`}
                style={props.showWords ? {maxHeight: `${maxHeight}px`} : {}}
            >
                <WordsTable />
            </ZoomableComponent>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        showWords: state.game.showWords,
        screenHeight: state.app.screenHeight,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleShowWords: (showWords) => { dispatch(toggleShowWords(showWords)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TwoLetterWords);