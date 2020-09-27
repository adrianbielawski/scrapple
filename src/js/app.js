import React, { useEffect, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from 'global_styles/app.scss';
//Custom Components
import Main from './components/main/main';
import MainMenu from './components/main_Menu/mainMenu';
import GamePage from './components/game_page/gamePage';
import PrivateRoute from 'hoc/PrivateRoute';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import Alert from 'components/global_components/alert/alert';
//Redux Actions
import { setDeviceOrientation, setIsTouchDevice, setScreenHeight, clearAppState } from 'actions/appActions';
import { getUser } from 'actions/authActions';

const App = (props) => {
    const inspectDeviceScreen = () => {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }

    useEffect(() => {
        if (!props.user) {
            props.clearAppState();
        }
    }, [props.user])

    useEffect(() => {
        props.setIsTouchDevice(inspectDeviceScreen());

        window.addEventListener('resize', setScreenHeight);
        window.addEventListener("orientationchange", handleOrientationChange);
        handleOrientationChange();

        return () => {
            window.removeEventListener('resize', setScreenHeight);
            window.removeEventListener("orientationchange", handleOrientationChange);
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.getUser();
        }
    }, [])

    const setScreenHeight = () => {
        props.setScreenHeight(window.innerHeight);
    }

    const handleOrientationChange = () => {
        props.setDeviceOrientation(window.screen.orientation.type);
    }

    return (
        <div className={styles.App} style={{ minHeight: props.screenHeight }}>
            {props.alert.show && <Alert />}
            <Suspense fallback={<LoadingSpinner background={true} />}>
                <Switch>
                    <Route exact path={["/", "/login", "/signup"]} component={Main} />
                    <PrivateRoute path="/main_menu" component={MainMenu} />
                    <PrivateRoute exact path="/game/:gameId" component={GamePage} />
                </Switch>
            </Suspense>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        screenHeight: state.app.screenHeight,
        alert: state.app.alert,
        user: state.app.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsTouchDevice: (isTouchDevice) => dispatch(setIsTouchDevice(isTouchDevice)),
        setScreenHeight: (height) => dispatch(setScreenHeight(height)),
        setDeviceOrientation: (deviceOrientation) => dispatch(setDeviceOrientation(deviceOrientation)),
        clearAppState: () => dispatch(clearAppState()),
        getUser: () => dispatch(getUser()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);