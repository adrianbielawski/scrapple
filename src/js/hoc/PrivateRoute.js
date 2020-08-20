import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from 'firebaseConfig';

const PrivateRoute = ({ component: Component, loadingAuthState, ...rest }) => {
    if (loadingAuthState) {
        return <div>Loading...</div>
    }

    const isLoggedIn = auth.currentUser;

    return (
        <Route {...rest} render={props => (
            isLoggedIn ? <Component {...props} /> : <Redirect to={{
                pathname: '/login',
                state: { referrer: window.location.pathname.slice(1) }
            }} />
        )} />
    )
}

const mapStateToProps = (state) => {
    return {
        loadingAuthState: state.auth.loadingAuthState,
    }
}

export default connect(mapStateToProps)(PrivateRoute);