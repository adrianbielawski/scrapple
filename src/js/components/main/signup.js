import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
//Custom Components
import Card from '../global_components/card';
//Redux Actions
import { signUp } from '../../actions/authActions';

const Signup = (props) => {
    const { t } = useTranslation();
    const userNameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userName = userNameInput.current.value;
        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        const isValid = validateUserInput(email, password);

        if(isValid) {
            props.signUp(email, password);            
        };
        userNameInput.current.value = '';
        emailInput.current.value = '';
        passwordInput.current.value = '';
    }

    const validateUserInput = (email, password) => {
        return true;
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <input placeholder={t("user name")} ref={userNameInput}></input>
                <input type="email" placeholder={t("e-mail")} ref={emailInput}></input>
                <input type="password" placeholder={t("password")} ref={passwordInput} min="6"></input>
                <button type="submit">{t("Create account")}</button>
            </form>
        </Card>
     );
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (email, password) => { dispatch(signUp(email, password)) },
  }
}

export default connect(null, mapDispatchToProps)(Signup);