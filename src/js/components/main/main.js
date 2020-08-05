import React from 'react';
import { connect } from 'react-redux';
import '../../../styles/login.scss';
//Custom Components
import Header from '../global_components/header';
import Language from '../global_components/language/changeLanguage';
import Login from './login';
import Signup from './Signup';
//Redux Actions

const Main = (props) => {
    return ( 
        <div className="login">
            <Header />
            <div className="content">
                <Language showName={false} />
                {props.screen === 'signup' ? <Signup /> : <Login />}
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