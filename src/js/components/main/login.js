import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import '../../../styles/login.scss';
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
    }

    const validateUserInput = () => {

    }

    const handleSignup = () => {
        props.setScreen('signup')
    }

    return (
        <Card>
            <form>
                <input type="email" placeholder={t("e-mail")} ref={emailInput}></input>
                <input type="password" placeholder={t("password")} ref={passwordInput} min="6"></input>
                <button onSubmit={handleSubmit}>{t("Login")}</button>
            </form>
            <p>
                <Trans i18nKey="Don't have an account">
                    Don't have an account? <span onClick={handleSignup}>Create new account here!</span>
                </Trans>
            </p>
        </Card>
     );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScreen: (screen) => { dispatch(setScreen(screen)) },
  }
}

export default connect(null, mapDispatchToProps)(Login);