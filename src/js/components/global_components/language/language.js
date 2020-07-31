import React from 'react';
import { connect } from 'react-redux';
//Redux Actions
import { changeLanguage } from '../../../actions/appActions';

const Language = (props) => {
  const handleLanguageChange = () => {
    const lang = props.lang.symbol;
    setTimeout(() => props.changeLanguage(lang), 100);
  }  
    return (
        <div className={`language`} onClick={handleLanguageChange} lang={props.lang.symbol}>
            <img src={`../src/assets/img/${props.lang.flag}`}></img>
            {props.showName && <p>{props.lang.name}</p>}
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