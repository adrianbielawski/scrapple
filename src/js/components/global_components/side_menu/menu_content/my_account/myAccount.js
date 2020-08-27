import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import styles from './myAccount.scss'
//Custom Components
import GamesHistory from './games_history/gamesHistory';
import AccountSettings from './account_settings/accountSettings';
//Redux actions
import { setShowMyAccount } from 'actions/sideMenuActions';

const MyAccount = (props) => {
    const { t } = useTranslation();
  
    const handleMyAccountClick = () => {
        props.setShowMyAccount(!props.showMyAccount);
    }

    return (
        <div className={styles.myAccount}>
            <p className={styles.title} onClick={handleMyAccountClick}>{t("My account")}</p>
            <div className={`${styles.accountContent} ${props.showMyAccount && styles.showContent}`}
                style={props.showGamesHistory && props.showMyAccount ? {maxHeight: '400px'} : null}>
                <AccountSettings />
                <GamesHistory />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        showMyAccount: state.sideMenu.showMyAccount,
        showGamesHistory: state.sideMenu.showGamesHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowMyAccount: (showMyAccount) => dispatch(setShowMyAccount(showMyAccount)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);