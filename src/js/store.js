import { applyMiddleware, createStore } from 'redux';

import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import createHistory from 'history/createBrowserHistory';

import reducer from './reducers';

export const history = createHistory();

const authMiddleware = (authActions = []) => {
  return store => next => action => {
    let state = store.getState();
    if (authActions.includes(action.type) && !state.auth.token) {
      return store.dispatch({type: 'ASK_AUTH'});
    } else {
      return next(action);
    }
  }
}

const middleware = applyMiddleware(
  promise(),
  thunk,
  routerMiddleware(history),
  createLogger(),
  authMiddleware(['VOTE_UP_PENDING', 'VOTE_DOWN_PENDING', 'MY_VOTES_PENDING'])
);

export default createStore(reducer, middleware);
