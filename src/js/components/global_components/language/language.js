import React from 'react';
import { connect } from 'react-redux';
//Redux Actions
import { changeLanguage } from '../../../actions/appActions';
import { updateGameMenuData } from '../../../actions/gameMenuActions';

const Language = (props) => {
  const handleLanguageChange = () => {
    const language = props.lang.symbol;
    props.updateGameMenuData(props.gameId, {language})
    setTimeout(() => props.changeLanguage(language), 100);
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
      gameId: state.app.gameId,
      language: state.app.language,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (language) => dispatch(changeLanguage(language)),
    updateGameMenuData: (gameId, data) => dispatch(updateGameMenuData(gameId, data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Language);