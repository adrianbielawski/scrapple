import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './accountSettings.scss';
//Custom Components
import ChangeName from './change_name/changeName';
import ChangePassword from './change_password/changePassword';
//Redux actions
import { setShowAccountSettings, setShowChangeNameModal, setShowChangePasswordModal,
    setShowChangeProfileImageModal } from 'actions/sideMenuActions';
import ChangeProfileImage from './change_profile_image/changeProfileImage';

const AccountSettings = (props) => {
    const { t } = useTranslation();
  
    const showAccountSettings = () => {
        props.setShowAccountSettings(!props.showAccountSettings);
    }
  
    const handleChangeNameModal = () => {
        props.setShowChangeNameModal(!props.showChangeNameModal);
    }
  
    const handleChangePasswordModal = () => {
        props.setShowChangePasswordModal(!props.showChangePasswordModal);
    }
  
    const handleChangeProfileImageModal = () => {
        props.setShowChangeProfileImageModal(!props.showChangeProfileImageModal);
    }

    return (
        <div className={styles.accountSettings}>
            <p className={styles.title} onClick={showAccountSettings}>{t("Account settings")}</p>
            <ChangeName show={props.showChangeNameModal} />
            <ChangePassword show={props.showChangePasswordModal} />
            <ChangeProfileImage show={props.showChangeProfileImageModal} />
            <ul className={`${styles.settings} ${props.showAccountSettings && styles.showSettings}`}>
                <li><p onClick={handleChangeNameModal}>{t("Change name")}</p></li>
                <li><p onClick={handleChangePasswordModal}>{t("Change password")}</p></li>
                <li><p onClick={handleChangeProfileImageModal}>{t("Change profile image")}</p></li>
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        showAccountSettings: state.sideMenu.showAccountSettings,
        showChangeNameModal: state.sideMenu.showChangeNameModal,
        showChangePasswordModal: state.sideMenu.showChangePasswordModal,
        showChangeProfileImageModal: state.sideMenu.showChangeProfileImageModal,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowAccountSettings: (showAccountSettings) => dispatch(setShowAccountSettings(showAccountSettings)),
        setShowChangeNameModal: (showChangeNameModal) => dispatch(setShowChangeNameModal(showChangeNameModal)),
        setShowChangePasswordModal: (showChangePasswordModal) => dispatch(setShowChangePasswordModal(showChangePasswordModal)),
        setShowChangeProfileImageModal: (showChangeProfileImageModal) => dispatch(setShowChangeProfileImageModal(showChangeProfileImageModal)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);