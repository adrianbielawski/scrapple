import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import * as styles from "./newPasswordForm.scss";
//Custom Components
import Modal from "components/global_components/modal/modal";
import Button from "components/global_components/button/button";
import Input from "components/global_components/input/input";
import LoadingSpinner from "components/global_components/loading_spinner/loadingSpinner";
//Redux actions
import { closeNewPasswordModal } from "actions/sideMenuActions";
import { setAlert } from "actions/appActions";

const NewPasswordForm = (props) => {
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const newPasswordInput = useRef(null);
  const repeatPasswordInput = useRef(null);

  const handleNewPasswordChange = () => {
    setNewPassword(newPasswordInput.current.value);
  };

  const handleRepeatPasswordChange = () => {
    setRepeatPassword(repeatPasswordInput.current.value);
  };

  const validateUserInput = () => {
    let error = null;

    if (!newPassword) {
      error = "Please enter new password";
    }

    if (!repeatPassword) {
      error = "Please repeat new password";
    }

    if (newPassword !== repeatPassword) {
      error = "Passwords don't match";
    }

    return {
      valid: error === null,
      error,
    };
  };

  const handleSubmit = () => {
    const { valid, error } = validateUserInput();
    if (!valid) {
      props.setAlert("alert", error);
      return;
    }

    props.setAlert(
      "confirm",
      "Are you sure you want to change your password",
      null,
      "change-password",
      { newPassword, repeatPassword },
    );
  };

  return (
    <Modal show={props.show}>
      <div className={styles.newPasswordForm}>
        <Input
          className={styles.input}
          type="password"
          autoComplete="new-password"
          onChange={handleNewPasswordChange}
          placeholder={t("enter new password")}
          ref={newPasswordInput}
          minLength={8}
          required
        />
        <Input
          className={styles.input}
          type="password"
          autoComplete="new-password"
          onChange={handleRepeatPasswordChange}
          placeholder={t("repeat new password")}
          ref={repeatPasswordInput}
          minLength={8}
          required
        />
        {props.isChangingPassword ? (
          <LoadingSpinner background={false} />
        ) : (
          <Button className={styles.button} onClick={handleSubmit}>
            {t("Change password")}
          </Button>
        )}
      </div>
      <Button onClick={props.closeNewPasswordModal}>{t("Close")}</Button>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isChangingPassword: state.auth.isChangingPassword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeNewPasswordModal: () => dispatch(closeNewPasswordModal()),
    setAlert: (type, messageKey, messageValue, action, alertProps) =>
      dispatch(setAlert(type, messageKey, messageValue, action, alertProps)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPasswordForm);

