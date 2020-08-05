import React, { useRef } from 'react';
import { auth } from '../../../firebase';
import { useTranslation } from 'react-i18next';
import '../../../styles/login.scss';
//Custom Components
import Card from '../global_components/card';
import { exitGame } from '../../actions/appActions';
//Redux Actions

const Signup = (props) => {
    const { t } = useTranslation();
    const userNameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault()
        const userName = userNameInput.current.value;
        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        const isValid = validateUserInput(email, password);
    }

    const validateUserInput = () => {

    }

    return (
        <Card>
            <form>
                <input placeholder={t("user name")} ref={userNameInput}></input>
                <input type="email" placeholder={t("e-mail")} ref={emailInput}></input>
                <input type="password" placeholder={t("password")} ref={passwordInput} min="6"></input>
                <button onSubmit={handleSubmit}>{t("Create account")}</button>
            </form>
        </Card>
     );
}

export default Signup;