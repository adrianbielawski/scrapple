import React, { Component } from 'react';
import i18next from 'i18next';
import '../../../styles/word-checker.scss'
//Custom Components
import LoadingSpinner from '../global_components/loadingSpinner'
import Menu from './menu/menu';

const IMAGES = {
    fist: '../src/assets/img/fist.png',
    thumbUp: '../src/assets/img/thumb-up.png',
    thumbDown: '../src/assets/img/thumb-down.png'
}

class WordChecker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            fetching: false,
            valid: false
        };
        this.timeout = null;
    }

    clearInput = (e) => {
        e.target.value = '';
    }

    handleInputChange = () => {
        let word = this.refs.word.value;
        this.setState(state => ({ ...state, word }));
        
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
            this.setState(state => ({ ...state, fetching: false, valid: null }));
            return;
        };
    
        this.setState(state => ({ ...state, fetching: true, valid: null })); 

        let url = '';
        let params = '';
        if(this.props.language === 'en-GB') {
            url = 'https://burek.it/sowpods/';
            params = new URLSearchParams({
                word: word
            });
        } else if(this.props.language === 'pl-PL') {
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
                this.setState(state => ({ ...state, fetching: false, valid: response === '1' ? true : false }));
            }
        );
    }

    render() {
        let img = this.state.valid ? IMAGES.thumbUp : IMAGES.thumbDown ;
        if(this.state.word.length === 0) {
            img = IMAGES.fist;
        }
        let image = <img className="thumb" src={img}></img>;
        if(this.state.fetching) {
            image = <LoadingSpinner />
        }
        
        return (
            <div className="word-checker">
                <div className="wrapper">
                    <Menu gameId={this.props.gameId}/>
                    <input type="text"
                        onClick={this.clearInput}
                        onChange={this.handleInputChange}
                        ref="word"
                        placeholder={i18next.t("Check your word")}
                        spellCheck="false" />
                </div>
                <div className="resoult-img">
                    {image}
                </div>
            </div>
        );
    }
}
export default WordChecker;