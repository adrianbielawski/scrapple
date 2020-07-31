import React from 'react';
import { connect } from 'react-redux';
//Custom Components
import MenuContent from './menu-content';
import MenuHeader from './menu-header';
//Redux Actions
import { toggleShowMenu } from '../../../actions/gameActions';

const Menu = (props) => {
    return ( 
        <div className="menu-wrapper">
            <div className="menu-icon">
                <img src="../../src/assets/img/burger-menu-icon.png" onClick={props.toggleShowMenu}></img>
            </div>
            <div className={props.showMenu ? "content show" : "content"}>
                <div className="menu">
                    <MenuHeader title="Menu" />
                    <MenuContent />
                </div>
                <div className={props.showMenu ? "background show" : "background"} onClick={props.toggleShowMenu}></div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      gameId: state.app.gameId,
      showMenu: state.game.showMenu,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleShowMenu: () => { dispatch(toggleShowMenu()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);