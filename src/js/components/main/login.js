import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
//Custom Components
import Card from '../global_components/card';
import LoadingSpinner from '../global_components/loadingSpinner';
import Button from '../global_components/button/button';
//Redux Actions
import { setScreen } from '../../actions/appActions';
import { logIn, setIsLoggingIn } from '../../actions/authActions';

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
        <Card>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder={t("e-mail")} ref={emailInput} required />
                    <input type="password" placeholder={t("password")} ref={passwordInput} minLength="6" required />
                    { props.isLoggingIn ? <LoadingSpinner background={false} /> : <Button type="submit">{t("Login")}</Button> }
                </form>
                {!props.isLoggingIn &&
                    <p>
                        <Trans i18nKey="Don't have an account">
                            Don't have an account? <span onClick={handleSignUp}>Create new account here!</span>
                        </Trans>
                    </p>
                }
            </div>
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