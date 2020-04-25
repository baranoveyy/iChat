import { Reducer, Action } from 'redux';

import { AUTH_ACTION_TYPE } from '../actions/authActions';
import AuthState from '../models/auth';

const initialState = {};

const authReducer: Reducer<AuthState, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AUTH_ACTION_TYPE.LOGIN:
      let newState = state;

      if (!action.error) {
        newState = {
          ...state,
          isLoggedIn: action.payload.challengeName !== 'NEW_PASSWORD_REQUIRED'
        };
      }

      return newState;
    case AUTH_ACTION_TYPE.SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload
      };
    case AUTH_ACTION_TYPE.LOGOUT:
      return state;
    case AUTH_ACTION_TYPE.GET_CURRENT_AUTHENTICATED_USER:
    case AUTH_ACTION_TYPE.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
