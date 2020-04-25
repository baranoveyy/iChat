import { Auth } from 'aws-amplify';

import { User } from '../models/auth';
// import { listUsers, listEvents } from '../../graphql/queries';

export enum AUTH_ACTION_TYPE {
  LOGIN = '@@auth/LOGIN',
  LOGOUT = '@@auth/LOGOUT',
  SET_LOGGED_IN = '@@auth/SET_LOGGED_IN',
  SET_USER = '@@auth/SET_USER',
  GET_CURRENT_AUTHENTICATED_USER = '@@auth/GET_CURRENT_AUTHENTICATED_USER',
  QUERY_LIST_USERS = '@@auth/QUERY_LIST_USERS',
  QUERY_LIST_EVENTS = '@@auth/QUERY_LIST_EVENTS',
}

export const login = (email, password) => ({
  type: AUTH_ACTION_TYPE.LOGIN,
  payload: Auth.signIn(email, password)
});

export const setLoggedIn = (isLoggedIn) => ({
  type: AUTH_ACTION_TYPE.SET_LOGGED_IN,
  payload: isLoggedIn
});

export const logout = () => ({
  type: AUTH_ACTION_TYPE.LOGOUT,
  payload: Auth.signOut()
});

export const setUser = (user: User) => ({
  type: AUTH_ACTION_TYPE.SET_USER,
  payload: user
});

// export const queryListUser = () => ({
//   type: AUTH_ACTION_TYPE.QUERY_LIST_USERS,
//   payload: API.graphql(graphqlOperation(listUsers))
// });

// export const queryListEvents = () => ({
//   type: AUTH_ACTION_TYPE.QUERY_LIST_EVENTS,
//   payload: API.graphql(graphqlOperation(listEvents))
// });
