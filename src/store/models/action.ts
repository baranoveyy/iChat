/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActionCreator as ReduxActionCreator } from 'redux';

export interface FluxStandardAction<Payload, Meta = undefined> {
  type: string;
  payload?: Payload;
  error?: boolean;
  meta?: Meta;
}

const SILENT_ACTIONS = [
  'asdasd',
  'asdasd'
];

export const isSilentAction = (actionType) => SILENT_ACTIONS.includes(actionType);

type Payload = Promise<any> | any;
type Meta = any;

export interface Action extends FluxStandardAction<Payload, Meta> {
  warning?: any;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ActionCreator extends ReduxActionCreator<Action> { }
