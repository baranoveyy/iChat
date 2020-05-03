/* eslint-disable @typescript-eslint/no-explicit-any */
import {ActionCreator, Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

export type newAction = ActionCreator<
  ThunkAction<Promise<any>, null, null, Action<any>>
>;
