import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './accountSettings.scss';
//Custom Components
import NewNameForm from './new_name_form/newNameForm';
import NewPasswordForm from './new_password_form/newPasswordForm';
import ProfileImageForm from './profile_image_form/profileImageForm';
//Redux actions
import { setShowAccountSettings, openNewNameModal, openNewPasswordModal,
    setShowChangeProfileImageModal } from 'actions/sideMenuActions';

const AccountSettings = (props) => {
    const { t } = useTranslation();
  
    const showAccountSettings = () => {
        props.setShowAccountSettings(!props.showAccountSettings);
    }
  
    const handleNewNameModal = () => {
        props.openNewNameModal();
    }
  
    const handleNewPasswordModal = () => {
        props.openNewPasswordModal(!props.showChangePasswordModal);
    }
  
    const handleChangeProfileImageModal = () => {
        props.setShowChangeProfileImageModal(!props.showChangeProfileImageModal);
    }

    return (
        <div className={styles.accountSettings}>
            <p className={styles.title} onClick={showAccountSettings}>{t("Account settings")}</p>
            <NewNameForm show={props.showNewNameModal} />
            <NewPasswordForm show={props.showNewPasswordModal} />
            <ProfileImageForm show={props.showChangeProfileImageModal} />
            <ul className={`${styles.settings} ${props.showAccountSettings && styles.showSettings}`}>
                <li><p onClick={handleNewNameModal}>{t("Change name")}</p></li>
                <li><p onClick={handleNewPasswordModal}>{t("Change password")}</p></li>
                <li><p onClick={handleChangeProfileImageModal}>{t("Change profile image")}</p></li>
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        showAccountSettings: state.sideMenu.showAccountSettings,
        showNewNameModal: state.sideMenu.showNewNameModal,
        showNewPasswordModal: state.sideMenu.showNewPasswordModal,
        showChangeProfileImageModal: state.sideMenu.showChangeProfileImageModal,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowAccountSettings: (showAccountSettings) => dispatch(setShowAccountSettings(showAccountSettings)),
        openNewNameModal: () => dispatch(openNewNameModal()),
        openNewPasswordModal: () => dispatch(openNewPasswordModal()),
        setShowChangeProfileImageModal: (showChangeProfileImageModal) => dispatch(setShowChangeProfileImageModal(showChangeProfileImageModal)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);