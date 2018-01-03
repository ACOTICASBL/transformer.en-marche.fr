import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment-timezone';
import qs from 'qs';
import { replace } from 'react-router-redux'

import './index.css';
import App from './App';
import { fetchIndexes } from './js/actions/data-actions';
import { getToken } from './js/actions/auth-actions';
import { myVotes } from './js/actions/vote-actions';
import store from './js/store';
import { saveState } from './js/local-storage';

moment.tz.setDefault('Europe/Paris');

store.dispatch(fetchIndexes());

store.subscribe(() => {
  let state = store.getState();
  saveState({
    ...state,
    auth: {...state.auth, openModal: false}
  });
});

let queryParams = qs.parse(window.location.search.slice(1));
let token = store.getState().auth;

if (queryParams.code) {
  store.dispatch(getToken(queryParams.code))
    .then(({ value }) => store.dispatch(myVotes(value.access_token)));
} else if (token) {
  store.dispatch(myVotes(token));
}

if (queryParams.state) {
  store.dispatch(replace(queryParams.state));
}

if ('ontouchstart' in document.documentElement)  {
  document.body.style.cursor = 'pointer';
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
