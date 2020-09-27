import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './twoLetterWords.scss';
//Custom components
import Button from 'components/global_components/button/button';
import ZoomableComponent from 'components/global_components/zoomable_component/zoomableComponent';
import WordsTable from './wordsTable';
//Redux Actions
import { toggleShowWords } from 'actions/gameActions';

const TwoLetterWords = (props) => {
    const { t } = useTranslation();
    const componentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState(null);
    const [isElementScrollable, setIsElementScrollable] = useState(null);
    const [isElementZoomable, setIsElementZoomable] = useState(null);
    let buttonName = props.showWords ? 'Hide two-letter words' : 'Show two-letter words';
    let wordsClass = props.showWords ? styles.active : '';

    useEffect(() => {
        if (props.showWords) {
            window.document.body.style.overscrollBehavior = 'contain';
        } else {
            window.document.body.style.overscrollBehavior = 'unset';
        }
    }, [props.showWords])

    useEffect(() => {
        const element = componentRef.current.getBoundingClientRect();
        setMaxHeight(props.screenHeight - element.y - 40);

        let scrollable = true;
        let zoomable = true

        if (props.isTouchDevice && props.deviceOrientation === 'portrait-primary') {
            scrollable = false;
        } else if (props.isTouchDevice && props.deviceOrientation === 'landscape-primary') {
            zoomable = false;
        }
        setIsElementScrollable(scrollable);
        setIsElementZoomable(zoomable);

    }, [props.screenHeight])

    const cx = classNames.bind(styles);
    const zoomableClass = cx({
        zoomable: true,
        scrollable: isElementScrollable,
        active: props.showWords,
    });

    return (
        <div className={styles.twoLetterWords} ref={componentRef}>
            <Button onClick={props.toggleShowWords} className={wordsClass}>
                {t(buttonName)}
            </Button>
            <ZoomableComponent
                isZoomable={isElementZoomable}
                className={zoomableClass}
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
        isTouchDevice: state.app.isTouchDevice,
        deviceOrientation: state.app.deviceOrientation,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleShowWords: (showWords) => { dispatch(toggleShowWords(showWords)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TwoLetterWords);