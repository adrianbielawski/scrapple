import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import '../../../styles/login.scss';
//Custom Components
import Header from '../global_components/header';
import Language from '../global_components/language/changeLanguage';
import Card from '../global_components/card';
//Redux Actions

const Login = (props) => {
    const { t } = useTranslation();
    const email = useRef(null);
    const password = useRef(null);

    const handleSubmit = () => {

    }

    const validateUserInput = () => {

    }

    return ( 
        <div className="login">
            <Header />
            <div className="content">
                <Language showName={false} />
                <Card>
                    <input type="email" placeholder={t("e-mail")} ref={email}></input>
                    <input type="password" placeholder={t("password")} ref={password} min="6"></input>
                    <button onSubmit={handleSubmit}>{t("Login")}</button>
                    <p>
                        <Trans i18nKey="Don't have an account">
                            Don't have an account. <span>Create new account here</span>
                        </Trans>
                    </p>
                </Card>
            </div>
        </div>
     );
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);