import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import languages from './languages';
//Redux Actions
import { changeLanguage } from '../../../actions/appActions';

const Language = (props) => {
    const { t } = useTranslation();
    const [showLanguages, setShowLanguages] = useState(false);

    const toggleShowLanguages = () => {
        setShowLanguages(!showLanguages);
    };

    const handleLanguageChange = (e) => {
        const lang = e.currentTarget.lang
        setShowLanguages(!showLanguages);
        setTimeout(() => props.changeLanguage(lang), 100);
    };

    const getClass = () => {
        const langClass = showLanguages ? 'active' : null;
        return langClass;
    };
    
    return (
        <div className="choose-language" onClick={toggleShowLanguages}>
            <div className="current-lang">
                <img src={`../src/assets/img/${languages[props.language].flag}`}></img>
                {props.showName && <p>{t("Language")}</p>}
            </div>
            <div className={`languages ${getClass()}`}>
            {Object.entries(languages).map((lang, i) => {
                if(lang[0] === props.language) { return }
                return (
                    <div className={`language ${getClass()}`} onClick={(e) => handleLanguageChange(e)} lang={lang[1].symbol} key={i}>
                        <img src={`../src/assets/img/${lang[1].flag}`}></img>
                        {props.showName && <p>{lang[1].name}</p>}
                    </div>
                )
            })}
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
    changeLanguage: (language) => { dispatch(changeLanguage(language)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Language);