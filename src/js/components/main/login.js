import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
//Custom Components
import Card from '../global_components/card';
//Redux Actions
import { setScreen } from '../../actions/appActions';

const Login = (props) => {
    const { t } = useTranslation();
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        const isValid = validateUserInput(email, password);

        if(isValid) {
            props.logIn(email, password)
        };
        emailInput.current.value = '';
        passwordInput.current.value = '';
    }

    const validateUserInput = (email, password) => {
        return true;
    }

    const handleSignUp = () => {
        props.setScreen('signup')
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder={t("e-mail")} ref={emailInput}></input>
                <input type="password" placeholder={t("password")} ref={passwordInput} min="6"></input>
                <button type="submit">{t("Login")}</button>
            </form>
            <p>
                <Trans i18nKey="Don't have an account">
                    Don't have an account? <span onClick={handleSignUp}>Create new account here!</span>
                </Trans>
            </p>
        </Card>
     );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScreen: (screen) => { dispatch(setScreen(screen)) },
    logIn: (email, password) => { dispatch(logIn(email, password)) },
  }
}

export default connect(null, mapDispatchToProps)(Login);