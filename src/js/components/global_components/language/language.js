import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import languages from './languages';

const Language = (props) => {
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
                <img src={`../src/assets/img/${languages[props.currentLanguage].flag}`}></img>
                {props.showName && <p><Trans>Language</Trans></p>}
            </div>
            <div className={`languages ${getClass()}`}>
            {Object.entries(languages).map((lang, i) => {
                if(lang[0] === props.currentLanguage) { return }
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
export default Language;