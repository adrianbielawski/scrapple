import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import '../../../css/two-letter-words.css';

export class TwoLetterWords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showWords: false,
        }
    }

    toggleShowWords = () => {
        this.props.toggleShowWords(!this.state.showWords);
        this.setState({showWords: !this.state.showWords});
    }

    render() {
        let buttonName = this.state.showWords ? <Trans>Hide two-letter words</Trans> : <Trans>Show two-letter words</Trans>;
        let wordsClass = this.state.showWords ? 'active' : '';
        const img = `../src/img/two-letter-words-${this.props.language}.jpg`;
        return (
            <div className="two-letter-words">
                <button onClick={this.toggleShowWords} className={wordsClass}>{buttonName}</button>
                <div className={`words ${wordsClass}`} onClick={this.toggleShowWords}>
                    <img src={img}/>
                </div>
            </div>
        );
    }
}