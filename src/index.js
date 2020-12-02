import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/store.js'
import { Provider } from 'react-redux'
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

ReactDOM.render(<Provider store={store}>
  <App />
  </Provider>
  , document.getElementById('root'));
  serviceWorker.unregister();
