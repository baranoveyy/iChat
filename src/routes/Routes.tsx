import React from 'react';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';

import AuthLoading from '../screens/AuthLoading';
import Home from '../screens/Home';
import AuthScreen from '../screens/Auth';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import ChangePassword from '../screens/ChangePassword';

import paths from './paths';
import withRouter from './withRouter';

const onBackAndroid = () => {
  // Return true to stay, or return false to exit the app.
  Actions.pop();

  return Actions.currentScene !== paths.AUTH;
};

const Routes = () => (
  <Router backAndroidHandler={onBackAndroid} >
    <Stack key="root">
      <Scene
        initial
        key={paths.AUTHLOADING}
        component={withRouter(AuthLoading)}
        hideNavBar
      />
      <Scene
        key={paths.AUTH}
        component={withRouter(AuthScreen)}
        hideNavBar
      />
      <Scene
        key={paths.SIGN_IN}
        component={withRouter(SignIn)}
        hideNavBar
      />
      <Scene
        key={paths.SIGN_UP}
        component={withRouter(SignUp)}
        hideNavBar
      />
      <Scene
        key={paths.CHANGE_PASSWORD}
        component={withRouter(ChangePassword)}
        hideNavBar
      />
      <Scene
        key={paths.HOME}
        component={withRouter(Home)}
        hideNavBar
      />
    </Stack>
  </Router>
);

export default Routes;
