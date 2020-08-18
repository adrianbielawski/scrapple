import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { db } from 'firebaseConfig';
import styles from './menuContent.scss'
//Custom Components
import GameId from 'components/global_components/game_id/gameId';
import LogOut from 'components/global_components/accountInfo/logout';
import MyAccount from 'components/global_components/accountInfo/my_account/myAccount';
//Redux actions
import { setUserInfo, setFetchingUserInfo } from 'actions/sideMenuActions';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';

const MenuContent = (props) => {
    useEffect(() => {
        db.collection('users').doc(props.user.uid).get()
            .then((response) => {
                props.setUserInfo(response.data());
                props.setFetchingUserInfo(false);
            });
    }, [])

    return (
        props.fetchingUserInfo ? <LoadingSpinner background={false} /> : 
        <div className={styles.menuContent}>
            <LogOut className={styles.logout} />
            <MyAccount />
            <GameId />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        fetchingUserInfo: state.sideMenu.fetchingUserInfo,
        user: state.app.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserInfo: (userInfo) => dispatch(setUserInfo(userInfo)),
        setFetchingUserInfo: (fetchingUserInfo) => dispatch(setFetchingUserInfo(fetchingUserInfo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContent);