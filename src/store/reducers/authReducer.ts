import {Reducer} from 'redux';

import {AUTH_ACTION_TYPE} from '../actions/authActions';
import AuthState from '../models/auth';
import {Action} from '../models/action';

const initialState = {};

const authReducer: Reducer<AuthState, Action> = (
  state = initialState,
  action
): AuthState => {
  switch (action.type) {
    case AUTH_ACTION_TYPE.SIGN_IN:
      window.console.log('AUTH_ACTION_TYPE.LOGIN', action);

      return {
        ...state,
        isLoggedIn: action.payload?.challengeName !== 'NEW_PASSWORD_REQUIRED',
        cognitoUser: action.payload
      };
    case AUTH_ACTION_TYPE.SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload
      };
    case AUTH_ACTION_TYPE.SIGN_OUT:
      return state;
    case AUTH_ACTION_TYPE.GET_CURRENT_AUTHENTICATED_USER: {
      window.console.log(
        'AUTH_ACTION_TYPE.GET_CURRENT_AUTHENTICATED_USER',
        action.payload
      );

      return {
        ...state,
        isLoggedIn: !!action.payload,
        cognitoUser: action.payload
      };
    }
    case AUTH_ACTION_TYPE.CREATE_USER:
      window.console.log('CREATE_USER', action);

      return {
        ...state,
        currentUser: action.payload?.data?.createUser
      };
    case AUTH_ACTION_TYPE.SET_CURRENT_USER:
      window.console.log('SET_CURRENT_USER', action);

      return {
        ...state,
        currentUser: action.payload
      };
    case AUTH_ACTION_TYPE.GET_USERS:
      window.console.log(action.payload.data.listUsers.items);

      return {
        ...state,
        users: action.payload?.data?.listUsers?.items
      };
    default:
      return state;
  }
};

export default authReducer;
