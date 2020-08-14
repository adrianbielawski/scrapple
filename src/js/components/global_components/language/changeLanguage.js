import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import languages from './languages';
import stylesH from './changeLanguageHorizontal.scss';
import stylesV from './changeLanguageVertical.scss';
//Custom components
import Language from './language';

const ChangeLanguage = (props) => {
    const { t } = useTranslation();
    const [showLanguages, setShowLanguages] = useState(false);
    const styles = props.vertical ? stylesV : stylesH;

    const toggleShowLanguages = () => {
        setShowLanguages(!showLanguages);
    };

    const getLanguages = () => {
        return Object.entries(languages).map((lang, i) => {
            if(lang[0] === props.language) { return }
            return (
                <Language showName={props.showName} lang={lang[1]} key={i} styles={styles} />
            )
        })
    }

    const langClass = showLanguages && `${styles.active}`;
    
    return (
        <div className={styles.changeLanguage} onClick={toggleShowLanguages}>
            <div className={styles.currentLanguage}>
                <img src={`../src/assets/img/${languages[props.language].flag}`}></img>
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

export default connect(mapStateToProps)(ChangeLanguage);