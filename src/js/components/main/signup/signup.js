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
import { signUp, setIsSigningUp } from 'actions/authActions';

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
        <Card className={styles.signup}>
            <form onSubmit={handleSubmit}>
                <Input placeholder={t("user name")} ref={userNameInput} minLength="2" required />
                <Input type="email" placeholder={t("e-mail")} ref={emailInput} required />
                <Input type="password" placeholder={t("password")} ref={passwordInput} minLength="6" required />
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
        signUp: (email, password, userName) => dispatch(signUp(email, password, userName)),
        setIsSigningUp: (isSigningUp) => dispatch(setIsSigningUp(isSigningUp)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);