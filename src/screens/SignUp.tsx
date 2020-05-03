import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

import Screen from '../components/Screen';
import TextField from '../components/text-field/TextField';
import Button from '../components/button/Button';

import paths from '../routes/paths';
import {signUp, signIn, createUserAction} from '../store/actions/authActions';
import {showLoading, hideLoading} from '../store/actions/commonActions';

const SignUp = ({history}) => {
  const {register, setValue, handleSubmit, errors, setError} = useForm();
  const [confirmSignUp, setConfirm] = useState(false);
  const dispatch = useDispatch<any>();

  const onSubmit = async (formData) => {
    window.console.log('formData', formData);
    try {
      if (confirmSignUp) {
        dispatch(showLoading());
        Auth.confirmSignUp(formData.email, formData.confirmCode, {
          // Optional. Force user confirmation irrespective of existing alias. By default set to True.
          forceAliasCreation: true
        })
          .then(async (data) => {
            window.console.log(data);

            dispatch(signIn(formData.email, formData.password)).then(async (response) => {
              window.console.log(response);
              if (!response.error) {
                if (response.payload.challengeName === 'NEW_PASSWORD_REQUIRED') {
                  history.push(paths.CHANGE_PASSWORD, { user: response.payload });
                } else {
                  dispatch(createUserAction(formData.userName)).then((response) => {
                    window.console.log('createUserAction response', response);
                  })
                }
              } else {
                setError('signInError', response.payload.code, response.payload.message);
              }
            });

            // Actions.push(paths.SIGN_IN);
          })
          .catch((err) => {
            window.console.log(err);
            // errors.confirmCode = err.message;
            setError('confirmCode', err.code, err.message);
          });
        dispatch(hideLoading());
      } else {
        // const signUpResult = await Auth.signUp({
        //   username: formData.email,
        //   password: formData.password,
        //   attributes: { email: formData.email, name: formData.userName }
        // });
        dispatch(
          signUp(formData.email, formData.password, {
            email: formData.email,
            name: formData.userName
          })
        ).then((response) => {
          window.console.log('signUpResult', response);
        });
        setConfirm(true);
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

  return (
    <Screen>
      {confirmSignUp ? (
        <TextField
          label="Confirmation Code"
          ref={register({name: 'confirmCode'}, {required: true})}
          placeholder="CONFIRMATION CODE"
          onChangeText={onChange('confirmCode')}
          error={errors.confirmCode}
        />
      ) : (
        <>
          <TextField
            label="User Name"
            ref={register({name: 'userName'}, {required: true})}
            placeholder="USER NAME"
            onChangeText={onChange('userName')}
            error={errors.userName}
          />
          <TextField
            label="E-Mail"
            ref={register({name: 'email'}, {required: true})}
            placeholder="E-MAIL"
            onChangeText={onChange('email')}
            error={errors.email}
          />
          <TextField
            label="Password"
            ref={register({name: 'password'}, {required: true})}
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
