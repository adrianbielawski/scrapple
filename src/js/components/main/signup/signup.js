import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './signup.scss';
//Custom Components
import Card from 'components/global_components/card/card';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import Button from 'components/global_components/button/button';
import Input from 'components/global_components/input/input';
//Redux Actions
import { signUp } from 'actions/authActions';
import { setAlert } from 'actions/appActions';

const Signup = (props) => {
    const { t } = useTranslation();
    const userNameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const repeatPasswordInput = useRef(null);

    const validateUserInput = (password1, password2) => {
        let error = null;

        if (password1 !== password2) {
            error = "Passwords don't match";
        }

        return {
            valid: error === null,
            error,
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault();   
        const password = passwordInput.current.value;
        const repeatedPassword = repeatPasswordInput.current.value;

        const {valid, error} = validateUserInput(password, repeatedPassword);
        if (!valid) {
            props.setAlert('alert', error);
            return;
        }

        const userName = userNameInput.current.value;
        const email = emailInput.current.value;

        props.signUp(userName, email, password, repeatedPassword, props.history);
    }

    return (
        <Card className={styles.signup}>
            <form onSubmit={handleSubmit}>
                <Input placeholder={t("user name")} ref={userNameInput} minLength="2" required />
                <Input type="email" placeholder={t("e-mail")} ref={emailInput} required />
                <Input type="password" placeholder={t("password")} ref={passwordInput} minLength="8" required />
                <Input type="password" placeholder={t("repeat password")} ref={repeatPasswordInput} minLength="8" required />
                {props.isSigningUp ? <LoadingSpinner background={false} /> : <Button type="submit">{t("Create account")}</Button>}
            </form>
        </Card>
    );
}

const mapStateToProps = (state) => {
    return {
        isSigningUp: state.auth.isSigningUp,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (userName, email, password, repeatedPassword, history) => dispatch(signUp(userName, email, password, repeatedPassword, history)),
        setAlert: (type, messageKey, messageValue, action, alertProps) => dispatch(setAlert(type, messageKey, messageValue, action, alertProps)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);