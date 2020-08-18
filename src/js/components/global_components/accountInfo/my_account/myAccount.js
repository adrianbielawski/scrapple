import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import styles from './myAccount.scss'
//Custom Components
import GamesHistory from './games_history/gamesHistory';
//Redux actions
import { setShowAccountInfo, setShowAccountSettings } from 'actions/sideMenuActions';

const MyAccount = (props) => {
    const { t } = useTranslation();
  
    const showMyAccount = () => {
        props.setShowAccountInfo(!props.showAccountInfo);
    }
  
    const showAccountSettings = () => {
        props.setShowAccountSettings(!props.showAccountSettings);
    }

    return (
        <div className={styles.myAccount}>
            <p className={styles.userName} onClick={showMyAccount}>{t("My account")}</p>
            <div className={`${styles.accountContent} ${props.showAccountInfo && styles.showContent}`}
                style={props.showGames && props.showAccountInfo ? {maxHeight: '200px'} : null}>
                <p onClick={showAccountSettings}>{t("Account settings")}</p>
                <GamesHistory />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        showAccountInfo: state.sideMenu.showAccountInfo,
        showGames: state.sideMenu.showGames,
        showAccountSettings: state.sideMenu.showAccountSettings,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowAccountInfo: (showAccountInfo) => dispatch(setShowAccountInfo(showAccountInfo)),
        setShowAccountSettings: (showAccountSettings) => dispatch(setShowAccountSettings(showAccountSettings)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);