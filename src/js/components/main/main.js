import React from 'react';
import { connect } from 'react-redux';
import '../../../styles/main.scss';
//Custom Components
import Header from 'components/global_components/header';
import Language from 'components/global_components/language/changeLanguage';
import Login from './login/login';
import Signup from './Signup';
//Redux Actions

const Main = (props) => {
    return ( 
        <div className="main">
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