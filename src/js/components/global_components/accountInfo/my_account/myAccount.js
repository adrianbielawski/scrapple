import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { db } from 'firebaseConfig';
import styles from './myAccount.scss'
//Custom Components
import GamesHistory from './games_history/gamesHistory';
//Redux actions
import { setUserInfo, setFetchingUserInfo, setShowAccountInfo, setShowAccountSettings } from 'actions/sideMenuActions';

const MyAccount = (props) => {
    const { t } = useTranslation();
  
    const showMyAccount = () => {
        if (!props.userInfo) {
            db.collection('users').doc(props.user.uid).get()
                .then((response) => {
                    let data = response.data();
                    const allGames = data.allGames;
                    let reversedAllGames = [];
                    for (let i = 0; i < allGames.length; i++) {
                        reversedAllGames.unshift(allGames[i]);
                    }
                    data.allGames = reversedAllGames;

                    props.setUserInfo(data);
                    props.setFetchingUserInfo(false);
                    props.setShowAccountInfo(!props.showAccountInfo);
                })
        } else {
            props.setShowAccountInfo(!props.showAccountInfo);
        }
    }
  
    const showAccountSettings = () => {
        props.setShowAccountSettings(!props.showAccountSettings);
    }

    return (
        <div className={styles.myAccount}>
            <p className={styles.userName} onClick={showMyAccount}>{t("My account")}</p>
            {!props.fetchingUserInfo && 
            <div className={`${styles.accountContent} ${props.showAccountInfo && styles.showContent}`}
                style={props.showGames && props.showAccountInfo ? {maxHeight: '300px'} : null}>
                <p onClick={showAccountSettings}>{t("Account settings")}</p>
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
        setUserInfo: (userInfo) => dispatch(setUserInfo(userInfo)),
        setFetchingUserInfo: (fetchingUserInfo) => dispatch(setFetchingUserInfo(fetchingUserInfo)),
        setShowAccountInfo: (showAccountInfo) => dispatch(setShowAccountInfo(showAccountInfo)),
        setShowAccountSettings: (showAccountSettings) => dispatch(setShowAccountSettings(showAccountSettings)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);