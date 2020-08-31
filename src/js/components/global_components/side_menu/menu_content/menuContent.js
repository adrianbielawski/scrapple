import React from 'react';
import { connect } from 'react-redux';
import styles from './menuContent.scss'
//Custom Components
import GameId from 'components/global_components/game_id/gameId';
import LogOut from 'components/global_components/accountInfo/logout';
import MyAccount from './my_account/myAccount';
import QuitGame from './quit_game/quitGame';

const MenuContent = (props) => {
    return (
        <div className={styles.menuContent}>
            <LogOut className={styles.logout} />
            {!props.admin && <QuitGame />}
            <MyAccount />
            {props.gameId && <GameId />}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        admin: state.app.admin,
    }
}

export default connect(mapStateToProps)(MenuContent);