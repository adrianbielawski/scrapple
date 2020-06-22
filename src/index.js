import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import {App} from './js/components/App';
import { BrowserRouter } from 'react-router-dom';

const app = (
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);

ReactDOM.render( app,
  document.getElementById('root')
);
