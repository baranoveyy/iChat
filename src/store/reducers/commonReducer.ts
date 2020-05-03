import { Reducer } from 'redux';
import CommonState from '../models/common';
import { LANGUAGE_KEYS, LOCALE_KEYS } from '../../common/constants';
import { COMMON_ACTION_TYPE } from '../actions/commonActions';
import { isSilentAction, Action } from '../models/action';

const initialState: CommonState = {
  language: LANGUAGE_KEYS.TR,
  locale: LOCALE_KEYS.tr_TR,
  loading: false,
  error: undefined
};

const commonReducer: Reducer<CommonState, Action> = (
  state: CommonState = initialState,
  action: Action
) => {
  switch (action.type) {
    case COMMON_ACTION_TYPE.SHOW_LOADING: {
      return {
        ...state,
        loading: !isSilentAction(action.payload.actionType)
      };
    }
    case COMMON_ACTION_TYPE.HIDE_LOADING:
      return {
        ...state,
        loading: false
      };

    default: {
      return state;
    }
  }
};

export default commonReducer;
