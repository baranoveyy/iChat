import { showLoading, hideLoading } from '../actions/commonActions';

const isPromise = (val) => val && typeof val.then === 'function';

const crashReporter = ({ dispatch }) => (next) => async (action) => {
  if (!isPromise(action.payload)) {
    return next(action);
  }

  dispatch(showLoading(action.type));

  if (!action.payload) {
    return;
  }

  try {
    const response = await action.payload;
    window.console.log('SUCCESS action', action);
    dispatch(hideLoading(action.type));

    return dispatch({
      ...action,
      payload: response,
      error: false
    });
  } catch (error) {
    window.console.log('ERROR action', action);

    dispatch(hideLoading(action.type));

    return dispatch({
      ...action,
      payload: undefined,
      error: error
    });
  }
};

export default crashReporter;
