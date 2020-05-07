import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View} from 'react-native';
import styled from 'styled-components';

import Screen from '../components/Screen';

import {
  getUsers,
  createUserAction,
  setCurrentUser
} from '../store/actions/authActions';
import {RootState} from '../store/reducers/rootReducer';
import {getConvoLinks, setConvoLinks} from '../store/actions/awsActions';
import {API, graphqlOperation} from 'aws-amplify';
import {onCreateConvoLink} from '../graphql/subscriptions';

const Container = styled(View)`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Home = () => {
  const dispatch = useDispatch<any>();
  const {currentUser, cognitoUser, users} = useSelector(
    (state: RootState) => state.auth
  );
  const {convoLinks} = useSelector((state: RootState) => state.aws);

  useEffect(() => {
    if (!users) {
      dispatch(getUsers());
    }
  }, []);

  useEffect(() => {
    const arrow = async () => {
      if (cognitoUser && users && !currentUser) {
        const _currentUser = users.find(
          (user) => user.username === cognitoUser.attributes.name
        );
        await dispatch(
          _currentUser
            ? setCurrentUser(_currentUser)
            : createUserAction(cognitoUser.attributes.name)
        );
      }
    };

    arrow();
  }, [cognitoUser, users]);

  useEffect(() => {
    let subscription;
    if (currentUser) {
      if (!convoLinks) {
        dispatch(getConvoLinks(currentUser.id));
      }

      const next = (nextOnCreateConvoLink) => {
        window.console.log('nextOnCreateConvoLink', nextOnCreateConvoLink);
        dispatch(
          setConvoLinks([
            ...(convoLinks || []),
            nextOnCreateConvoLink.value.data.onCreateConvoLink
          ])
        );
      };

      subscription = API.graphql(
        graphqlOperation(onCreateConvoLink, {
          convoLinkUserId: currentUser.id
        })
      ).subscribe({
        next
      });
    }

    return () => subscription?.unsubscribe();
  }, [currentUser]);

  return (
    <Screen navbarTitle="HOME" disablePadding hideCustomNavbar>
      <Container>
        <Text> Welcome Home :) </Text>
      </Container>
    </Screen>
  );
};

export default Home;
