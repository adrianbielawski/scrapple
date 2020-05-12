import React, { Component } from 'react';
import '../../../css/two-letter-words.css';

export class TwoLetterWords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showWords: false,
            buttonName: this.props.language === 'en' ? 'Show two-letter words' : 'Pokaż slowa dwuliterowe',
        }
    }

    getButtonName = () => {
        let buttonName;
        if (this.props.language === 'en') {
            buttonName = this.state.showWords ? 'Show two-letter words' : 'Hide two-letter words';
        } else {
            buttonName = this.state.showWords ? 'Pokaż slowa dwuliterowe' : 'Ukryj slowa dwuliterowe';
        };
        return buttonName
    }

    toggleShowWords = () => {
        const buttonName = this.getButtonName();
        this.props.toggleShowWords(!this.state.showWords);
        this.setState({showWords: !this.state.showWords, buttonName});
    }

    render() {
        let wordsClass = this.state.showWords ? 'active' : '';
        const img = `../src/img/two-letter-words-${this.props.language}.jpg`;
        return (
            <div className="two-letter-words">
                <button onClick={this.toggleShowWords} className={wordsClass}>{this.state.buttonName}</button>
                <div className={`words ${wordsClass}`} onClick={this.toggleShowWords}>
                    <img src={img}/>
                </div>
            </div>
        );
    }
}