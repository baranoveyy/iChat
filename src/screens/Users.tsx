import React from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {Text, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {API, graphqlOperation} from 'aws-amplify';

import {color} from '../common/constants';

import Screen from '../components/Screen';

import {RootState} from '../store/reducers/rootReducer';
import {
  createConversation,
  createConvoLink
} from '../graphql/mutations';
import paths from '../routes/paths';
import { showLoading, hideLoading } from '../store/actions/commonActions';

const Container = styled(View)`
  flex: 1;
`;

const User = styled(TouchableOpacity)`
  flex-direction: row;
  width: 100%;
  height: 60px;
  background-color: ${color.cloudyBlue};
  border: 1px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const Users = ({history}) => {
  const dispatch = useDispatch<any>();
  const {users, currentUser} = useSelector((state: RootState) => state.auth, shallowEqual);
  const {convoLinks} = useSelector((state: RootState) => state.aws, shallowEqual);

  return (
    <Screen navbarTitle="USERS">
      <Container>
        {users
          ?.filter((user) => user.username !== currentUser.username)
          .map((user, index) => {
            const members = [user.username, currentUser.username];

            const onPress = async () => {
              dispatch(showLoading());
              try {
                const name = members.join(' and ');
                const convoLink = convoLinks?.find(
                  (convoLink) => convoLink.conversation.members.includes(user.username)
                );

                if (convoLink) {
                  history.push(paths.CHAT, {convoLink});
                } else {
                  const newConversation = await API.graphql(
                    graphqlOperation(createConversation, {
                      input: {name, members}
                    })
                  );
                  window.console.log('newConversation', newConversation);

                  const id = newConversation.data.createConversation.id;

                  const senderConvoLinkInput = {
                    convoLinkUserId: currentUser.id,
                    convoLinkConversationId: id
                  };
                  const recevierConvolinkInput = {
                    convoLinkUserId: user.id,
                    convoLinkConversationId: id
                  };
                  const senderConvoLink = await API.graphql(
                    graphqlOperation(createConvoLink, {input: senderConvoLinkInput})
                  );
                  window.console.log('senderConvoLink', senderConvoLink);
                  const recevierConvolink = await API.graphql(
                    graphqlOperation(createConvoLink, {input: recevierConvolinkInput})
                  );
                  window.console.log('recevierConvolink', recevierConvolink);

                  history.push(paths.CHAT, {convoLink: senderConvoLink.data.createConvoLink});
                }

                dispatch(hideLoading());

              } catch (error) {
                window.console.log('error', error);
                dispatch(hideLoading());
              }
            };

            return (
              <User key={index} onPress={onPress}>
                <Text>{user.username}</Text>
              </User>
            );
          })}
      </Container>
    </Screen>
  );
};

export default Users;
