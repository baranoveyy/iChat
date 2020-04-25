import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import loggerMiddleware from './middleware/logger';
import crashReporter from './middleware/crashReporter';
import rootReducer from './reducers/rootReducer';

const middlewares = [/*loggerMiddleware,*/ crashReporter, thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer/*monitorReducersEnhancer*/];
const composedEnhancers = composeWithDevTools(...enhancers);

const store = createStore(rootReducer, composedEnhancers);

// @ts-ignore
if (module.hot && process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  module.hot.accept('./reducers/rootReducer', () => {
    store.replaceReducer(require('./reducers/rootReducer').default);
  });
}

export default store;
