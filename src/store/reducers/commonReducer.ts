import { Reducer } from 'redux';
import CommonState from '../models/common';
import { LANGUAGE_KEYS, LOCALE_KEYS } from '../../common/constants';
import { COMMON_ACTION_TYPE } from '../actions/commonActions';
import { isSilentAction, Action } from '../models/action';

const initialState: CommonState = {
  language: LANGUAGE_KEYS.TR,
  locale: LOCALE_KEYS.tr_TR,
  loading: false,
  error: undefined,
  warning: undefined,
  receipt: undefined,
  appInactiveSeconds: undefined
};

const commonReducer: Reducer<CommonState, Action> = (
  state: CommonState = initialState,
  action: Action
) => {
  switch (action.type) {
    case COMMON_ACTION_TYPE.TOGGLE_LANGUAGE:
      return {
        ...state,
        language:
          state.language === LANGUAGE_KEYS.TR
            ? LANGUAGE_KEYS.EN
            : LANGUAGE_KEYS.TR,
        locale:
          state.language === LANGUAGE_KEYS.TR
            ? LOCALE_KEYS.en_EN
            : LOCALE_KEYS.tr_TR
      };
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
