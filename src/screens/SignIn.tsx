import React from 'react';
import { View, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
// import { API, graphqlOperation } from 'aws-amplify';

import { color } from '../common/constants';

import Button from '../components/button/Button';
import TextField from '../components/text-field/TextField';
import Screen from '../components/Screen';

// import paths from '../routes/paths';
// import { createUser } from '../graphql/mutations';
// import { login } from '../store/actions/authActions';

const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  flex: 1;
  width: 100%;

  border-bottom-width: 1px;
  border-style: solid;
  border-bottom-color: ${color.white};
`;

const SignIn = (props) => {
  const { register, setValue, handleSubmit, errors } = useForm();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   window.console.log('SignIn', getValues());
  // });

  const onSubmit = async (formData) => {
    window.console.log(formData);

    // dispatch(login(formData.email, formData.password)).then(async (response) => {
    //   window.console.log(response);
    //   if (!response.error) {
    //     if (response.payload.challengeName === 'NEW_PASSWORD_REQUIRED') {
    //       props.history.push(paths.CHANGE_PASSWORD, { user: response.payload });
    //     } else {
    //       try {
    //         const newUser = await API.graphql(
    //           graphqlOperation(createUser, {
    //             input: { userName: formData.email }
    //           })
    //         );
    //         window.console.log(newUser);
    //       } catch (err) {
    //         window.console.log('newUser Error', err);
    //       }
    //       props.history.push(paths.HOME, { reset: true });
    //     }
    //   } else {
    //     setError('asd', response.payload.code, response.payload.message);
    //   }
    // });
  };

  const onChangeField = (field) => (text) => {
    setValue(field, text, true);
  };

  const onChange = (field) => onChangeField(field);

  const goBack = () => {
    props.history.goBack();
  };

  return (
    <Screen history={props.history} >
      <TextField
        label="email"
        ref={register({ name: 'email' }, { required: true })}
        placeholder="E-MAIL"
        onChangeText={onChange('email')}
        error={errors.email}
      />
      <TextField
        label="password"
        ref={register({ name: 'password' }, { required: true })}
        placeholder="PASSWORD"
        onChangeText={onChange('password')}
        error={errors.password}
      />
      <ButtonContainer>
        <Button onPress={goBack} label={'CANCEL'} width="45%" />
        <Button
          onPress={handleSubmit(onSubmit)}
          label={'SIGN IN'}
          width="45%"
        />
      </ButtonContainer>
      {errors.asd && <Text>{errors.asd.message}</Text>}
    </Screen>
  );
};

export default SignIn;
