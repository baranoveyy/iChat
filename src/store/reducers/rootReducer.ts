import {combineReducers} from 'redux';

import AuthState from '../models/auth';
import CommonState from '../models/common';
import AwsState from '../models/aws';

import authReducer from './authReducer';
import commonReducer from './commonReducer';
import awsReducer from './awsReducers';

import {AUTH_ACTION_TYPE} from '../actions/authActions';

// App state types
export interface RootState {
  auth: AuthState;
  common: CommonState;
  aws: AwsState;
}

// Combine all reducers
const appReducer = combineReducers<RootState>({
  auth: authReducer,
  common: commonReducer,
  aws: awsReducer
});

const rootReducer = (state, action) =>
  appReducer(
    action.type === AUTH_ACTION_TYPE.SIGN_OUT ? undefined : state,
    action
  );

export default rootReducer;
