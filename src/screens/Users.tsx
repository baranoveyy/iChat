import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Text, View} from 'react-native';
import styled from 'styled-components';

import Screen from '../components/Screen';
import Button from '../components/button/Button';

import {RootState} from '../store/reducers/rootReducer';
import {color} from '../common/constants';
import {API, graphqlOperation} from 'aws-amplify';
import {
  createConversation,
  createConvoLink
} from '../graphql/mutations';
import paths from '../routes/paths';
import { showLoading, hideLoading } from '../store/actions/commonActions';

const Container = styled(View)`
  flex: 1;
`;

const User = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  height: 60px;
  background-color: ${color.cloudyBlue};
`;

const UserName = styled(Text)`
  width: 50%;
`;

const PlusButton = styled(Button)`
  width: 20%;
`;

const Users = ({history}) => {
  const dispatch = useDispatch<any>();
  const {users, currentUser} = useSelector((state: RootState) => state.auth);
  const {convoLinks} = useSelector((state: RootState) => state.aws);

  // useEffect(() => {
  //   dispatch(getConversations());
  // }, []);

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
              <User key={index}>
                <UserName>{user.username}</UserName>
                <PlusButton label="+" onPress={onPress} />
              </User>
            );
          })}
      </Container>
    </Screen>
  );
};

export default Users;
