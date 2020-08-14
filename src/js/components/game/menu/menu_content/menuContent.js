import React from 'react';
import styles from './menuContent.scss'
//Custom Components
import GameId from 'components/global_components/game_id/gameId';
import UserName from 'components/global_components/accountInfo/userName';
import LogOut from 'components/global_components/accountInfo/logout';

const MenuContent = (props) => {
    return (
        <div className={styles.menuContent}>
            <UserName />
            <GameId />
            <LogOut />
        </div>
    );
}

export default MenuContent;