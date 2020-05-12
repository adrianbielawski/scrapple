import React, { Component } from 'react';
import '../../../../src/css/word-checker.css'

export class WordChecker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            fetching: false,
            valid: false
        };
        this.timeout = null;
    }

    handleInputChange = () => {
        let word = this.refs.word.value;
        
        if (this.timeout) {
          clearTimeout(this.timeout);
        };

        this.timeout = setTimeout(
          () => this.checkWord(word),
          300,
        );
    }

    checkWord = (word) => {
        if (word.length < 2) {
            this.setState({fetching: false, valid: null });
            return;
        };
    
        this.setState({fetching: true, valid: null });        

        let url = '';
        let params = '';
        if(this.props.language === 'en') {
            url = 'https://burek.it/sowpods/';
            params = new URLSearchParams({
                word: word
            });
        } else {
            url = 'https://burek.it/osps/files/php/osps_funkcje2.php';
            params = new URLSearchParams({
                s: 'spr',
                slowo_arbiter2: word
            });
        };
        
        fetch(`${url}?${params.toString()}`).then(
            response => response.text()
        ).then(
            response => {
                this.setState({
                    fetching: false,
                    valid: response === '1' ? true : false,
                });
            }
        );
    }

    render() {
        let thumb = this.state.valid ? '../src/img/thumb-up.png' : '../src/img/thumb-down.png';
        const placeholder = this.props.language === 'en' ? 'Check your word' : 'Sprawdź słowo';
        return (
            <div className="word-checker">
                <input type="text" onChange={this.handleInputChange} ref="word" placeholder={placeholder} spellCheck="false" />
                <div className="resoult-img">
                    <img className="thumb" src={thumb}></img>
                </div>
            </div>
        );
    }
}