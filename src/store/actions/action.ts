/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';


export type newAction = ActionCreator<
  ThunkAction<Promise<any>, null, null, Action<any>>
>;

// export const login2: newAction = (email, password) => async (dispatch: Dispatch): Promise<any> => {
//   try {
//     const response = await Auth.signIn(email, password);
//     dispatch({
//       type: AUTH_ACTION_TYPE.LOGIN,
//       payload: response
//     });
//   } catch (err) {
//     window.console.error(err);
//   }
// };