import React, { useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
// import { API, graphqlOperation } from 'aws-amplify';
import { useDispatch } from 'react-redux';

import paths from '../routes/paths';
// import { createUser } from '../graphql/mutations';
// import { listUsers } from '../graphql/queries';
import { showLoading, hideLoading } from '../store/actions/commonActions';
import { View } from 'react-native';
// import { setLoggedIn } from '../store/actions/authActions';

const AuthLoading = (props) => {
  let listenerx;
  const dispatch = useDispatch();

  // const checkIfAuthenticated = async () => {
  //   let currentSession;
  //   try {
  //     currentSession = await Auth.currentSession();
  //     window.console.log('currentSession', currentSession);
  //   } catch (err) {
  //     window.console.log('currentSession Error', err);
  //   }
  // };

  const checkIfAuthenticated2 = async () => {
    let currentAuthenticatedUser;
    dispatch(showLoading(true));

    try {
      currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
      window.console.log('currentAuthenticatedUser', currentAuthenticatedUser);
    } catch (err) {
      window.console.log('currentAuthenticatedUser Error', err);
    }

    dispatch(hideLoading(true));
    // try {
    //   const currentCredentials = await Auth.currentCredentials();
    //   window.console.log('currentCredentials', currentCredentials);
    // } catch (err) {
    //   window.console.log('currentCredentials Error', err);
    // }

    if (currentAuthenticatedUser) {
      dispatch(showLoading(true));

      try {
        // const users = await API.graphql(graphqlOperation(listUsers));
        // dispatch(setLoggedIn(true));
        // const user = users.data.listUsers.items.find((item) => item.id === currentAuthenticatedUser.username);
        // window.console.log(users);
        // window.console.log(user);

        // if (!user) {
        //   try {
        //     const newUser = await API.graphql(
        //       graphqlOperation(createUser, {
        //         input: { username: currentAuthenticatedUser.username }
        //       })
        //     );
        //     window.console.log(newUser);
        //   } catch (err) {
        //     window.console.log('newUser Error', err);
        //   }
        // }
      } catch (err) {
        window.console.log('users Error', err);
      }
      dispatch(hideLoading(true));
    }
    // await setTimeout(() => null, 5000);

    listenerx = async (data) => {
      window.console.log('Hub.listen', data.payload);

      switch (data.payload.event) {
        case 'signIn':
          // props.history.push(paths.HOME, {reset: true});
          break;
        case 'signOut':
          props.history.push(paths.AUTH);
          break;
        default:
          break;
      }

      // const federatedInfo = await Cache.getItem('federatedInfo');
      // window.console.log('federatedInfo', federatedInfo);
    };

    Hub.listen('auth', listenerx);
    props.history.push(
      currentAuthenticatedUser ? paths.HOME : paths.AUTH,
      currentAuthenticatedUser ? { reset: true } : null
    );
  };

  useEffect(() => {
    // checkIfAuthenticated();
    checkIfAuthenticated2();

    return () => Hub.remove('auth', listenerx);
  }, []);

  return <View />;
};

export default AuthLoading;
