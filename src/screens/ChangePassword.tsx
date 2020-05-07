import React from 'react';
import { useForm } from 'react-hook-form';import { Auth } from 'aws-amplify';

import { BUTTON_TYPES } from '../common/constants';

import TextField from '../components/text-field/TextField';
import Screen from '../components/Screen';
import Button from '../components/button/Button';

import paths from '../routes/paths';

const ChangePassword = (props) => {
  const { register, setValue, handleSubmit, errors } = useForm();
  const { user } = props.location.state;

  const onSubmit = (formData) => {
    Auth.completeNewPassword(
      user, // the Cognito User Object
      formData.newPassword, // the new password
      {
        email: user.challengeParam.userAttributes.email
      }
    )
      .then((user) => {
        // at this time the user is logged in if no MFA required
        window.console.log('user', user);
        props.history.push(paths.HOME, { reset: true });
      })
      .catch((e) => {
        window.console.log(e);
      });
  };

  const onChangeField = (field) => (text) => {
    setValue(field, text, true);
  };

  const onChange = (field) => onChangeField(field);

  return (
    <Screen history={props.history}>
      <TextField
        label="New Password"
        ref={register({ name: 'newPassword' })}
        placeholder="newPassword"
        onChangeText={onChange('newPassword')}
        error={errors.newPassword}
      />
      <TextField
        label="Re-Enter New Password"
        ref={register({ name: 'reNewPassword' })}
        placeholder="reNewPassword"
        onChangeText={onChange('reNewPassword')}
        error={errors.reNewPassword}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        label={'CHANGE PASSWORD'}
        buttonType={BUTTON_TYPES.LINEAR_GRADIENT}
      />
    </Screen>
  );
};

export default ChangePassword;
