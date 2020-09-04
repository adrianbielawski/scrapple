import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './accountSettings.scss';
//Custom Components
import NewNameForm from './new_name_form/newNameForm';
import NewPasswordForm from './new_password_form/newPasswordForm';
import ProfileImageForm from './profile_image_form/profileImageForm';
//Redux actions
import { toggleAccountSettings, openNewNameModal, openNewPasswordModal,
    openProfileImageModal } from 'actions/sideMenuActions';

const AccountSettings = (props) => {
    const { t } = useTranslation();
    return (
        <div className={styles.accountSettings}>
            <p className={styles.title} onClick={props.toggleAccountSettings}>{t("Account settings")}</p>
            <NewNameForm show={props.showNewNameModal} />
            <NewPasswordForm show={props.showNewPasswordModal} />
            <ProfileImageForm show={props.showProfileImageModal} />
            <ul className={`${styles.settings} ${props.showAccountSettings && styles.showSettings}`}>
                <li><p onClick={props.openNewNameModal}>{t("Change name")}</p></li>
                <li><p onClick={props.openNewPasswordModal}>{t("Change password")}</p></li>
                <li><p onClick={props.openProfileImageModal}>{t("Change profile image")}</p></li>
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        showAccountSettings: state.sideMenu.showAccountSettings,
        showNewNameModal: state.sideMenu.showNewNameModal,
        showNewPasswordModal: state.sideMenu.showNewPasswordModal,
        showProfileImageModal: state.sideMenu.showProfileImageModal,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleAccountSettings: () => dispatch(toggleAccountSettings()),
        openNewNameModal: () => dispatch(openNewNameModal()),
        openNewPasswordModal: () => dispatch(openNewPasswordModal()),
        openProfileImageModal: () => dispatch(openProfileImageModal()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);