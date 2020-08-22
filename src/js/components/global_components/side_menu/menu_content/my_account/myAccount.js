import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import styles from './myAccount.scss'
//Custom Components
import GamesHistory from './games_history/gamesHistory';
//Redux actions
import { fetchUserInfo, setFetchingUserInfo, setShowAccountInfo, setShowAccountSettings } from 'actions/sideMenuActions';
import AccountSettings from './account_settings/accountSettings';

const MyAccount = (props) => {
    const { t } = useTranslation();
  
    const handleMyAccountClick = () => {
        if (!props.userInfo) {
            const userInfoPromise = props.fetchUserInfo(props.user.uid);
            userInfoPromise.then(() => {
                props.setFetchingUserInfo(false);
                props.setShowAccountInfo(!props.showAccountInfo);
            })
        } else {
            props.setShowAccountInfo(!props.showAccountInfo);
        }
    }

    return (
        <div className={styles.myAccount}>
            <p className={styles.title} onClick={handleMyAccountClick}>{t("My account")}</p>
            {!props.fetchingUserInfo && 
            <div className={`${styles.accountContent} ${props.showAccountInfo && styles.showContent}`}
                style={props.showGames && props.showAccountInfo ? {maxHeight: '400px'} : null}>
                <AccountSettings />
                <GamesHistory />
            </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        fetchingUserInfo: state.sideMenu.fetchingUserInfo,
        user: state.app.user,
        userInfo: state.sideMenu.userInfo,
        showAccountInfo: state.sideMenu.showAccountInfo,
        showGames: state.sideMenu.showGames,
        showAccountSettings: state.sideMenu.showAccountSettings,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserInfo: (uid) => dispatch(fetchUserInfo(uid)),
        setFetchingUserInfo: (fetchingUserInfo) => dispatch(setFetchingUserInfo(fetchingUserInfo)),
        setShowAccountInfo: (showAccountInfo) => dispatch(setShowAccountInfo(showAccountInfo)),
        setShowAccountSettings: (showAccountSettings) => dispatch(setShowAccountSettings(showAccountSettings)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);