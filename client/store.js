import { createStore, compose, applyMiddleware } from 'redux';
import { fetchLibrary } from './actions/actionCreators';

// import the root reducer

import rootReducer from './reducers/rootReducer';

// import data
import libraries from './data/libraries';
import progress from './data/progress';

// import thunkMiddleware for async actions

import thunkMiddleware from 'redux-thunk'

import createLogger from 'redux-logger'

const loggerMiddleware = createLogger()

// create an object for the default data
const defaultState = {
  libraries,
  progress
};

let middleware = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, loggerMiddleware];
} else {
  middleware = [...middleware];
}
const enhancers = compose(
  applyMiddleware(...middleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

if (module.hot) {
  module.hot.accept('./reducers/rootReducer', () => {
    const nextRootReducer = require('./reducers/rootReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;