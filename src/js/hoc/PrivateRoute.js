import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isInitialized, user, ...rest }) => {
    if (!isInitialized) {
        return <div>Loading...</div>
    }

    return (
        <Route {...rest} render={props => (
            user ? <Component {...props} /> : <Redirect to={{
                pathname: '/login',
                state: { referrer: props.location }
            }} />
        )} />
    )
}

const mapStateToProps = (state) => {
    return {
        isInitialized: state.auth.isInitialized,
        user: state.app.user,
    }
}

export default connect(mapStateToProps)(PrivateRoute);