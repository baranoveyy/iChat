import React from 'react';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';

import AuthLoading from '../screens/AuthLoading';
import Home from '../screens/Home';
import AuthScreen from '../screens/Auth';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import ChangePassword from '../screens/ChangePassword';
import Users from '../screens/Users';
import Chat from '../screens/Chat';
import Chats from '../screens/Chats';

import paths from './paths';
import withRouter from './withRouter';
import Profile from '../screens/Profile';

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
      <Scene
        key={paths.PROFILE}
        component={withRouter(Profile)}
        hideNavBar
      />
      <Scene
        key={paths.USERS}
        component={withRouter(Users)}
        hideNavBar
      />
      <Scene
        key={paths.CHATS}
        component={withRouter(Chats)}
        hideNavBar
      />
      <Scene
        key={paths.CHAT}
        component={withRouter(Chat)}
        hideNavBar
      />
    </Stack>
  </Router>
);

export default Routes;
