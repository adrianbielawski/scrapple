import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './menuContent.scss'
//Custom Components
import GameId from 'components/global_components/game_id/gameId';
import MyAccount from './my_account/myAccount';
import QuitGame from './quit_game/quitGame';

const MenuContent = (props) => {
    const { gameId } = useParams();
    
    return (
        <div className={styles.menuContent}>
            {gameId && <GameId />}
            {!props.admin && gameId ? <QuitGame /> : null}
            <MyAccount />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        admin: state.app.admin,
    }
}

export default connect(mapStateToProps)(MenuContent);