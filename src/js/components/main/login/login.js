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
import { setScreen } from 'actions/appActions';
import { logIn, setIsLoggingIn } from 'actions/authActions';

const Login = (props) => {
    const { t } = useTranslation();
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        props.setIsLoggingIn(true);

        const promise = props.logIn(email, password);
        promise.then(user => {
            props.setIsLoggingIn(false);

            if (user === undefined) {
                return;
            };

            emailInput.current.value = '';
            passwordInput.current.value = '';
        });
    }

    const handleSignUp = () => {
        props.setScreen('signup')
    }

    return (
        <Card className={styles.login}>
            <form onSubmit={handleSubmit}>
                <Input type="email" placeholder={t("e-mail")} ref={emailInput} required />
                <Input type="password" placeholder={t("password")} ref={passwordInput} minLength="6" required />
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
        setScreen: (screen) => dispatch(setScreen(screen)),
        logIn: (email, password) => dispatch(logIn(email, password)),
        setIsLoggingIn: (isLoggingIn) => dispatch(setIsLoggingIn(isLoggingIn)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);