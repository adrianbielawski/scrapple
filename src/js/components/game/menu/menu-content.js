import React from 'react';
import GameId from './game-id';

const MenuContent = (props) => {
    return (
        <div className="menu-content">
            <GameId gameId={props.gameId} />
        </div>
    );
}
 
export default MenuContent;