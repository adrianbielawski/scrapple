import React from 'react';
import styles from './menuContent.scss'
//Custom Components
import GameId from 'components/global_components/game_id/gameId';
import UserName from 'components/global_components/accountInfo/userName';
import LogOut from 'components/global_components/accountInfo/logout';
import UserInfo from '../../../global_components/accountInfo/user_info/userInfo';

const MenuContent = (props) => {
    return (
        <div className={styles.menuContent}>
            <LogOut className={styles.logout} />
            <UserName />
            <GameId />
            <UserInfo />
        </div>
    );
}

export default MenuContent;