import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
//Custom Components
import Card from '../global_components/card';
import LoadingSpinner from '../global_components/loadingSpinner';
//Redux Actions
import { signUp, setIsSigningUp } from '../../actions/authActions';

const Signup = (props) => {
    const { t } = useTranslation();
    const userNameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setIsSigningUp(true);
        const userName = userNameInput.current.value;
        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        const promise = props.signUp(email, password, userName);
        promise.then((user) => {
            props.setIsSigningUp(false);
            if (user === undefined) {
                return;
            }
            userNameInput.current.value = '';
            emailInput.current.value = '';
            passwordInput.current.value = '';
        });        
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <input placeholder={t("user name")} ref={userNameInput} minLength="3" required />
                <input type="email" placeholder={t("e-mail")} ref={emailInput} required />
                <input type="password" placeholder={t("password")} ref={passwordInput} minLength="6" required />
                {props.isSigningUp ? <LoadingSpinner background={false} /> : <button type="submit">{t("Create account")}</button>}
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
    signUp: (email, password, userName) => dispatch(signUp(email, password, userName)),
    setIsSigningUp: (isSigningUp) => dispatch(setIsSigningUp(isSigningUp)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);