import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Hub} from 'aws-amplify';

import paths from '../routes/paths';
import {getCurrentAuthenticatedUser} from '../store/actions/authActions';

const AuthLoading = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  const checkAuthentication = () => {
    dispatch(getCurrentAuthenticatedUser()).then((response) => {
      props.history.push(
        !response.error ? paths.HOME : paths.AUTH,
        !response.error ? {reset: true} : null
      );
    });
  };

  useEffect(() => {
    const hubListener = (data) => {
      window.console.log('Hub.listen', data.payload);

      switch (data.payload.event) {
        case 'signIn':
          props.history.push(paths.HOME, {reset: true});
          break;
        case 'signOut':
          props.history.push(paths.AUTH);
          break;
        default:
          break;
      }
    };

    Hub.listen('auth', hubListener);

    checkAuthentication();
  }, []);

  return <View />;
};

export default AuthLoading;
