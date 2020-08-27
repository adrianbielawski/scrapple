import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import styles from './myAccount.scss'
//Custom Components
import GamesHistory from './games_history/gamesHistory';
import AccountSettings from './account_settings/accountSettings';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
//Redux actions
import { fetchGamesHistory, setFetchingGamesHistory, setShowMyAccount } from 'actions/sideMenuActions';

const MyAccount = (props) => {
    const { t } = useTranslation();
    const [showSpinner, setShowSpinner] = useState(false);
  
    const handleMyAccountClick = () => {
        if (props.fetchingGamesHistory) {
            setShowSpinner(true);
            const userInfoPromise = props.fetchGamesHistory(props.user.uid);
            userInfoPromise.then(() => {
                props.setShowMyAccount(!props.showMyAccount);
                setShowSpinner(false);
            })
        } else {
            props.setShowMyAccount(!props.showMyAccount);
        }
    }

    return (
        <div className={styles.myAccount}>
            <div className={styles.title}>
                <p onClick={handleMyAccountClick}>{t("My account")}</p>
                {showSpinner && <LoadingSpinner size={20} />}
            </div>
            {!props.fetchingGamesHistory && 
            <div className={`${styles.accountContent} ${props.showMyAccount && styles.showContent}`}
                style={props.showGamesHistory && props.showMyAccount ? {maxHeight: '400px'} : null}>
                <AccountSettings />
                <GamesHistory />
            </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        fetchingGamesHistory: state.sideMenu.fetchingGamesHistory,
        user: state.app.user,
        userInfo: state.app.userInfo,
        showMyAccount: state.sideMenu.showMyAccount,
        showGamesHistory: state.sideMenu.showGamesHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGamesHistory: (uid) => dispatch(fetchGamesHistory(uid)),
        setFetchingGamesHistory: (fetchingGamesHistory) => dispatch(setFetchingGamesHistory(fetchingGamesHistory)),
        setShowMyAccount: (showMyAccount) => dispatch(setShowMyAccount(showMyAccount)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);