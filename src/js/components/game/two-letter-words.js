import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import '../../../styles/two-letter-words.scss';

export class TwoLetterWords extends Component {
    render() {
        let buttonName = this.props.showWords ? 'Hide two-letter words' : 'Show two-letter words';
        let wordsClass = this.props.showWords ? 'active' : '';
        return (
            <div className="two-letter-words">
                <button onClick={this.props.toggleShowWords} className={wordsClass}>
                    <Trans>{buttonName}</Trans>
                </button>
                <div className={`words ${wordsClass}`} onClick={this.props.toggleShowWords}>
                    <img src={`../src/img/two-letter-words-${this.props.language}.jpg`}/>
                </div>
            </div>
        );
    }
}