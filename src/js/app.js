import React, { useEffect, Suspense } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from 'firebaseConfig';
import styles from 'global_styles/app.scss';
//Custom Components
import Main from './components/main/main';
import MainMenu from './components/main_Menu/MainMenu';
const GameMenu = React.lazy(() => import('./components/game_menu/gameMenu'));
const Game = React.lazy(() => import('./components/game/game'));
const GameSummary = React.lazy(() => import('./components/game_summary/gameSummary'));
const SubtractPoints = React.lazy(() => import('./components/subtract_points/subtractPoints'));
import PrivateRoute from 'hoc/PrivateRoute';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import Alert from 'components/global_components/alert/alert';
//Redux Actions
import { setScreenHeight, setUser, clearAppState } from 'actions/appActions';
import { setLoadingAuthState } from 'actions/authActions';

const App = (props) => {
    let history = useHistory();
    const listenScreenHeight = window.addEventListener('resize', setScreenHeight);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                props.setUser(user);
            } else {
                if (window.location.pathname.slice(1) === 'signup') {
                    return;
                }
                props.clearAppState(props.language);
            }
            props.setLoadingAuthState(false);
        });

        return () => {
            removeEventListener(listenScreenHeight);
        }
    }, [])

    const setScreenHeight = () => {
        const screenHeight = window.innerHeight;
        props.setScreenHeight(screenHeight);
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
        setScreenHeight: (height) => dispatch(setScreenHeight(height)),
        setUser: (user) => dispatch(setUser(user)),
        clearAppState: (language) => dispatch(clearAppState(language)),
        setLoadingAuthState: (loadingAuthState) => dispatch(setLoadingAuthState(loadingAuthState)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);