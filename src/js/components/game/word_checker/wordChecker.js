import React, { useRef, useState } from 'react';
import axiosInstance from 'axiosInstance';
import axios from 'axios';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './wordChecker.scss';
//Custom Components
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import Input from 'components/global_components/input/input';
//Assets
import fist from 'img/fist.png';
import thumbUp from 'img/thumb-up.png';
import thumbDown from 'img/thumb-down.png';

const WordChecker = (props) => {
    const { t } = useTranslation();
    const wordInput = useRef(null);
    const timeout = useRef(null);
    const cancelToken = useRef(null);
    const [word, setWord] = useState('');
    const [fetching, setFetching] = useState(false);
    const [valid, setValid] = useState(false);

    const clearInput = () => {
        setWord('');
        wordInput.current.value = null;
    }

    const handleInputChange = () => {
        let word = wordInput.current.value;
        setWord(word);

        if (timeout.current) {
            clearTimeout(timeout.current);
        };

        timeout.current = setTimeout(
            () => checkWord(word),
            300,
        );
    }

    const checkWord = (word) => {
        if (word.length < 2) {
            setValid(null);
            setFetching(false);
            return;
        };

        if (cancelToken.current) {
          cancelToken.current.cancel("Operation canceled due to new request.");
        }
        cancelToken.current = axios.CancelToken.source();

        setFetching(true);
        setValid(null);

        axiosInstance.get('words/check', {
            params: {
                word,
                language: props.language,
            },
            cancelToken: cancelToken.current.token,
        })
        .then(response => {
                setFetching(false);
                setValid(response.data.valid);
            }
        ).catch(err => {
            if (axios.isCancel(err)) {
              console.log(err.message);
            } else {
                dispatch(setAlert('alert', 'Something went wrong'));
            }
          });
    }

    const getImage = () => {
        let img = valid ? thumbUp : thumbDown;
        if (word.length === 0) {
            img = fist;
        }
        let image = <img className={styles.thumb} src={img}></img>;
        if (fetching) {
            image = <LoadingSpinner background={true} />
        }
        return image
    }

    const image = getImage();

    const cx = classNames.bind(styles);
    const imageClass = cx({
        resoultImg: true,
        noAudio: !props.gameData.timeLimit || props.user.id !== props.gameData.createdBy,
    });

    return (
        <div className={styles.wordChecker}>
            <Input type="text"
                onClick={clearInput}
                onChange={handleInputChange}
                ref={wordInput}
                placeholder={t("Check your word")}
                spellCheck="false"
                autoFocus />
            <div className={imageClass}>
                {image}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        gameData: state.gamePage.gameData,
        user: state.app.user,
    }
}
export default connect(mapStateToProps)(WordChecker);