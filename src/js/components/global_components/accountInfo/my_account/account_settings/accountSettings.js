import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './accountSettings.scss';
//Custom Components
import ChangeName from './change_name/changeName';
import ChangePassword from './change_password/changePassword';
//Redux actions
import { setShowAccountSettings, setShowChangeNameModal, setShowChangePasswordModal } from 'actions/sideMenuActions';

const AccountSettings = (props) => {
    const { t } = useTranslation();

    const closeModal = () => {
        props.setShowGameDetails(false);
        props.setGameDetails({})
    }
  
    const showAccountSettings = () => {
        props.setShowAccountSettings(!props.showAccountSettings);
    }
  
    const handleChangeNameModal = () => {
        props.setShowChangeNameModal(!props.showChangeNameModal);
    }
  
    const handleChangePasswordModal = () => {
        props.setShowChangePasswordModal(!props.showChangePasswordModal);
    }

    return (
        <div className={styles.accountSettings}>
            <p className={styles.title} onClick={showAccountSettings}>{t("Account settings")}</p>
            <ChangeName />
            <ChangePassword />
            <ul className={`${styles.settings} ${props.showAccountSettings && styles.showSettings}`}>
                <li><p onClick={handleChangeNameModal}>{t("Change name")}</p></li>
                <li><p onClick={handleChangePasswordModal}>{t("Change password")}</p></li>
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        showAccountSettings: state.sideMenu.showAccountSettings,
        showChangeNameModal: state.sideMenu.showChangeNameModal,
        showChangePasswordModal: state.sideMenu.showChangePasswordModal,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowAccountSettings: (showAccountSettings) => dispatch(setShowAccountSettings(showAccountSettings)),
        setShowChangeNameModal: (showChangeNameModal) => dispatch(setShowChangeNameModal(showChangeNameModal)),
        setShowChangePasswordModal: (showChangePasswordModal) => dispatch(setShowChangePasswordModal(showChangePasswordModal)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);