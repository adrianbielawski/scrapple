import React from 'react';
//Custom Components
import GameId from '../../global_components/game-id';
import UserName from '../../global_components/accountInfo/userName';
import LogOut from '../../global_components/accountInfo/logOut';

const MenuContent = (props) => {
    return (
        <div className="menu-content">
            <UserName />
            <GameId />
            <LogOut />
        </div>
    );
}
 
export default MenuContent;