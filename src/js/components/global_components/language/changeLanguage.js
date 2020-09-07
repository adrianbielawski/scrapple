import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import languages from './languages';
import stylesH from './changeLanguageHorizontal.scss';
import stylesV from './changeLanguageVertical.scss';
//Custom components
import Language from './language';
//Redux Actions
import { changeLanguage } from 'actions/appActions';


const ChangeLanguage = (props) => {
    const { t } = useTranslation();
    const { gameId } = useParams(null);
    const [showLanguages, setShowLanguages] = useState(false);
    const styles = props.vertical ? stylesV : stylesH;

    const toggleShowLanguages = () => {
        setShowLanguages(!showLanguages);
    };

    const handleLanguageChange = (lang) => {
        setTimeout(() => props.changeLanguage(lang, gameId), 100);
    }

    const getLanguages = () => {
        return Object.entries(languages).map((lang, i) => {
            if (lang[0] === props.language) {
                return;
            }

            const onClick = useCallback(
                () => handleLanguageChange(lang[1].symbol),
                [lang[1].symbol]
            )
            
            return (
                <Language
                    showName={props.showName}
                    lang={lang[1]}
                    onClick={onClick}
                    key={i}
                    styles={styles}
                />
            );
        });
    }

    const langClass = showLanguages && `${styles.active}`;

    return (
        <div className={styles.changeLanguage} onClick={toggleShowLanguages}>
            <div className={styles.currentLanguage}>
                <Language
                    showName={false}
                    lang={languages[props.language]}
                    styles={styles}
                />
                {props.showName && <p>{t("Language")}</p>}
            </div>
            <div className={`${styles.languages} ${langClass}`}>
                {getLanguages()}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: (language, gameId) => dispatch(changeLanguage(language, gameId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLanguage);