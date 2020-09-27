import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import styles from './login.scss';
//Custom Components
import Card from 'components/global_components/card/card';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import Input from 'components/global_components/input/input';
import Button from 'components/global_components/button/button';
//Redux Actions
import { logIn } from 'actions/authActions';
import { useHistory, useLocation } from 'react-router-dom';

const Login = (props) => {
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        props.logIn(email, password, history, location);
    }

    const handleSignUp = () => {
        props.history.push('/signup');
    }

    return (
        <Card className={styles.login}>
            <form onSubmit={handleSubmit}>
                <Input type="email" placeholder={t("e-mail")} ref={emailInput} required />
                <Input type="password" placeholder={t("password")} ref={passwordInput} minLength="8" required />
                {props.isLoggingIn ? <LoadingSpinner background={false} /> : <Button type="submit">{t("Login")}</Button>}
            </form>
            {!props.isLoggingIn &&
                <p>
                    <Trans i18nKey="Don't have an account">
                        Don't have an account? <span onClick={handleSignUp}>Create new account here!</span>
                    </Trans>
                </p>
            }
        </Card>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggingIn: state.auth.isLoggingIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (email, password, history, location) => dispatch(logIn(email, password, history, location)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);