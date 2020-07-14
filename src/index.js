import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import App from './js/components/App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './js/reducers/';

let composeEnhancers = compose;
 
if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  //composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render( app,
  document.getElementById('root')
);
