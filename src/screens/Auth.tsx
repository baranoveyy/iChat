import React, { useEffect } from 'react';
import { View, TextInput, Text, PermissionsAndroid } from 'react-native';
import { useForm } from 'react-hook-form';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';
// import { Auth } from 'aws-amplify';

import { color, BUTTON_TYPES } from '../common/constants';

import Button from '../components/button/Button';
import Screen from '../components/Screen';

import paths from '../routes/paths';

const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;

  border-bottom-width: 1px;
  border-style: solid;
  border-bottom-color: ${color.white};
`;

const StyledTextInput = styled(TextInput)`
  background-color: ${color.white3};
  color: ${color.black};
  width: 100%;
  margin-bottom: 10px;
  height: 44px;
  font-size: 20px;
  padding-left: 6px;

  border-color: ${color.oceanBlue};
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
`;

const AuthScreen = (props) => {
  const { register, setValue, errors } = useForm();

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ).then((result) => {
      // PermissionsAndroid.RESULTS.GRANTED
      window.console.log(result);
    });
  }, []);

  const signUp = () => {
    window.console.log('signUPPPPPPP', props);
    // props.history.push(paths.SIGNUP);
    Actions.push(paths.SIGN_UP);
  };

  const signIn = (formData) => {
    // props.history.push(paths.SIGNUP);
    window.console.log('SIGNINNNNN', formData);

    Actions.push(paths.SIGN_IN);
  };

  const onChangeEmail = (email) => {
    setValue('email', email, true);
  };
  const onChangePassword = (password) => {
    setValue('password', password, true);
  };

  return (
    <Screen history={props.history}>
      <Text>E-mail</Text>
      <StyledTextInput
        ref={register({ name: 'email' }, { required: true })}
        onChangeText={onChangeEmail}
      />
      {errors.email && <Text>This is required.</Text>}
      <Text>Password</Text>
      <StyledTextInput
        ref={register({ name: 'password' }, { required: true })}
        onChangeText={onChangePassword}
      />
      {errors.password && <Text>This is required.</Text>}

      <ButtonContainer>
        <Button onPress={signUp} label="Sign Up" width="45%" />
        <Button onPress={signIn} label="Sign In" width="45%" buttonType={BUTTON_TYPES.LINEAR_GRADIENT} />
      </ButtonContainer>
    </Screen>
  );
};

export default AuthScreen;
