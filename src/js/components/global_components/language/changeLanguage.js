import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import languages from './languages';
//Custom components
import Language from './language';

const ChangeLanguage = (props) => {
    const { t } = useTranslation();
    const [showLanguages, setShowLanguages] = useState(false);

    const toggleShowLanguages = () => {
        setShowLanguages(!showLanguages);
    };

    const getLanguages = () => {
        const langs = Object.entries(languages).map((lang, i) => {
            if(lang[0] === props.language) { return }
            return (
                <Language showName={props.showName} lang={lang[1]} key={i} />
            )
        })
        return langs;
    }
    const langClass = showLanguages ? 'active' : null;
    
    return (
        <div className="choose-language" onClick={toggleShowLanguages}>
            <div className="current-lang">
                <img src={`../src/assets/img/${languages[props.language].flag}`}></img>
                {props.showName && <p>{t("Language")}</p>}
            </div>
            <div className={`languages ${langClass}`}>
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