import React, { useEffect, Suspense } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from 'firebaseConfig';
import styles from 'global_styles/app.scss';
//Custom Components
import Main from './components/main/main';
import MainMenu from './components/main_Menu/mainMenu';
const GameMenu = React.lazy(() => import('./components/game_menu/gameMenu'));
const Game = React.lazy(() => import('./components/game/game'));
const GameSummary = React.lazy(() => import('./components/game_summary/gameSummary'));
const SubtractPoints = React.lazy(() => import('./components/subtract_points/subtractPoints'));
import PrivateRoute from 'hoc/PrivateRoute';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import Alert from 'components/global_components/alert/alert';
//Redux Actions
import { setDeviceOrientation, setIsTouchDevice, setScreenHeight, setUser, clearAppState, getUserCurrentGame, checkCurrentGameStatus } from 'actions/appActions';
import { setLoadingAuthState } from 'actions/authActions';

const App = (props) => {
    const location = useLocation();
    let history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                props.setUser(user);
                const currentGamePromise = props.getUserCurrentGame(user.uid);
                currentGamePromise.then((currentGame) => {
                    if (currentGame) {
                        const isCurrentGameValid = props.checkCurrentGameStatus(currentGame)
                        isCurrentGameValid.then((isValid) => {
                            if (isValid) {
                                history.push(`/game/${currentGame}`);
                            }
                        });
                    }
                });
            } else {
                if (location.pathname.slice(1) === 'signup') {
                    return;
                }
                props.clearAppState(props.language);
            }
            props.setLoadingAuthState(false);
        });

        window.addEventListener('resize', setScreenHeight);
        window.addEventListener('touchstart', handleTouch);
        window.addEventListener("orientationchange", handleOrientationChange);
        handleOrientationChange()

        return () => {
            window.removeEventListener('resize', setScreenHeight);
            window.removeEventListener('touchstart', handleTouch);
            window.removeEventListener("orientationchange", handleOrientationChange);
        }
    }, [])

    const setScreenHeight = () => {
        const screenHeight = window.innerHeight;
        props.setScreenHeight(screenHeight);
    }

    const handleTouch = () => {
        props.setIsTouchDevice(true);
        window.removeEventListener('touchstart', handleTouch);
    }

    const handleOrientationChange = () => {
        props.setDeviceOrientation(window.screen.orientation.type);
    }

    return (
        <div className={styles.App} style={{ height: props.screenHeight }}>
            {props.alert.show && <Alert />}
            <Suspense fallback={<LoadingSpinner background={true} />}>
                <Switch>
                    <Route exact path={["/", "/login", "/signup"]} component={Main} />
                    <PrivateRoute path="/main_menu" component={MainMenu} />
                    <PrivateRoute path="/game_menu" component={GameMenu} />
                    <PrivateRoute exact path="/game/:gameId" component={Game} />
                    <PrivateRoute exact path="/game/:gameId/subtract_points" component={SubtractPoints} />
                    <PrivateRoute exact path="/game/:gameId/game_summary" component={GameSummary} />
                </Switch>
            </Suspense>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        screenHeight: state.app.screenHeight,
        alert: state.app.alert,
        language: state.app.language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsTouchDevice: (isTouchDevice) => dispatch(setIsTouchDevice(isTouchDevice)),
        setScreenHeight: (height) => dispatch(setScreenHeight(height)),
        setDeviceOrientation: (deviceOrientation) => dispatch(setDeviceOrientation(deviceOrientation)),
        setUser: (user) => dispatch(setUser(user)),
        getUserCurrentGame: (uid) => dispatch(getUserCurrentGame(uid)),
        clearAppState: (language) => dispatch(clearAppState(language)),
        setLoadingAuthState: (loadingAuthState) => dispatch(setLoadingAuthState(loadingAuthState)),
        checkCurrentGameStatus: (gameId) => dispatch(checkCurrentGameStatus(gameId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);