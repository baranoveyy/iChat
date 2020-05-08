import {ActionCreator} from '../models/action';

export enum COMMON_ACTION_TYPE {
  SHOW_LOADING = '@@common/SHOW_LOADING',
  HIDE_LOADING = '@@common/HIDE_LOADING',
}

export const showLoading: ActionCreator = (actionType) => ({
  type: COMMON_ACTION_TYPE.SHOW_LOADING,
  payload: {actionType}
});

export const hideLoading: ActionCreator = (actionType) => ({
  type: COMMON_ACTION_TYPE.HIDE_LOADING,
  payload: {actionType}
});
