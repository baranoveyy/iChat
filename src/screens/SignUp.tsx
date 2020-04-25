import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Actions } from 'react-native-router-flux';
import { Auth } from 'aws-amplify';

import Screen from '../components/Screen';
import TextField from '../components/text-field/TextField';
import paths from '../routes/paths';
import Button from '../components/button/Button';

const SignUp = () => {
  const { register, setValue, handleSubmit, errors, setError, watch } = useForm();
  const [confirmSignUp, setConfirm] = useState(false);

  const watchAllFields = watch();
  window.console.log('watchAllFields', watchAllFields);

  const onSubmit = async (formData) => {
    window.console.log('formData', formData);
    try {
      if (confirmSignUp) {
        Auth.confirmSignUp(formData.userName, formData.confirmCode, {
          // Optional. Force user confirmation irrespective of existing alias. By default set to True.
          forceAliasCreation: true
        })
          .then(async (data) => {
            window.console.log(data);

            Actions.push(paths.SIGN_IN);
          })
          .catch((err) => {
            window.console.log(err);
            // errors.confirmCode = err.message;
            setError('confirmCode', err.code, err.message);
          });
      } else {
        const signUpResult = await Auth.signUp({
          username: formData.userName,
          password: formData.password,
          attributes: { email: formData.email }
        });
        setConfirm(true);
        window.console.log('signUpResult', signUpResult);
      }
    } catch (error) {
      window.console.log('signUpResult error', error);
    }
  };

  useEffect(() => {
    //
  });

  const onChangeField = (field) => (text) => {
    setValue(field, text, true);
  };

  const onChange = (field) => onChangeField(field);

  window.console.log('errors', errors);

  return (
    <Screen>
      {confirmSignUp ? (
        <TextField
          label="Confirmation Code"
          ref={register({ name: 'confirmCode' }, { required: true })}
          placeholder="CONFIRMATIN CODE"
          onChangeText={onChange('confirmCode')}
          error={errors.confirmCode}
        />
      ) : (
        <>
          <TextField
            label="User Name"
            ref={register({ name: 'userName' }, { required: true })}
            placeholder="USER NAME"
            onChangeText={onChange('userName')}
            error={errors.userName}
          />
          <TextField
            label="E-Mail"
            ref={register({ name: 'email' }, { required: true })}
            placeholder="E-MAIL"
            onChangeText={onChange('email')}
            error={errors.email}
          />
          <TextField
            label="Password"
            ref={register({ name: 'password' }, { required: true })}
            placeholder="PASSWORD"
            onChangeText={onChange('password')}
            error={errors.password}
          />
        </>
      )}
      <Button
        label={confirmSignUp ? 'Confirm Sign Up' : 'Sign Up'}
        onPress={handleSubmit(onSubmit)}
      />
    </Screen>
  );
};

export default SignUp;
