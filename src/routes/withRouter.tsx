import React, { ComponentType } from 'react';
import { Actions } from 'react-native-router-flux';
import { Location } from 'history';

import { STACK } from '../common/constants';

const push = (pathname: string, state) => {
  const location: Location = {
    pathname,
    state,
    search: '',
    hash: ''
  };

  window.console.log('location', location);

  if (state && state.reset) {
    STACK.length = 0;
    Actions.reset(pathname, { location });
  } else {
    Actions.push(pathname, { location });
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
