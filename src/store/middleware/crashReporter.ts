import { showLoading, hideLoading } from '../actions/commonActions';

const crashReporter2 = (store) => (next) => async (action) => {
  // store.dispatch(showLoading(true));
  let result;
  try {
    result = await next(action);
  } catch (err) {
    window.console.error('Caught an exception!', err);
    throw err;
  }
  // store.dispatch(hideLoading(true));

  return result;
};

const isPromise = (val) => val && typeof val.then === 'function';

const crashReporter = ({ dispatch }) => (next) => async (action) => {
  // window.console.log('111', action);

  if (!isPromise(action.payload)) {
    // window.console.log('222', action);

    return next(action);
  }

  dispatch(showLoading(action.type));
  // window.console.log('333', action);


  if (!action.payload) {
    window.console.log('444', action);

    return;
  }

  try {
    const response = await action.payload;
    window.console.log('TRYYYYYYY response', response);
    dispatch(hideLoading(action.type));

    return dispatch({
      ...action,
      payload: response,
      error: false,
      warning: response && response['processConfirmationGuard'] // tslint:disable-line no-string-literal
    });
  } catch (response) {
    window.console.log('CATCH response', response);

    dispatch(hideLoading(action.type));

    return dispatch({
      ...action,
      payload: response,
      error: true,
      warning: false
    });
  }
};

export default crashReporter;
