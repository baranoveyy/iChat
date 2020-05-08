import { ActionCreator as ReduxActionCreator } from 'redux';

const SILENT_ACTIONS = [
  'asdasd',
  'asdasd'
];

export const isSilentAction = (actionType) => SILENT_ACTIONS.includes(actionType);

type Payload = Promise<any> | any;
type Meta = any;

export interface StandardAction<Payload, Meta = undefined> {
  type: string;
  payload?: Payload;
  error?: any;
  meta?: Meta;
}

export type Action = StandardAction<Payload, Meta>

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ActionCreator extends ReduxActionCreator<Action> { }
