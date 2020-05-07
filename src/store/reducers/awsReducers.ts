import {Reducer} from 'redux';
import {Action} from '../models/action';
import AwsState from '../models/aws';
import {AWS_ACTION_TYPE} from '../actions/awsActions';

const initialState: AwsState = {};

const awsReducer: Reducer<AwsState, Action> = (
  state: AwsState = initialState,
  action: Action
): AwsState => {
  switch (action.type) {
    case AWS_ACTION_TYPE.GET_CONVO_LINKS:
      return {
        ...state,
        convoLinks: action.payload?.data?.listConvoLinks.items
      };
    case AWS_ACTION_TYPE.SET_CONVO_LINKS:
      return {
        ...state,
        convoLinks: action.payload
      };

    default: {
      return state;
    }
  }
};

export default awsReducer;
