import React from 'react';
import { connect } from 'react-redux';
import styles from './main.scss';
//Custom Components
import Header from 'components/global_components/header/header';
import Language from 'components/global_components/language/changeLanguage';
import Login from './login/login';
import Signup from './signup/signup';
//Redux Actions

const Main = (props) => {
    return (
        <div>
            <Header />
            <div className={styles.content}>
                <Language showName={false} />
                {props.location.pathname === '/signup' ? <Signup /> : <Login history={props.history} />}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        screen: state.app.screen,
    }
}

export default connect(mapStateToProps)(Main);