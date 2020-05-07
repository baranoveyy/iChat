import React, { useEffect } from 'react';
import { View, PermissionsAndroid } from 'react-native';
import styled from 'styled-components';

import { BUTTON_TYPES } from '../common/constants';

import Button from '../components/button/Button';
import Screen from '../components/Screen';

import paths from '../routes/paths';

const ButtonContainer = styled(View)`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Auth = ({history}) => {
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ).then((result) => {
      // PermissionsAndroid.RESULTS.GRANTED
      window.console.log(result);
    });
  }, []);

  const signUp = () => {
    history.push(paths.SIGN_UP);
  };

  const signIn = () => {
    history.push(paths.SIGN_IN);
  };

  return (
    <Screen history={history}>
      <ButtonContainer>
        <Button onPress={signUp} label="Sign Up" width="80%" />
        <Button onPress={signIn} label="Sign In" width="80%" buttonType={BUTTON_TYPES.LINEAR_GRADIENT} />
      </ButtonContainer>
    </Screen>
  );
};

export default Auth;
