import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './wordChecker.scss';
//Custom Components
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import fist from 'img/fist.png';
import thumbUp from 'img/thumb-up.png';
import thumbDown from 'img/thumb-down.png';

const WordChecker = (props) => {
    const { t } = useTranslation();
    const wordInput = useRef(null);
    const [word, setWord] = useState('');
    const [fetching, setFetching] = useState(false);
    const [valid, setValid] = useState(false);
    let timeout = null;

    const clearInput = () => {
        wordInput.current.value = null;
    }

    const handleInputChange = () => {
        let word = wordInput.current.value;
        setWord(word);

        if (timeout) {
            clearTimeout(timeout);
        };

        timeout = setTimeout(
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
        setFetching(true);
        setValid(null);

        let url = '';
        let params = '';
        if (props.language === 'en-GB') {
            url = 'https://burek.it/sowpods/';
            params = new URLSearchParams({
                word: word
            });
        } else if (props.language === 'pl-PL') {
            url = 'https://burek.it/osps/files/php/osps_funkcje2.php';
            params = new URLSearchParams({
                s: 'spr',
                slowo_arbiter2: word
            });
        };

        fetch(`${url}?${params.toString()}`).then(
            response => response.text()
        ).then(
            response => {
                setFetching(false);
                setValid(response === '1');
            }
        );
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

    return (
        <div className={styles.wordChecker}>
            <input type="text"
                onClick={clearInput}
                onChange={handleInputChange}
                ref={wordInput}
                placeholder={t("Check your word")}
                spellCheck="false" />
            <div className={`${styles.resoultImg} ${!props.timer || !props.admin ? styles.noAudio : ''}`}>
                {image}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        admin: state.app.admin,
        language: state.app.language,
        timer: state.timeLimit.timer,
    }
}
export default connect(mapStateToProps)(WordChecker);