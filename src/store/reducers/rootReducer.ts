import {combineReducers} from 'redux';

import AuthState from '../models/auth';
import CommonState from '../models/common';

import authReducer from './authReducer';
import commonReducer from './commonReducer';

import {AUTH_ACTION_TYPE} from '../actions/authActions';

// App state types
export interface RootState {
  auth: AuthState;
  common: CommonState;
}

// Combine all reducers
const appReducer = combineReducers<RootState>({
  auth: authReducer,
  common: commonReducer
});

const rootReducer = (state, action) => {
  if (action.type === AUTH_ACTION_TYPE.LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
