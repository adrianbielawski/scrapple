import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import styles from './myAccount.scss'
//Custom Components
import GamesHistory from './games_history/gamesHistory';
import AccountSettings from './account_settings/accountSettings';
import LogOut from 'components/global_components/accountInfo/logout';
//Redux actions
import { toggleMyAccount } from 'actions/sideMenuActions';

const MyAccount = (props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.myAccount}>
            <p className={styles.title} onClick={props.toggleMyAccount}>{t("My account")}</p>
            <div className={`${styles.accountContent} ${props.showMyAccount && styles.showContent}`}
                style={props.showGamesHistory && props.showMyAccount ? {maxHeight: '400px'} : null}>
                <AccountSettings />
                <GamesHistory />
                <LogOut className={styles.logout} />
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
        toggleMyAccount: () => dispatch(toggleMyAccount()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);