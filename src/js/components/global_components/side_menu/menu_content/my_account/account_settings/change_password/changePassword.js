import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './changePassword.scss';
//Custom Components
import Modal from 'components/global_components/modal/modal';
import Button from 'components/global_components/button/button';
import Input from 'components/global_components/input/input';
//Redux actions
import { setShowChangePasswordModal } from 'actions/sideMenuActions';
import { setAlert } from 'actions/appActions';

const ChangePassword = (props) => {
    const { t } = useTranslation();
    const [newPassword, setNewPassword] = useState(null);
    const [repeatPassword, setRepeatPassword] = useState(null);
    const newPasswordInput = useRef(null);
    const repeatPasswordInput = useRef(null);
    
    const handleNewPasswordChange = () => {
        setNewPassword(newPasswordInput.current.value);
    }
    
    const handleRepeatPasswordChange = () => {
        setRepeatPassword(repeatPasswordInput.current.value);
    }

    const validateUserInput = () => {
        if (!newPassword) {
            props.setAlert('alert', "Please enter new password");
            return false;
        }

        if (!repeatPassword) {
            props.setAlert('alert', "Please repeat new password");
            return false;
        }

        if (newPassword !== repeatPassword) {
            props.setAlert('alert', "Passwords doesn't match");
            return false;
        }
        return true;
    }

    const handleSubmit = () => {
        const isValid = validateUserInput();
        if (!isValid) {
            return;
        }
        props.setAlert('confirm', 'Are you sure you want to change your password', null, 'change-password', newPassword);

        newPasswordInput.current.value = null;
        repeatPasswordInput.current.value = null;
        setNewPassword(null);
        setRepeatPassword(null);
    }

    const closeModal = () => {
        props.setShowChangePasswordModal(false);
    }

    return (
        <Modal show={props.show}>
            <div className={styles.changePassword}>
                <Input className={styles.input} type="password"
                    autoComplete="new-password" onChange={handleNewPasswordChange}
                    placeholder={t("enter new password")} ref={newPasswordInput} minLength={6} required/>
                <Input className={styles.input} type="password"
                    autoComplete="new-password" onChange={handleRepeatPasswordChange}
                    placeholder={t("repeat new password")} ref={repeatPasswordInput} minLength={6} required/>
                <Button className={styles.button} onClick={handleSubmit}>{t("Change password")}</Button>
            </div>
            <Button onClick={closeModal}>{t("Close")}</Button>
        </Modal>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowChangePasswordModal: (showChangePasswordModal) => dispatch(setShowChangePasswordModal(showChangePasswordModal)),
        setAlert: (type, messageKey, messageValue, action, alertProps) => dispatch(setAlert(type, messageKey, messageValue, action, alertProps)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);