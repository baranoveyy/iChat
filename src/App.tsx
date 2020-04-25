import React from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import {useForm} from 'react-hook-form';

export default function App() {
  const {register, setValue, handleSubmit, errors, watch} = useForm();
  const onSubmit = (data) => Alert.alert('Form Data', JSON.stringify(data));
  window.console.log(watch());

  return (
    <View>
      <Text>First name</Text>
      <TextInput
        ref={register({name: 'firstName'}, {required: true})}
        onChangeText={(text) => setValue('firstName', text, true)}
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Text>Last name</Text>
      <TextInput
        ref={register({name: 'lastName'})}
        onChangeText={(text) => setValue('lastName', text)}
      />

      <Button title="asd" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
