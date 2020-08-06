import React from 'react';
//Custom Components
import GameId from './game-id';
import UserName from '../../global_components/accountInfo/userName';

const MenuContent = (props) => {
    return (
        <div className="menu-content">
            <UserName />
            <GameId />
        </div>
    );
}
 
export default MenuContent;