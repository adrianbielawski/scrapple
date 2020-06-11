import React from 'react';
import { Trans } from 'react-i18next';

export const Languages = (props) => {
    return (
        <div className="choose-language" onClick={props.toggleShowLanguages}>
            <div className="current-lang">
                <img src={`../src/assets/img/${props.language}-flag.png`}></img>
                <p><Trans>Language</Trans></p>
            </div>
            <div className={`languages ${props.languageClass}`}>
                <div className="language" onClick={(e) => props.handleLanguageChange(e)} id="en-GB">
                    <img src="../src/assets/img/en-GB-flag.png"></img>
                    <p>English</p>
                </div>
                <div className="language" onClick={(e) => props.handleLanguageChange(e)} id="pl-PL">
                    <img src="../src/assets/img/pl-PL-flag.png"></img>
                    <p>Polski</p>
                </div>
            </div>
        </div>
    );
}