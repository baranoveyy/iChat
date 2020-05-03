import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View} from 'react-native';
import styled from 'styled-components';

import Screen from '../components/Screen';
import Button from '../components/button/Button';

import paths from '../routes/paths';
import {logout} from '../store/actions/authActions';
import { RootState } from '../store/reducers/rootReducer';

const Container = styled(View)`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Profile = ({history}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const {cognitoUser} = useSelector((state: RootState) => state.auth)
  window.console.log('cognitoUser', cognitoUser);
  useEffect(() => {
    // Storage.get('123456.txt')
  }, []);

  const signOut = () => {
    dispatch(logout()).then(() => {
      history.push(paths.AUTH, {reset: true});
    });
  };

  return (
    <Screen navbarTitle="PROFILE" disablePadding>
      <Container>
        <Text>Name:  {cognitoUser?.attributes.name} </Text>
        <Text>E-mail:  {cognitoUser?.attributes.email} </Text>
        <Button label="Sign Out" width="60%" onPress={signOut} />
      </Container>
    </Screen>
  );
};

export default Profile;
