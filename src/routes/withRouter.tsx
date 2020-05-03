import React, {ComponentType} from 'react';
import {Actions} from 'react-native-router-flux';
import {Location} from 'history';

import {STACK} from '../common/constants';
import paths from './paths';

const push = (pathname: string, state) => {
  const location: Location = {
    pathname,
    state,
    search: '',
    hash: ''
  };

  if (Actions.currentScene === pathname) {
    return;
  } else if (state?.reset) {
    STACK.length = 0;
    Actions.reset(pathname, {location});
  } else if (state?.isMenuPush) {
    STACK.length = 0;
    Actions.popTo(paths.HOME, {location});
    if (pathname !== paths.HOME) {
      STACK.push(paths.HOME);
      Actions.push(pathname, {location});
    }
  } else {
    Actions.push(pathname, {location});
  }

  STACK.push(pathname);
};

const history = {
  push,
  goBack: () => {
    Actions.pop();
    STACK.pop();
  },
  replace: Actions.replace,
  entries: STACK
};

/* eslint-disable */
const withRouter = (Component: ComponentType<any>) => (props) => (
  <Component history={history} {...props} />
);

export default withRouter;
