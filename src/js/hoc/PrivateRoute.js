import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, loadingAuthState, user, ...rest }) => {
    if (loadingAuthState) {
        return <div>Loading...</div>
    }

    return (
        <Route {...rest} render={props => (
            user ? <Component {...props} /> : <Redirect to={{
                pathname: '/login',
                state: { referrer: window.location.pathname.slice(1) }
            }} />
        )} />
    )
}

const mapStateToProps = (state) => {
    return {
        loadingAuthState: state.auth.loadingAuthState,
        user: state.app.user,
    }
}

export default connect(mapStateToProps)(PrivateRoute);