import { showLoading, hideLoading } from '../actions/commonActions';

const isPromise = (val) => val && typeof val.then === 'function';

export default ({ dispatch }) => (next) => async (action) => {
  if (!isPromise(action.payload)) {
    return next(action);
  }

  dispatch(showLoading(action.type));

  if (!action.payload) {
    return;
  }

  try {
    const response = await action.payload;
    dispatch(hideLoading(action.type));

    return dispatch({
      ...action,
      payload: response,
      error: false
    });
  } catch (error) {
    dispatch(hideLoading(action.type));

    return dispatch({
      ...action,
      payload: undefined,
      error: error
    });
  }
};