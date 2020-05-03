import {Auth, API, graphqlOperation} from 'aws-amplify';

import {ActionCreator} from '../models/action';
import {listUsers} from '../../graphql/queries';
import {createUser} from '../../graphql/mutations';

export enum AUTH_ACTION_TYPE {
  SIGN_IN = '@@auth/SIGN_IN',
  SIGN_UP = '@@auth/SIGN_UP',
  SIGN_OUT = '@@auth/SIGN_OUT',
  SET_LOGGED_IN = '@@auth/SET_LOGGED_IN',
  CREATE_USER = '@@auth/CREATE_USER',
  SET_CURRENT_USER = '@@auth/SET_CURRENT_USER',
  GET_CURRENT_AUTHENTICATED_USER = '@@auth/GET_CURRENT_AUTHENTICATED_USER',
  GET_USERS = '@@auth/GET_USERS',
}

export const signIn: ActionCreator = (email, password) => ({
  type: AUTH_ACTION_TYPE.SIGN_IN,
  payload: Auth.signIn(email, password)
});

export const signUp: ActionCreator = (username, password, attributes) => ({
  type: AUTH_ACTION_TYPE.SIGN_UP,
  payload: Auth.signUp({username, password, attributes})
});

export const setLoggedIn: ActionCreator = (isLoggedIn) => ({
  type: AUTH_ACTION_TYPE.SET_LOGGED_IN,
  payload: isLoggedIn
});

export const logout: ActionCreator = () => ({
  type: AUTH_ACTION_TYPE.SIGN_OUT,
  payload: Auth.signOut()
});

export const createUserAction: ActionCreator = (username) => ({
  type: AUTH_ACTION_TYPE.CREATE_USER,
  payload: API.graphql(graphqlOperation(createUser, {input: {username}}))
});

export const setCurrentUser: ActionCreator = (user) => ({
  type: AUTH_ACTION_TYPE.SET_CURRENT_USER,
  payload: user
});

export const getCurrentAuthenticatedUser: ActionCreator = () => ({
  type: AUTH_ACTION_TYPE.GET_CURRENT_AUTHENTICATED_USER,
  payload: Auth.currentAuthenticatedUser()
});

export const getUsers: ActionCreator = () => ({
  type: AUTH_ACTION_TYPE.GET_USERS,
  payload: API.graphql(graphqlOperation(listUsers))
});
