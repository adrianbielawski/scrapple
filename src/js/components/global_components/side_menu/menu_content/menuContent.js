import React from 'react';
import { connect } from 'react-redux';
import styles from './menuContent.scss'
//Custom Components
import GameId from 'components/global_components/game_id/gameId';
import LogOut from 'components/global_components/accountInfo/logout';
import MyAccount from './my_account/myAccount';

const MenuContent = (props) => {
    return (
        <div className={styles.menuContent}>
            <LogOut className={styles.logout} />
            <MyAccount />
            {props.gameId && <GameId />}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        gameId: state.app.gameId,
    }
}

export default connect(mapStateToProps)(MenuContent);