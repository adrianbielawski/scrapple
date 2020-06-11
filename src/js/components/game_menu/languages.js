import React, { Component } from 'react';
import { Trans } from 'react-i18next';

export class Languages extends Component {
    render() {
        return (
            <div className="choose-language" onClick={this.props.toggleShowLanguages}>
                <div className="current-lang">
                    <img src={`../src/img/${this.props.language}-flag.png`}></img>
                    <p><Trans>Language</Trans></p>
                </div>
                <div className={`languages ${this.props.languageClass}`}>
                    <div className="language" onClick={(e) => this.props.handleLanguageChange(e)} id="en-GB">
                        <img src="../src/img/en-GB-flag.png"></img>
                        <p>English</p>
                    </div>
                    <div className="language" onClick={(e) => this.props.handleLanguageChange(e)} id="pl-PL">
                        <img src="../src/img/pl-PL-flag.png"></img>
                        <p>Polski</p>
                    </div>
                </div>
            </div>
        );
    }
}